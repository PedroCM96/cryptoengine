import {Event, loadEventFromJson} from '../../event';

export async function loadEventsFromJson(eventsFolderRelativePath: string): Promise<Event[]> {
    const jsonData = await import(eventsFolderRelativePath);
    const events: Event[] = [];
    for (const event of jsonData.default) {
        events.push(await loadEventFromJson(event));
    }

    return events;
}