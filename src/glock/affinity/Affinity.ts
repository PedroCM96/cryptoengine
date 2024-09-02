import { AffinityType } from "./AffinityType.ts";

export interface Affinity {
  get type(): AffinityType;
  get weaknesses(): AffinityType[],
  get strengths(): AffinityType[],
}