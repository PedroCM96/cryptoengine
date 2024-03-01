import {Message} from "./Message.ts";

export class Bus {
    private messages: Message[] = [];

    addMessage(message: Message): void {
        this.messages.push(message);
    }

    getMessages(): Message[] {
        return this.messages;
    }

    hasMessages(): boolean {
        return this.messages.length > 0;
    }

    next(): Message | null {
        return this.messages.pop() || null;
    }
}