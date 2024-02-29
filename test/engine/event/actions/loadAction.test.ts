import {loadAction} from "../../../../src/engine/event/actions";

jest.mock("../../../../src/engine/event/actions/ShowMessage", () => ({
    ShowMessage: {
        load: jest.fn()
    }
}));

describe('Load Action function test', () => {
    const sut = loadAction;

    let showMessage = require('../../../../src/engine/event/actions/ShowMessage');

   it('Should throw error if action key is not supported', async () => {
       await expect(sut('Unsupported Action', {})).rejects.toBeTruthy();
   });

   it('Should call the correct action', async () => {
       const data = 'Hello world!';
       await sut('showMessage', data);

       expect(showMessage['ShowMessage'].load.mock.calls).toHaveLength(1);
       expect(showMessage['ShowMessage'].load.mock.calls[0][0]).toBe(data);
   });
});