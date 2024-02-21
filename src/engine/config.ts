import {InputMap} from "./input";
import {Key} from "ts-key-enum";

// Determines how many times process method will be called in a second -> Ticks Per Second
export const TPS: number = 100;
export const GAME_CANVAS_SIZE: [number, number] = [576, 384];
export const KEYBOARD_INPUT_MAP: InputMap = {
    UP: [Key.ArrowUp],
    DOWN: [Key.ArrowDown],
    LEFT: [Key.ArrowLeft],
    RIGHT: [Key.ArrowRight],
    ACCEPT: [Key.Enter],
    CANCEL: [Key.Escape]
}

export const CHARACTER_RESOURCE: string = 'character.png';
export const MAP_RESOURCE_PREFIX: string = 'map_';
export const MAP_RESOURCE_EXTENSION: string = 'png';
export const CELL_SIZE = 32;

// UI
export const TEXTBOX_HEIGHT = 60;
export const TEXTBOX_WIDTH = 500;
export const TEXTBOX_BORDER_RADIUS = 8
export const TEXTBOX_PADDING = 8;