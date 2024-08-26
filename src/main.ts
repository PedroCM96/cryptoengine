import "./style.css";
import {
  CHARACTER_RESOURCE,
  GAME_CANVAS_SIZE,
  Global,
  KEYBOARD_INPUT_MAP,
  Map,
  process,
  TEXTBOX_BORDER_RADIUS,
  TEXTBOX_HEIGHT,
  TEXTBOX_PADDING,
  TEXTBOX_WIDTH,
  UI
} from "./engine";
import { initInputState, inputDetection, InputState, resetInputState } from "./engine/input";
import { Character, PlayableCharacter } from "./engine/character";
import { Position } from "./engine/shared";
import { Bus, BusMessageType, Message, TeleportMessage } from "./engine/bus";
import { BrowserProvider } from "ethers";
import { Web3 } from "../test/engine/web3";

let inputState: InputState | null = null;
let character: Character | null = null;
let map: Map | null = null;
let ui: UI | null = null;
let global: Global | null = null;
let ctx: CanvasRenderingContext2D | null = null;
const bus: Bus = new Bus();

// Map is the base when all the game will occur, so all the game will be loaded.
async function initializeMap(
  mapId: number,
  characterPosition: Position | null = null,
): Promise<void> {
  const appContainer = document.getElementById("app") as HTMLElement;
  appContainer.style.width = `${GAME_CANVAS_SIZE[0]}px`;
  appContainer.style.height = `${GAME_CANVAS_SIZE[1]}px`;

  const canvas: HTMLCanvasElement = document.getElementById(
    "game",
  ) as HTMLCanvasElement;
  canvas.width = GAME_CANVAS_SIZE[0];
  canvas.height = GAME_CANVAS_SIZE[1];
  ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  map = await Map.fromId(mapId, new Image()); // Hardcoded ID 0
  inputState = initInputState(KEYBOARD_INPUT_MAP);
  ui = new UI();
  const characterImg = new Image();
  characterImg.src = CHARACTER_RESOURCE;
  character = new PlayableCharacter(
    characterImg,
    characterPosition || map.getInitializeCharacterPosition(),
  );

  let web3 = null;
  if (typeof (window as any).ethereum !== 'undefined') {
    const provider = new BrowserProvider((window as any).ethereum);
    web3 = new Web3(provider);
  }

  global = new Global(
    ctx,
    inputState,
    character as PlayableCharacter,
    map,
    ui,
    bus,
    document,
    web3 as Web3
  );

  // UI Adjustments
  const textbox = document.getElementById("textbox") as HTMLElement;
  textbox.style.width = `${TEXTBOX_WIDTH}px`;
  textbox.style.height = `${TEXTBOX_HEIGHT}px`;
  textbox.style.borderRadius = `${TEXTBOX_BORDER_RADIUS}px`;
  textbox.style.padding = `${TEXTBOX_PADDING}px`;
}

document.addEventListener("DOMContentLoaded", async () => {
  // Initializing canvas

  await initializeMap(0);
  window.requestAnimationFrame(gameLoop);
});

// Detecting inputs

let lastKeyPressed: string = "";

document.addEventListener("keydown", (e) => {
  if (!inputState) {
    return;
  }

  if (e.code !== lastKeyPressed) {
    lastKeyPressed = e.code;
    resetInputState(inputState);
  }
  inputDetection(inputState, KEYBOARD_INPUT_MAP, e.code);
});

document.addEventListener("keyup", (e) => {
  if (e.code === lastKeyPressed) {
    resetInputState(inputState as InputState);
  }
});
// Game loop
let secondsPassed;
let oldTimeStamp = 0;
let fps;

async function gameLoop(timestamp: number) {
  /** FPS Issues **/
  secondsPassed = (timestamp - oldTimeStamp) / 1000;
  oldTimeStamp = timestamp;
  fps = Math.round(1 / secondsPassed);
  (document.getElementById("fps") as HTMLDivElement).innerText = fps.toString();

  if (!ctx || !inputState || !character || !map || !ui) {
    return;
  }

  await process(global as Global);
  await handleBusMessages();

  window.requestAnimationFrame(gameLoop);
}

async function handleBusMessages(): Promise<void> {
  if (!bus.hasMessages()) {
    return;
  }

  const message = bus.next() as Message;
  const messageType = message[0];

  if (messageType === BusMessageType.TELEPORT) {
    const data = message[1] as TeleportMessage;

    await initializeMap(data.mapId, data.characterPosition);
    character?.lookAt(data.characterLookAt);
  }
}
