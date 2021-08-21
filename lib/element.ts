import { Var } from "./var";

export interface ET {
  name: string;
  props: Record<string, Var<any> | Function | string>;
  vars: Record<string, Variable>;
  children: Array<string | ET>;
}

export interface Variable {
  child?: Array<string>;
  attr?: Array<string>;
}

export const E = (
  name: string,
  props: Record<string, Var<any> | Function | string>,
  ...children: Array<string | ET>
): ET => {
  const vars: Record<string, Variable> = {};

  for (const prop in props) {
    if (props[prop] instanceof Var) {
      const _var = props[prop] as unknown as Var<any>;
      if (vars[_var.id]) {
        vars[_var.id] = {};
      }
      if (vars[_var.id].attr) {
        vars[_var.id].attr?.push(prop);
      } else {
        vars[_var.id].attr = [prop];
      }
      props[prop] = _var.value;
    }
  }

  for (const child in children) {
    if (children[child] instanceof Var) {
      const _var = children[child] as unknown as Var<any>;
      if (!vars[_var.id]) {
        vars[_var.id] = {};
      }

      if (vars[_var.id].child) {
        vars[_var.id].child?.push(child);
      } else {
        vars[_var.id].child = [child];
      }
      children[child] = _var.value;
    }
  }

  return {
    name: name,
    props: props,
    vars: vars,
    children: children,
  };
};
