import {closeTextBox, openTextBox, TextBox} from "../elements/textbox.ts";
import {UI} from "../UI.ts";

export async function handleUI(ui: UI): Promise<void> {
    if (ui.isTextBoxOpened()) {
        openTextBox(ui.getTextBox() as TextBox);
    } else {
        closeTextBox();
    }

}