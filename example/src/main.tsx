/** @jsx E **/
import { E, Var, Mount } from "../../lib/main";



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
        <input oninput={(e)=> input.set(e.target.value)}/>
        <h1>{input}</h1>
      </div>
    );
}

Mount(App, document.getElementById("app") as HTMLElement);
