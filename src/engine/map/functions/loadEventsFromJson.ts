import {Event, loadEventFromJson} from '../../event';

export async function loadEventsFromJson(mapId: number): Promise<Event[]> {
    const jsonData = await import(`../../../data/maps/events/events_${mapId}.json`);
    const events: Event[] = [];
    for (const event of jsonData.default) {
        events.push(await loadEventFromJson(event));
    }

    return events;
}