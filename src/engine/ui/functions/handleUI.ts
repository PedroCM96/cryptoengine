import { closeTextBox, openTextBox, TextBox } from "../elements/textbox.ts";
import { UI } from "../UI.ts";

export async function handleUI(ui: UI, document: Document): Promise<void> {
  if (ui.isTextBoxOpened()) {
    openTextBox(ui.getTextBox() as TextBox, document);
  } else {
    closeTextBox(document);
  }
}
