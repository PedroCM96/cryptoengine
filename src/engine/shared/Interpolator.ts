import { Variable } from "../variable";

export class Interpolator {
  static interpolate(template: string, variables: Variable): string {
    const regex = /{{(.*?)}}/g;
    if (!regex.test(template)) {
      return template;
    }

    return template.replace(regex, (_, key) => {
      const trimmedKey = key.trim();
      return variables.get(trimmedKey) || `{{${trimmedKey}}}`;
    });
  }
}