import { Affinity } from "./Affinity.ts";
import { AffinityType } from "./AffinityType.ts";

export class Electros implements Affinity {
  get type(): AffinityType {
    return AffinityType.ELECTROS;
  }

  get strengths(): AffinityType[] {
    return [AffinityType.HYDROS, AffinityType.AEROS];
  }

  get weaknesses(): AffinityType[] {
    return [AffinityType.BOTANIS, AffinityType.ELECTROS];
  }

}