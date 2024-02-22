# Maps
Maps are virtual environments where the <b>Character</b> is located and where the action of the
game takes place.

Maps are the base of the canvas draw, where another important items are rendered above, such as
<b>Characters</b> or <b>UI elements</b>

Each map must have a data definition file located in `src/data/maps` folder.


## Map data definition file
### Naming
The naming of the data definition file must be `map_{id}.json`, where `{id}` should be replaced
by the id of the map.

### Size
This config file key determines the size of the map in Cells. Is an array of just two numbers,
corresponding to the width and height of the map. It is convenient to upload map images with whose
dimensions are multiple of the `CELL_SIZE`. For example, if map size is `[10, 10]` (10x10 cells) and
the `CELL_SIZE` is `32px`, it will be very convenient to upload a map image of size `320x320px` ((10 x 32)x(10x32)px).

### Collisions
An array of coordinates in which the Character cannot pass. It replicates a collision, for example, against a wall.
For example, if we add to this array the coordinates [3,1], the character will never enter this cell.

### Events
An array of coordinates and event ids. Elements of this array should have the following structure:
`[X, Y, eventID]`. The engine will place in the coordinates indicated in every element of this array
the event with id specified. (See `Events` for more info).

