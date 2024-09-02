import { Affinity } from "./Affinity.ts";
import { AffinityType } from "./AffinityType.ts";

export class Aeros implements Affinity {
  get type(): AffinityType {
    return AffinityType.AEROS;
  }

  get strengths(): AffinityType[] {
    return [AffinityType.BOTANIS, AffinityType.SKOTOS];
  }

  get weaknesses(): AffinityType[] {
    return [AffinityType.ELECTROS, AffinityType.SKOTOS];
  }

}