import { ListMap } from "./main";
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
  implementation?:number;
}


export const E = (
  name: string,
  props: Record<string, Var<any> | Function | string>,
  ...children: Array<string | ET |((props:object)=>ET) >
): ET => {
  const vars: Record<string, Variable> = {};
  try {
    const fn = eval(name);
    if ( fn instanceof Function ) {
      const output = fn(props, ...children)  as ET;
    
      name = "span"
      children = [output];
    }
  }
  catch {}


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
    else if (children[child] instanceof ListMap){
      const list = children[child] as unknown as ListMap;

      // if (!vars[list.id]) {
      //   vars[list.id] = {};
      // }

      // if (vars[list.id].child) {
      //   vars[list.id].child?.push(child);
      // } else {
      //   vars[list.id].child = [child];
      // }
      // vars[list.id].implementation = list.implementationId
      let _var:Record<string, Variable> = {};

      _var[list.id]={ implementation : list.implementationId };
   
      children[child] ={
        name : "span",
        children : list.value,
        vars : _var,
        props:{}
      }
    
    }
    
  }

  return {
    name: name,
    props: props,
    vars: vars,

    children: children as (string | ET)[],
  };
};
