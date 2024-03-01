import { Bus, Message } from "../../../src/engine/bus";

describe("Bus class test", () => {
  let message: Message;
  let message2: Message;
  let message3: Message;

  beforeEach(() => {
    message = {} as Message;
    message2 = {} as Message;
    message3 = {} as Message;
  });

  it("Should add message correctly", () => {
    const sut = new Bus();
    sut.addMessage(message);
    expect(sut.getMessages()).toHaveLength(1);
  });

  it("Should return next message", () => {
    const sut = new Bus();
    /* @ts-expect-error ignore ignore */
    sut.messages.push(...[message2, message3, message]);
    const first = sut.next();
    const second = sut.next();
    const third = sut.next();
    const fourth = sut.next();

    expect(fourth).toBeNull();
    expect([first, second, third]).toStrictEqual([message2, message3, message]);
  });

  it("Should return that has messages", () => {
    const sut = new Bus();
    /* @ts-expect-error ignore */
    sut.messages.push(...[message2, message3, message]);
    expect(sut.hasMessages()).toBeTruthy();
  });
});
