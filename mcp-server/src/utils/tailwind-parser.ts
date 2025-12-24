
export interface FigmaNode {
    type: "FRAME" | "TEXT";
    name: string;
    layoutMode?: "NONE" | "HORIZONTAL" | "VERTICAL";
    primaryAxisSizingMode?: "FIXED" | "AUTO";
    counterAxisSizingMode?: "FIXED" | "AUTO";
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
    itemSpacing?: number;
    fills?: { type: "SOLID"; color: { r: number; g: number; b: number }; opacity?: number }[];
    cornerRadius?: number;
    strokes?: { type: "SOLID"; color: { r: number; g: number; b: number } }[];
    strokeWeight?: number;
    width?: number;
    height?: number;
    layoutGrow?: number;
    layoutAlign?: "STRETCH" | "INHERIT";
    children?: FigmaNode[];
    characters?: string; // For TEXT
    style?: any; // For TEXT (fontSize, fontWeight, etc.)
    textColor?: { r: number; g: number; b: number }; // New Text Color Property
}

// Extended color map with semantic tokens
const colorMap: Record<string, { r: number; g: number; b: number }> = {
    "blue-500": { r: 0.23, g: 0.51, b: 0.96 },
    "red-500": { r: 0.94, g: 0.27, b: 0.27 },
    "green-500": { r: 0.13, g: 0.77, b: 0.37 },
    "white": { r: 1, g: 1, b: 1 },
    "black": { r: 0, g: 0, b: 0 },
    "gray-100": { r: 0.95, g: 0.96, b: 0.96 },
    "gray-200": { r: 0.90, g: 0.92, b: 0.94 },
    "slate-500": { r: 0.4, g: 0.47, b: 0.53 },
    "slate-800": { r: 0.12, g: 0.16, b: 0.23 },
    "slate-900": { r: 0.09, g: 0.11, b: 0.17 },
    // Semantic tokens
    "background": { r: 1, g: 1, b: 1 }, // Default to white for now
    "muted-foreground": { r: 0.4, g: 0.4, b: 0.4 },
    "border": { r: 0.9, g: 0.9, b: 0.9 },
};

export function parseTailwindClasses(className: string): Partial<FigmaNode> {
    const node: Partial<FigmaNode> = {
        layoutMode: "NONE",
        fills: [],
        strokes: [],
    };

    const classes = className.split(/\s+/).filter(Boolean);

    classes.forEach((cls) => {
        // --- Layout ---
        if (cls === "flex") node.layoutMode = "HORIZONTAL";
        if (cls === "flex-col") node.layoutMode = "VERTICAL";
        if (cls === "flex-row") node.layoutMode = "HORIZONTAL";
        if (cls === "hidden") return;

        // --- Align / Justify ---
        if (cls === "items-center") node.counterAxisSizingMode = "AUTO";

        if (cls === "justify-center") node.primaryAxisSizingMode = "AUTO";
        if (cls === "justify-between") node.primaryAxisSizingMode = "FIXED";
        if (cls === "flex-1") {
            node.primaryAxisSizingMode = "FIXED";
            node.layoutGrow = 1;
        }

        // --- Sizing ---
        if (cls === "w-full") {
            node.primaryAxisSizingMode = "FIXED";
            node.layoutAlign = "STRETCH";
            node.width = 375;
        }
        if (cls === "h-full") node.height = 100;
        if (cls === "h-screen") node.height = 800;

        // Arbitrary Width/Height: w-[300px]
        const wArb = cls.match(/^w-\[(\d+)px\]$/);
        if (wArb) node.width = parseInt(wArb[1]);

        const hArb = cls.match(/^h-\[(\d+)px\]$/);
        if (hArb) node.height = parseInt(hArb[1]);

        // Fixed sizing
        const wFixed = cls.match(/^w-(\d+)$/);
        if (wFixed) node.width = parseInt(wFixed[1]) * 4;

        const hFixed = cls.match(/^h-(\d+)$/);
        if (hFixed) node.height = parseInt(hFixed[1]) * 4;


        // --- Padding (1 unit = 4px) ---
        const parseValue = (prefix: string): number | null => {
            if (cls.startsWith(prefix)) {
                const rest = cls.replace(prefix, "");
                if (rest.startsWith("[") && rest.endsWith("px]")) {
                    return parseInt(rest.slice(1, -1));
                }
                return parseFloat(rest) * 4;
            }
            return null;
        }

        const p = parseValue("p-");
        if (p !== null) node.paddingTop = node.paddingBottom = node.paddingLeft = node.paddingRight = p;

        const px = parseValue("px-");
        if (px !== null) node.paddingLeft = node.paddingRight = px;

        const py = parseValue("py-");
        if (py !== null) node.paddingTop = node.paddingBottom = py;

        // --- Gap ---
        const gap = parseValue("gap-");
        if (gap !== null) node.itemSpacing = gap;

        // --- Colors ---
        // bg-blue-500, bg-background
        if (cls.startsWith("bg-")) {
            const colorKey = cls.replace("bg-", "");
            if (colorMap[colorKey]) {
                node.fills = [{ type: "SOLID", color: colorMap[colorKey] }];
            }
        }

        // text-slate-500
        if (cls.startsWith("text-") && !cls.startsWith("text-center") && !cls.startsWith("text-lg") && !cls.startsWith("text-sm")) {
            const colorKey = cls.replace("text-", "");
            if (colorMap[colorKey]) {
                node.textColor = colorMap[colorKey];
            } else if (colorKey === "white") {
                node.textColor = { r: 1, g: 1, b: 1 };
            }
        }

        // --- Borders ---
        if (cls.startsWith("rounded")) {
            if (cls === "rounded-full") node.cornerRadius = 999;
            else if (cls === "rounded-lg") node.cornerRadius = 8;
            else if (cls === "rounded-md") node.cornerRadius = 6;
            else node.cornerRadius = 4;
        }

        if (cls === "border" || cls === "border-b") {
            node.strokes = [{ type: "SOLID", color: { r: 0.9, g: 0.9, b: 0.9 } }];
            node.strokeWeight = 1;
        }
    });

    return node;
}
