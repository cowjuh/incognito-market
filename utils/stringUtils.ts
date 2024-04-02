export function formatPlural(count: number, singular: string, plural: string) {
    return `${count} ${count === 1 ? singular : plural}`;
}

export function getUsernameFromInstagramUrl(url: string): string {
    const urlParts = url.split('/');
    const usernameIndex = urlParts.indexOf('instagram.com') + 1;
    return urlParts[usernameIndex];
}

export function getUsernameFromTwitterUrl(url: string): string {
    const urlParts = url.split('/');
    const usernameIndex = urlParts.indexOf('twitter.com') + 1;
    return urlParts[usernameIndex];
}
