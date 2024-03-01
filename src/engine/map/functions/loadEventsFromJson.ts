import { Event, loadEventFromJson } from "../../event";

export async function loadEventsFromJson(
  eventsFolderRelativePath: string,
): Promise<Event[]> {
  const jsonData = await (await fetch(eventsFolderRelativePath)).json();
  const events: Event[] = [];
  for (const event of jsonData) {
    events.push(await loadEventFromJson(event));
  }

  return events;
}
