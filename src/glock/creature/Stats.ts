export class Stats {
  constructor(
    private readonly _vitality: number,
    private readonly _force: number,
    private readonly _guard: number,
    private readonly _mysticForce: number,
    private readonly _mysticGuard: number,
    private readonly _agility: number
  ) {}

  get vitality(): number {
    return this._vitality;
  }

  get force(): number {
    return this._force;
  }

  get guard(): number {
    return this._guard;
  }

  get mysticForce(): number {
    return this._mysticForce;
  }

  get mysticGuard(): number {
    return this._mysticGuard;
  }

  get agility(): number {
    return this._agility;
  }
}