import { Affinity } from "./Affinity.ts";
import { AffinityType } from "./AffinityType.ts";

export class Botanis implements Affinity {
  get type(): AffinityType {
    return AffinityType.BOTANIS;
  }

  get strengths(): AffinityType[] {
    return [AffinityType.HYDROS, AffinityType.AEROS];
  }

  get weaknesses(): AffinityType[] {
    return [AffinityType.PYROS, AffinityType.AEROS];
  }

}