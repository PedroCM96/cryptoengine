import {Global} from "../Global.ts";
import {closeTextBox, openTextBox, TextBox} from "./textbox.ts";

export async function handleUI(global: Global): Promise<void> {
    // Textbox
    if (global.ui.isTextBoxOpened()) {
        openTextBox(global.ui.getTextBox() as TextBox);
    } else {
        closeTextBox();
    }

}