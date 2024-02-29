# Events
An event could be defined as a sequence of commands (<b>actions</b>) to be executed and placed on a <b>Game Map</b>. 
Events must be added to a map, since the way a user has to trigger these events will be by 
triggering them in different ways always on the game map.

## Event object keys
### id
Determines the event ID. The event ID is linked to map coordinates in the map configuration json.
### Trigger
Determines the type of trigger of the event. For the moment it exists just two options:
* COLLISION: The event will be triggered when the character enters in the same cell as the event.
* INTERACT: The event will be triggered when the character position is close to the event cell.
### Script
A list of actions to be executed when the event is triggered. This array should contain objects where the first key
must be the identifier of the action. (See `src/engine/event/actions/JsonKeyToActionClass.ts` for available keys).
### Allow move
Determines if the character can move while the event is in execution.
### Permanent
Determines if the event will disappear once finished. If true, every time we trigger the event it will be executed. 
If false, it will deactivate after the first execution.

#### Example of JSON event
```json
[
  {
    "id": 0,
    "trigger": "COLLISION",
    "script": [
      {
        "showMessage": "¡Hola mundo!"
      },
      {
        "showMessage": "¿Qué tal?"
      }
    ],
  "allowMove": false,
  "permanent": true
  }
]
```
The above event describes an event that will display two messages in a text box, which will be triggered when
the character enters the same cell in which the event is declared, the character cannot move until the event has ended
and the event will be re-executed each time the character passes through its cell.