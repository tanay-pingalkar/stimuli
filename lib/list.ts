import {  ET, Variable } from "./element";
import { Mount } from "./mount";
import { uuid } from "./uuid";

export type list_implementation<T> = (value?:T, index?:number)=>ET

export class List<T> {
  value: Array<T>;
  id: string;
  implementations:Array<list_implementation<T>> = [];
  constructor(value: Array<T>) {
    this.value = value;
    this.id = `list_${uuid()}`;
  }

  push(value: T) {
    this.value.push(value);
    console.log(this.id);
    document.querySelectorAll(`[${this.id}]`).forEach((e) => {
     
      let what_to_change = JSON.parse(
        e.getAttribute(this.id) as string
      ) as Variable;

      if (what_to_change.implementation != null) {
        Mount(()=>this.implementations[what_to_change.implementation!](value, this.implementations.length-1), e as HTMLElement);
      }

    });
  }


  map (func:list_implementation<T>):ListMap {
    const jsx =this.value.map((value, index)=>{
      return func(value,index)
    });
    
    this.implementations.push(func);
    console.log("mm")
    return new ListMap(jsx, this.implementations.length -1, this.id);

  }

}

export class ListMap {
  value:Array<ET>
  implementationId:number
  id:string

  constructor(value:Array<ET>, implementationId:number, id:string) {
    this.value = value;
    this.implementationId = implementationId;
    this.id = id;
  }
}


