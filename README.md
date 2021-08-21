# stimuli
a react like library that dont use vdom, instead it use different and efficient technique to make reactive state   

## example
```typescript
/** @jsx E **/
import { E, Var, Mount } from "../../lib/main";



const App = () => {
  const counter = new Var(0);

  return (
      <div>
        <button
          onclick={() => {
            counter.set(counter.value + 1);
          }}
        >
          +
        </button>
        <h1>{counter}</h1>
        <button
          onclick={() => {
            counter.set(counter.value - 1);
          }}
        >
          -
        </button>
      </div>
    );
}

Mount(App, document.getElementById("app") as HTMLElement);
```

## how it works
stimuli dont use any vdom and it dont keep another copy of ui in memory, instead it add a unique attribute that your variable `new Var()` 
generates to the html element , that whenever you will update new `Var()`, it will query select all elements with that unique attributes and updates with new value.

## limitations
- no if else (working on it but it will be a little problem to implement in current architecture)
- this is experimental and i actually want to make it a compiler like svelte that the output will be more efficient.

## benefits
- efficient and fast
- easy and flexible
- feels and look like react



