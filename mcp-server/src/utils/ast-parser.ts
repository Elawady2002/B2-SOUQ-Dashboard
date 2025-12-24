
import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import * as t from "@babel/types";
import { FigmaNode, parseTailwindClasses } from "./tailwind-parser";
import { applyShadcnDefaults } from "./shadcn-defaults";

export function parseReactToFigma(code: string): FigmaNode | null {
    const ast = parser.parse(code, {
        sourceType: "module",
        plugins: ["jsx", "typescript"],
    });

    let rootFigmaNode: FigmaNode | null = null;

    // Helper to recursively parse JSX elements
    function parseJSXElement(element: t.JSXElement): FigmaNode {
        const openingElement = element.openingElement;

        // 1. Resolve Tag Name
        let tagName = "Frame";
        if (t.isJSXIdentifier(openingElement.name)) {
            tagName = openingElement.name.name;
        } else if (t.isJSXMemberExpression(openingElement.name)) {
            if (t.isJSXIdentifier(openingElement.name.object) && t.isJSXIdentifier(openingElement.name.property)) {
                tagName = `${openingElement.name.object.name}.${openingElement.name.property.name}`;
            } else if (t.isJSXIdentifier(openingElement.name.object)) {
                tagName = openingElement.name.object.name;
            }
        }

        let className = "";
        const props: Record<string, any> = {};

        // 2. Extract props and className
        openingElement.attributes.forEach((attr) => {
            if (t.isJSXAttribute(attr) && t.isJSXIdentifier(attr.name)) {
                const attrName = attr.name.name;
                if (attr.value) {
                    if (t.isStringLiteral(attr.value)) {
                        props[attrName] = attr.value.value;
                        if (attrName === "className") className = attr.value.value;
                    } else if (t.isJSXExpressionContainer(attr.value)) {
                        // Simple prop capture for boolean/numbers if easy, otherwise ignore complex exprs
                        if (t.isNumericLiteral(attr.value.expression)) {
                            props[attrName] = attr.value.expression.value;
                        }
                    }
                } else {
                    // Boolean prop true (e.g. <Input disabled />)
                    props[attrName] = true;
                }
            }
        });

        // 3. Parse styles from Tailwind
        const styles = parseTailwindClasses(className);

        // 4. Detect Custom Component (Capitalized)
        const isCustomComponent = /^[A-Z]/.test(tagName) || tagName.includes(".");

        // --- Heuristic Defaults ---

        // A. Custom Components: Default to Vertical AutoLayout if undefined
        if (isCustomComponent && styles.layoutMode === "NONE") {
            styles.layoutMode = "VERTICAL";
            styles.primaryAxisSizingMode = "AUTO"; // Hug
            styles.counterAxisSizingMode = "AUTO"; // Hug

            if (!styles.width) {
                styles.counterAxisSizingMode = "FIXED";
                styles.width = 300;
            }
        }

        // Create base node (Frame)
        const node: FigmaNode = {
            type: "FRAME",
            name: tagName,
            children: [],
            ...styles,
        };

        // --- Apply Shadcn Defaults ---
        applyShadcnDefaults(node, tagName, props);

        // 5. Recursively handle children
        let hasVisibleChildren = false;

        element.children.forEach((child) => {
            if (t.isJSXElement(child)) {
                const childNode = parseJSXElement(child);
                if (childNode) {
                    node.children?.push(childNode);
                    hasVisibleChildren = true;
                }
            } else if (t.isJSXText(child)) {
                const text = child.value.trim();
                if (text) {
                    // Use parsed textColor or default black
                    const textFill = node.textColor || { r: 0, g: 0, b: 0 };

                    node.children?.push({
                        type: "TEXT",
                        name: "Text",
                        characters: text,
                        style: { fontSize: 16, fontFamily: "Inter" },
                        fills: [{ type: "SOLID", color: textFill }]
                    });
                    hasVisibleChildren = true;
                }
            }
            // Simple handling for {expressions} / Variables
            else if (t.isJSXExpressionContainer(child)) {
                const expression = child.expression;

                // Ignore Comments
                if (t.isJSXEmptyExpression(expression)) return;

                // --- Handle Array.map (List Rendering) ---
                if (t.isCallExpression(expression) &&
                    t.isMemberExpression(expression.callee) &&
                    t.isIdentifier(expression.callee.property) &&
                    expression.callee.property.name === "map") {

                    const callback = expression.arguments[0];
                    if (t.isArrowFunctionExpression(callback) || t.isFunctionExpression(callback)) {
                        let body = callback.body;
                        let mapParams = callback.params; // we can use this if we want to mock data later

                        let targetJSX: t.Expression | null = null;

                        // 1. Implicit Return: (item) => <Div />
                        if (t.isJSXElement(body) || t.isJSXFragment(body)) {
                            targetJSX = body as t.JSXElement; // Fragment treat as Element roughly or skip
                        }
                        // 2. Expression body (paren wrapped): (item) => (<Div />)
                        else if (t.isParenthesizedExpression(body)) {
                            let content = body.expression;
                            while (t.isParenthesizedExpression(content)) { content = content.expression; }
                            if (t.isJSXElement(content)) targetJSX = content;
                        }
                        // 3. Block Statement: (item) => { ... return <Div /> }
                        else if (t.isBlockStatement(body)) {
                            const returnStmt = body.body.find(curr => t.isReturnStatement(curr)) as t.ReturnStatement;
                            if (returnStmt && returnStmt.argument) {
                                let content = returnStmt.argument;
                                while (t.isParenthesizedExpression(content)) { content = content.expression; }
                                if (t.isJSXElement(content)) targetJSX = content;
                            }
                        }

                        if (targetJSX && t.isJSXElement(targetJSX)) {
                            const mapItem = parseJSXElement(targetJSX);
                            if (mapItem) {
                                // Add it ONCE to represent the list
                                // Duplicate it 3 times to simulate a list?
                                // For now just 1
                                mapItem.name = `${mapItem.name} 1 (List Item)`;
                                node.children?.push(mapItem);

                                // Optional: Duplicate for visual density
                                const mapItem2 = JSON.parse(JSON.stringify(mapItem));
                                mapItem2.name = mapItem.name.replace("1", "2");
                                node.children?.push(mapItem2);

                                const mapItem3 = JSON.parse(JSON.stringify(mapItem));
                                mapItem3.name = mapItem.name.replace("1", "3");
                                node.children?.push(mapItem3);

                                hasVisibleChildren = true;
                            }
                        }
                    }
                    return; // Handled map
                }

                // Normal Expressions -> Placeholder
                node.children?.push({
                    type: "TEXT",
                    name: "{Prop}",
                    characters: "{Dynamic}",
                    style: { fontSize: 14, fontFamily: "Inter" },
                    fills: [{ type: "SOLID", color: { r: 0.5, g: 0.5, b: 0.5 } }]
                });
                hasVisibleChildren = true;
            }
        });

        // B. Icon / Leaf Component Handling
        if (isCustomComponent && !hasVisibleChildren) {
            if (!node.width) node.width = 24;
            if (!node.height) node.height = 24;

            node.layoutMode = "NONE";
            node.name = `Icon (${tagName})`;
            node.cornerRadius = 4;

            if (node.textColor) {
                node.fills = [{ type: "SOLID", color: node.textColor }];
            } else if (!node.fills || node.fills.length === 0) {
                // Default gray placeholder if no color set
                node.fills = [{ type: "SOLID", color: { r: 0.85, g: 0.85, b: 0.9 } }];
            }
        }

        return node;
    }

    // Traverse the AST to find the returned JSX
    // @ts-ignore
    const traverseFn = traverse.default || traverse;
    traverseFn(ast, {
        ReturnStatement(path: any) {
            // Find the first component that returns JSX
            if (t.isJSXElement(path.node.argument)) {
                if (!rootFigmaNode) {
                    rootFigmaNode = parseJSXElement(path.node.argument);
                }
            }
        },
    });

    return rootFigmaNode;
}
