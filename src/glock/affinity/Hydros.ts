import { Affinity } from "./Affinity.ts";
import { AffinityType } from "./AffinityType.ts";

export class Hydros implements Affinity {
  get type(): AffinityType {
    return AffinityType.HYDROS;
  }

  get strengths(): AffinityType[] {
    return [AffinityType.PYROS, AffinityType.BOTANIS];
  }

  get weaknesses(): AffinityType[] {
    return [AffinityType.BOTANIS, AffinityType.ELECTROS];
  }

}