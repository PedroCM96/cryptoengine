import {Global} from "./Global.ts";
import {handleCharacterMovement} from "./character";
import {handleEvents} from "./event";
import {handleUI} from "./ui";
import {resetActionButtons} from "./input";

export async function process(global: Global): Promise<void>
{
    // Render map with character
    global.map.render(global);

    global.character.render(global);
    // Handle character's movement
    const hasMoved = handleCharacterMovement(global);

    // Reset permanent events
    if (hasMoved) {
        global.map.restorePermanentEvents();
    }

    // Check if any event has been triggered
    await handleEvents(global);

    // Handle UI
    await handleUI(global);

    resetActionButtons(global.inputState);
}


// 1. Render map
// 2. Render character above map
// 3. Handle events
// 4. Render UI Issues