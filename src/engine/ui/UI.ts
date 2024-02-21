import {TextBox} from "./textbox.ts";
import {TEXTBOX_HEIGHT, TEXTBOX_WIDTH} from "../config.ts";

export class UI {
    constructor(private textBox: TextBox | null) {}

    openTextBox(content: string): void {
        this.textBox = {
            width: TEXTBOX_WIDTH,
            height: TEXTBOX_HEIGHT,
            content
        }
    }

    closeTextBox(): void {
        this.textBox = null;
    }

    isTextBoxOpened(): boolean {
        return !!this.textBox;
    }

    getTextBox(): TextBox|null {
        return this.textBox;
    }
}

export function initUI(): UI {
    return new UI(null);
}