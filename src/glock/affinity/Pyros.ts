import { Affinity } from "./Affinity.ts";
import { AffinityType } from "./AffinityType.ts";

export class Pyros implements Affinity {
  get type(): AffinityType {
    return AffinityType.PYROS;
  }

  get strengths(): AffinityType[] {
    return [AffinityType.BOTANIS, AffinityType.SKOTOS];
  }

  get weaknesses(): AffinityType[] {
    return [AffinityType.HYDROS, AffinityType.ELECTROS];
  }

}