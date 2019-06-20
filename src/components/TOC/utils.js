

export function normalizeHeading(data) {
    const path = data.fields.slug;
    return [{
        value: data.frontmatter.title,
        path,
        depth: 1
    }, ...slugifyHeadings(data.htmlAst.children, path)];
}

export function slugifyHeadings(astTree, path) {
    return astTree
        .filter(
            h => h.type === 'element' && (h.tagName === 'h1' || h.tagName === 'h2' || h.tagName === 'h3')
        )
        .map(h => {
            return {
                value: (h.children.filter(c => c.type === 'text')[0] || {}).value || '',
                depth: Number(h.tagName.slice(1)),
                id: h.properties.id,
                path
            };
        });
}
