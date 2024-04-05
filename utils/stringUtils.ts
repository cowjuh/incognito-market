import { formatDistanceToNow, parseISO } from 'date-fns';

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

export function formatPostedAt(dateString: string) {
    const date = parseISO(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays > 7) {
        return dateString.slice(0, 10); // return the date part of the string
    } else {
        return formatDistanceToNow(date, { addSuffix: true }); // e.g., "5 days ago"
    }
}