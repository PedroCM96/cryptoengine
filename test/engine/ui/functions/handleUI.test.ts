import { StubbedInstance, stubInterface } from "ts-sinon";
import {
  closeTextBox,
  handleUI,
  openTextBox,
  UI,
} from "../../../../src/engine";

jest.mock("../../../../src/engine/ui/elements/textbox", () => ({
  openTextBox: jest.fn(),
  closeTextBox: jest.fn(),
}));

describe("Handle UI function test", () => {
  const sut = handleUI;
  /* @ts-expect-error ignore */
  let document: Document;
  let ui: StubbedInstance<UI>;
  let openTextBoxMock: jest.Mock;
  let closeTextBoxMock: jest.Mock;

  beforeEach(() => {
    ui = stubInterface<UI>();
    /* @ts-expect-error ignore */
    document = stubInterface<Document>();
    openTextBoxMock = openTextBox as jest.Mock;
    closeTextBoxMock = closeTextBox as jest.Mock;

    jest.clearAllMocks();
  });

  it("Should open text box if is opened in UI", async () => {
    ui.isTextBoxOpened.returns(true);
    await sut(ui, document);
    expect(openTextBoxMock.mock.calls).toHaveLength(1);
    expect(closeTextBoxMock.mock.calls).toHaveLength(0);
  });

  it("Should close text box if is not opened in UI", async () => {
    ui.isTextBoxOpened.returns(false);
    await sut(ui, document);

    expect(openTextBoxMock.mock.calls).toHaveLength(0);
    expect(closeTextBoxMock.mock.calls).toHaveLength(1);
  });
});
