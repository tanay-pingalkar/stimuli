/** @jsx E **/
import { E, Var, Mount, Component } from "../../lib/main";

const Button: Component<{prop:string}> = ({prop}, children) => {
  return (
  <div>
    <h1>{prop}</h1>
    {children}
  </div>
  )
}


const App = () => {
  const counter = new Var(0);
  const input = new Var("");
  
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
        <br />
        <input oninput={(e:any)=> input.set(e.target.value)}/>
        <h1>{input}</h1>
        <Button prop="this is a prop"><h1>i am a children</h1></Button>
      </div>
    );
}


Mount(App, document.getElementById("app")!);
