import { UI } from "../../../src/engine";

jest.mock("../../../src/engine/config", () => ({
  TEXTBOX_WIDTH: 1000,
  TEXTBOX_HEIGHT: 300,
}));

describe("UI class test", () => {
  const sut = new UI();

  it("Should open text box with config width and height", () => {
    const content = "Foo bar baz";
    sut.openTextBox(content);
    expect(sut.getTextBox()).not.toBeNull();
    expect(sut.getTextBox()?.content).toBe(content);
    expect(sut.getTextBox()?.height).toBe(300); // Look the mock above
    expect(sut.getTextBox()?.width).toBe(1000); // Look the mock above
  });

  it("Should open and close text box", () => {
    const content = "Foo bar baz";
    sut.openTextBox(content);
    expect(sut.isTextBoxOpened()).toBeTruthy();
    sut.closeTextBox();
    expect(sut.isTextBoxOpened()).toBeFalsy();
  });
});
