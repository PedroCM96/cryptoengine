// @ts-nocheck
import {closeTextBox, openTextBox, TextBox} from "../../../../src/engine";
import {StubbedInstance, stubInterface} from "ts-sinon";
describe('TextBox UI element test', () => {
    let document: StubbedInstance<Document>;
    let htmlElement: StubbedInstance<HTMLElement>;
    let cssStyle: StubbedInstance<CSSStyleDeclaration>;

    beforeEach(() => {
        document = stubInterface<Document>();
        htmlElement =  stubInterface<HTMLElement>()
        cssStyle = stubInterface<CSSStyleDeclaration>();
    });
    it('Should open text box', () => {
        document.getElementById.returns(htmlElement);

        htmlElement.style = cssStyle;
        openTextBox({} as TextBox, document);
        expect(cssStyle.visibility).toBe('visible');
    });

    it('Should apply styles to text box', () => {
        const height = 400;
        const width = 899;

        document.getElementById.returns(htmlElement);

        htmlElement.style = cssStyle;
        openTextBox({height, width} as TextBox, document);
        expect(cssStyle.height).toBe(`${height}px`);
        expect(cssStyle.width).toBe(`${width}px`);
    });

    it('Should apply content to text box', () => {
        const content = 'Lorem ipsum ....';

        document.getElementById.returns(htmlElement);

        htmlElement.style = cssStyle;
        openTextBox({content} as TextBox, document);
        expect(htmlElement.innerText).toBe(content);
    });

    it('Should close textbox', () => {
        cssStyle.visibility = 'visible';
        htmlElement.innerText = 'Lorem ipsum ....';
        document.getElementById.returns(htmlElement);
        htmlElement.style = cssStyle;

        closeTextBox(document);
        expect(cssStyle.visibility).toBe('hidden');
        expect(htmlElement.innerText).toBe('');
    });
});