import type { EntryGenerator } from "./$types";

export const entries: EntryGenerator = () => {
    const paths = import.meta.glob("../../../lib/content/*.md", {
        eager: true,
    });
    return Object.keys(paths).map((filePath) => {
        const slug = filePath.split("/").pop()?.replace(/\.md$/, "") || "";
        return { slug };
    });
};

export const prerender = true;
