
console.log("MCP Bridge: Plugin Code Starting...");

figma.showUI(__html__, { width: 300, height: 200, themeColors: true });

function createSolidPaint(r, g, b, a) {
    var alpha = a !== undefined ? a : 1;
    return {
        type: "SOLID",
        color: { r: Math.min(1, Math.max(0, r)), g: Math.min(1, Math.max(0, g)), b: Math.min(1, Math.max(0, b)) },
        opacity: alpha
    };
}

async function renderNode(data) {
    if (!data) return null;

    var node;

    if (data.type === "FRAME") {
        node = figma.createFrame();
        node.name = data.name || "Frame";

        // Layout
        if (data.layoutMode && (data.layoutMode === "HORIZONTAL" || data.layoutMode === "VERTICAL")) {
            node.layoutMode = data.layoutMode;

            if (data.primaryAxisSizingMode) node.primaryAxisSizingMode = data.primaryAxisSizingMode;
            if (data.counterAxisSizingMode) node.counterAxisSizingMode = data.counterAxisSizingMode;
            if (data.itemSpacing) node.itemSpacing = data.itemSpacing;

            if (data.paddingTop) node.paddingTop = data.paddingTop;
            if (data.paddingBottom) node.paddingBottom = data.paddingBottom;
            if (data.paddingLeft) node.paddingLeft = data.paddingLeft;
            if (data.paddingRight) node.paddingRight = data.paddingRight;
        } else {
            node.resize(data.width || 100, data.height || 100);
        }

        // Styles
        try {
            if (data.fills && Array.isArray(data.fills)) {
                node.fills = data.fills.map(function (f) {
                    return createSolidPaint(f.color.r, f.color.g, f.color.b);
                });
            }
            if (data.cornerRadius) node.cornerRadius = data.cornerRadius;
        } catch (styleErr) {
            console.warn("Style Error:", styleErr);
        }

        // Children
        if (data.children && Array.isArray(data.children)) {
            for (var i = 0; i < data.children.length; i++) {
                try {
                    var childNode = await renderNode(data.children[i]);
                    if (childNode) node.appendChild(childNode);
                } catch (childErr) {
                    console.error("Child Render Error:", childErr);
                }
            }
        }
    }
    else if (data.type === "TEXT") {
        try {
            await figma.loadFontAsync({ family: "Inter", style: "Regular" });
            node = figma.createText();
            node.characters = data.characters || "Text";

            // FIX: Removed optional chaining data.style?.fontSize
            var fontSize = 16;
            if (data.style && data.style.fontSize) {
                fontSize = data.style.fontSize;
            }
            node.fontSize = fontSize;

            if (data.fills && Array.isArray(data.fills)) {
                node.fills = data.fills.map(function (f) {
                    return createSolidPaint(f.color.r, f.color.g, f.color.b);
                });
            }
        } catch (fontErr) {
            console.error("Font Error:", fontErr);
            figma.notify("Missing Font: Inter Regular", { error: true });
            return null;
        }
    }

    return node;
}

figma.ui.onmessage = async (msg) => {
    if (msg.type === "CREATE_COMPONENT") {
        try {
            const rootNode = await renderNode(msg.data);
            if (rootNode) {
                rootNode.x = figma.viewport.center.x;
                rootNode.y = figma.viewport.center.y;
                figma.viewport.scrollAndZoomIntoView([rootNode]);
                figma.notify("Synced Successfully!");
            }
        } catch (err) {
            console.error("Critical Render Error:", err);
            figma.notify("Render Failed: " + err.message, { error: true });
        }
    }
};
