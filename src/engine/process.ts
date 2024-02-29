import {Global} from "./Global.ts";
import {Character, handleCharacterMovement} from "./character";
import {handleEvents} from "./event";
import {handleUI, UI} from "./ui";
import {InputState, resetActionButtons} from "./input";
import {Map} from './map';

export async function process(global: Global): Promise<void>
{
    const character: Character = global.character;
    const inputState: InputState = global.inputState;
    const map: Map = global.map;
    const ui: UI = global.ui;
    const ctx: CanvasRenderingContext2D = global.ctx;

    // Render map with character
    global.map.render(character, ctx);

    global.character.render(ctx, {});
    // Handle character's movement
    const hasMoved = handleCharacterMovement(inputState, map, character);

    // Reset permanent events
    global.map.restoreInteractiveEvents();
    if (hasMoved) {
        global.map.restoreCollideEvents();
    }

    // Check if any event has been triggered
    await handleEvents(global);

    // Handle UI
    await handleUI(ui, global.document);

    // If any action button is pressed, we reset it.
    resetActionButtons(inputState);
}


// 1. Render map
// 2. Render character above map
// 3. Handle events
// 4. Render UI Issues