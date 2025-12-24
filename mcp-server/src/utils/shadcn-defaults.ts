
import { FigmaNode, parseTailwindClasses } from "./tailwind-parser";

interface ComponentDefaults {
    [componentName: string]: (props: Record<string, any>) => string;
}

// Mappings based on standard Shadcn UI implementation
const shadcnDefaults: ComponentDefaults = {
    Button: (props) => {
        let classes = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

        switch (props.variant) {
            case "destructive": classes += " bg-destructive text-destructive-foreground hover:bg-destructive/90"; break;
            case "outline": classes += " border border-input bg-background hover:bg-accent hover:text-accent-foreground"; break;
            case "secondary": classes += " bg-secondary text-secondary-foreground hover:bg-secondary/80"; break;
            case "ghost": classes += " hover:bg-accent hover:text-accent-foreground"; break;
            case "link": classes += " text-primary underline-offset-4 hover:underline"; break;
            default: classes += " bg-primary text-primary-foreground hover:bg-primary/90"; break; // default
        }

        switch (props.size) {
            case "sm": classes += " h-9 rounded-md px-3"; break;
            case "lg": classes += " h-11 rounded-md px-8"; break;
            case "icon": classes += " h-10 w-10"; break;
            default: classes += " h-10 px-4 py-2"; break; // default
        }

        return classes;
    },
    Badge: (props) => {
        let classes = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
        switch (props.variant) {
            case "secondary": classes += " border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"; break;
            case "destructive": classes += " border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80"; break;
            case "outline": classes += " text-foreground"; break;
            default: classes += " border-transparent bg-primary text-primary-foreground hover:bg-primary/80"; break;
        }
        return classes;
    },
    Card: () => "rounded-lg border bg-card text-card-foreground shadow-sm",
    CardContent: () => "p-6",
    CardHeader: () => "flex flex-col space-y-1.5 p-6",
    CardTitle: () => "text-2xl font-semibold leading-none tracking-tight",
    CardDescription: () => "text-sm text-muted-foreground",
    CardFooter: () => "flex items-center p-6 pt-0",
    Avatar: () => "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
    AvatarImage: () => "aspect-square h-full w-full",
    AvatarFallback: () => "flex h-full w-full items-center justify-center rounded-full bg-muted",
    Separator: (props) => props.orientation === "vertical" ? "h-full w-[1px] bg-border" : "h-[1px] w-full bg-border",
};

export function applyShadcnDefaults(node: FigmaNode, componentName: string, props: Record<string, any>) {
    const generator = shadcnDefaults[componentName];
    if (generator) {
        const defaultClass = generator(props);
        const defaultStyles = parseTailwindClasses(defaultClass);

        // Merge defaults into node, but let existing properties (from className) override
        // Actually, in CSS, specificity matters. But usually `className` prop overrides internal defaults.
        // So we apply defaults *underneath* existing styles.
        // Since `node` already has parsed styles from `className`, we only fill in gaps 
        // OR we re-parse. 

        // Better approach: 
        // 1. Get default styles.
        // 2. Merge `node` (className styles) ON TOP of default styles.

        // We can do this by mutations

        // Fills:
        if ((!node.fills || node.fills.length === 0) && defaultStyles.fills) {
            node.fills = defaultStyles.fills;
        }
        // Strokes:
        if ((!node.strokes || node.strokes.length === 0) && defaultStyles.strokes) {
            node.strokes = defaultStyles.strokes;
            node.strokeWeight = defaultStyles.strokeWeight;
        }
        // Layout / Sizing - be careful not to override explicit "NONE" if user set it? 
        // But usually components HAVE layout.
        if (defaultStyles.layoutMode && node.layoutMode === "NONE") {
            node.layoutMode = defaultStyles.layoutMode;
        }
        if (defaultStyles.paddingTop !== undefined && node.paddingTop === undefined) node.paddingTop = defaultStyles.paddingTop;
        if (defaultStyles.paddingBottom !== undefined && node.paddingBottom === undefined) node.paddingBottom = defaultStyles.paddingBottom;
        if (defaultStyles.paddingLeft !== undefined && node.paddingLeft === undefined) node.paddingLeft = defaultStyles.paddingLeft;
        if (defaultStyles.paddingRight !== undefined && node.paddingRight === undefined) node.paddingRight = defaultStyles.paddingRight;

        if (defaultStyles.cornerRadius !== undefined && node.cornerRadius === undefined) node.cornerRadius = defaultStyles.cornerRadius;

        // Text Color?
        if (defaultStyles.textColor && !node.textColor) {
            node.textColor = defaultStyles.textColor;
        }
    }
}
