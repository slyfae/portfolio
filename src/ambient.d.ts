declare module "*.md" {
    import type { ComponentType } from "svelte";
    const content: ComponentType;
    export default content;
}

declare module "*.svx" {
    import type { ComponentType } from "svelte";
    const content: ComponentType;
    export default content;
}
