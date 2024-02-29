import {InputMap} from "./input";
import {Key} from "ts-key-enum";
import {AnimationMap} from "./animation";

// General
export const GAME_CANVAS_SIZE: [number, number] = [608, 416];
export const CELL_SIZE = 32;
export const KEYBOARD_INPUT_MAP: InputMap = {
    UP: [Key.ArrowUp],
    DOWN: [Key.ArrowDown],
    LEFT: [Key.ArrowLeft],
    RIGHT: [Key.ArrowRight],
    ACCEPT: [Key.Enter],
    CANCEL: [Key.Escape]
}

// Character
export const CHARACTER_RESOURCE: string = 'NPC_01.png';
export const CHARACTER_HEIGHT = 48;
export const CHARACTER_WIDTH = 32;
export const CHARACTER_SPEED = 0.3;

export const CHARACTER_ANIMATION_SPEED = 4;

export const CHARACTER_ANIMATION_MAP: AnimationMap = new Map<number, number>([
    [1, 0],
    [2, -32],
    [3, -64],
    [4, -96]
]);


// Map
export const MAP_RESOURCE_PREFIX: string = 'map_';
export const MAP_RESOURCE_EXTENSION: string = 'jpeg';

export const MAP_DATA_FOLDER = '../../../data/maps';

export const MAPA_EVENTS_FOLDER = '../../../data/maps/events'

// UI
export const TEXTBOX_HEIGHT = 60;
export const TEXTBOX_WIDTH = 500;
export const TEXTBOX_BORDER_RADIUS = 8;
export const TEXTBOX_PADDING = 8;

