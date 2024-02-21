import {Global} from "../Global.ts";

export abstract class Action {
    public isEnabled: boolean = true;
    constructor() {}

    protected abstract doExecute(global: Global): Promise<void>;
    public async execute(global: Global): Promise<void> {
        await this.doExecute(global);
    }

    /* @ts-ignore */
    static load(data: any): Action {
        throw new Error('Should override this method!');
    };

    public enable(): void {
        this.isEnabled = true;
    }

    protected disable(): void {
        this.isEnabled = false;
    }
}