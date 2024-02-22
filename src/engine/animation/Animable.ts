import {AnimationMap} from "./AnimationMap.ts";

export abstract class Animable {

    protected currentFrame: number;
    private ticksCount: number;
    private readonly ticksToAdvanceFrame: number;

    constructor(
        private readonly animationMap: AnimationMap,
        protected readonly img: HTMLImageElement,
        protected readonly animationSpeed: number
    ) {
        this.currentFrame = 1;
        this.ticksCount = 0;
        this.ticksToAdvanceFrame = Math.abs(60 / animationSpeed);
    }

    protected nextFrame(): void {
        if (this.ticksCount < this.ticksToAdvanceFrame) {
            this.ticksCount++;
            return;
        }

        const maxFrame = this.animationMap.size;
        const newFrame = this.currentFrame + 1 > maxFrame ? 1 : this.currentFrame + 1;
        this.ticksCount = 0;
        this.setCurrentFrame(newFrame);

    }

    protected getCurrentOffset(): number {
        const offset = this.animationMap.get(this.currentFrame);
        if (typeof offset === 'undefined') {
            throw new Error(`Unknow frame ${this.currentFrame} for animation`);
        }

        return offset;
    }

    protected resetAnimation(): void {
        this.setCurrentFrame(1);
    }


    private setCurrentFrame(frame: number): void {
        this.currentFrame = frame;
    }

}