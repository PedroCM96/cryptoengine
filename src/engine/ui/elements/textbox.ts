export type TextBox = {
    width: number,
    height: number,
    content: string
}

export function openTextBox(textBox: TextBox, document: Document): void {
    const div = document.getElementById('textbox') as HTMLElement;
    div.style.visibility = 'visible';
    div.style.height = `${textBox.height}px`;
    div.style.width = `${textBox.width}px`;
    div.innerText = textBox.content;
}

export function closeTextBox(document: Document): void {
    const div = document.getElementById('textbox') as HTMLElement;
    div.style.visibility = 'hidden';
    div.innerText = '';
}