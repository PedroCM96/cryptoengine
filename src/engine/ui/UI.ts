import { TextBox } from "./elements/textbox.ts";
import { TEXTBOX_HEIGHT, TEXTBOX_WIDTH } from "../config.ts";

export class UI {
  constructor(private textBox: TextBox | null = null) {}

  openTextBox(content: string): void {
    this.textBox = {
      width: TEXTBOX_WIDTH,
      height: TEXTBOX_HEIGHT,
      content,
    };
  }

  closeTextBox(): void {
    this.textBox = null;
  }

  isTextBoxOpened(): boolean {
    return !!this.textBox;
  }

  getTextBox(): TextBox | null {
    return this.textBox;
  }
}
