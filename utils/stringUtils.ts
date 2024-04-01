export function formatPlural(count: number, singular: string, plural: string) {
    return `${count} ${count === 1 ? singular : plural}`;
}