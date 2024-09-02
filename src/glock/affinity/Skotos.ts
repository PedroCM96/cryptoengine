import { Affinity } from "./Affinity.ts";
import { AffinityType } from "./AffinityType.ts";

export class Skotos implements Affinity {
  get type(): AffinityType {
    return AffinityType.SKOTOS;
  }

  get strengths(): AffinityType[] {
    return [AffinityType.AEROS, AffinityType.PYROS];
  }

  get weaknesses(): AffinityType[] {
    return [AffinityType.PYROS, AffinityType.HYDROS];
  }
}