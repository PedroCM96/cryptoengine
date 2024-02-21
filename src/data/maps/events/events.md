# Event keys
## id
Determines the event ID. The event ID is linked to map coordinates in the map configuration json.
## Trigger
Determines the type of trigger of the event. For the moment it exists just two options:
* COLLISION: The event will be triggered when the character enters in the same cell as the event.
* INTERACT: The event will be triggered when the character position is close to the event cell.
## Script
A list of actions to be executed when the event is triggered. This array should contain objects where the first key
must be the identifier of the action. (See `src/engine/event/actions/JsonKeyToActionClass.ts` for available keys).
## Allow move
Determines if the character can move while the event is in execution.
## Permanent
Determines if the event will disappear once finished. If true, every time we trigger the event it will be executed. 
If false, it will deactivate after the first execution.



`[
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
]`