import { Variable } from "./element";
import { uuid } from "./uuid";

export class Var<T> {
  value: T;
  id: string;
  constructor(value: T) {
    this.value = value;
    this.id = `var_${uuid()}`;
  }
  set(value: any) {
    this.value = value;

    document.querySelectorAll(`[${this.id}]`).forEach((e) => {
      let what_to_change = JSON.parse(
        e.getAttribute(this.id) as string
      ) as Variable;
      if (what_to_change.child) {
        for (const child of what_to_change.child) {
      
          e.childNodes[parseInt(child)].textContent = this.value as unknown as string;
        }
      }
      if (what_to_change.attr) {
        for (const attr of what_to_change.attr) {
        
          e.setAttribute(attr, this.value as unknown as string);
        }
      }
    });
  }
}
