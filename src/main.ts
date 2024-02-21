import './style.css'
import {
    GAME_CANVAS_SIZE,
    initUI,
    KEYBOARD_INPUT_MAP,
    Map,
    process,
    TEXTBOX_BORDER_RADIUS,
    TEXTBOX_HEIGHT,
    TEXTBOX_PADDING,
    TEXTBOX_WIDTH,
    UI
} from "./engine";
import {initInputState, inputDetection, InputState, resetInputState} from "./engine/input";
import {Global} from "./engine/Global.ts";
import {Character} from "./engine/character";


let inputState: InputState|null = null;
let character: Character|null = null;
let map: Map|null = null;
let ui: UI | null = null;

let ctx: CanvasRenderingContext2D|null = null;

// Initializing canvas and game state
document.addEventListener("DOMContentLoaded", async () => {
    const appContainer = document.getElementById('app') as HTMLElement;
    appContainer.style.width = `${GAME_CANVAS_SIZE[0]}px`;
    appContainer.style.height = `${GAME_CANVAS_SIZE[1]}px`;

    const canvas: HTMLCanvasElement = document.getElementById('game') as HTMLCanvasElement;
    canvas.width = GAME_CANVAS_SIZE[0];
    canvas.height = GAME_CANVAS_SIZE[1];

    ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    map = await Map.fromId(0); // Hardcoded ID 0
    inputState = initInputState(KEYBOARD_INPUT_MAP);
    ui = initUI();
    character = new Character();

    // UI Adjustments
    const textbox = document.getElementById('textbox') as HTMLElement;
    textbox.style.width = `${TEXTBOX_WIDTH}px`;
    textbox.style.height = `${TEXTBOX_HEIGHT}px`;
    textbox.style.borderRadius = `${TEXTBOX_BORDER_RADIUS}px`;
    textbox.style.padding = `${TEXTBOX_PADDING}px`;
    window.requestAnimationFrame(gameLoop);
});

// Detecting inputs
document.addEventListener("keydown", (e) => {
    if (!ctx || !inputState || !character || !map || !ui) {
        return;
    }

    inputDetection(inputState, KEYBOARD_INPUT_MAP, e.code);
});

let secondsPassed;
let oldTimeStamp = 0;
let fps;


 async function gameLoop(timestamp: number)  {
     /** FPS Issues **/
     secondsPassed = (timestamp - oldTimeStamp) / 1000;
     oldTimeStamp = timestamp;
     fps = Math.round(1 / secondsPassed);
     (document.getElementById('fps') as HTMLDivElement).innerText = fps.toString();


     if (!ctx || !inputState || !character || !map || !ui) {
         window.requestAnimationFrame(gameLoop);
         return;
     }

     const global = new Global(ctx, inputState, character, map, ui);
     await process(global);
     resetInputState(inputState);
     window.requestAnimationFrame(gameLoop);
 }

