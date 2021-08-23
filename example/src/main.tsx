/** @jsx E **/
import { E, Var, Mount, Component, List } from "../../lib/main";

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

  const todo = new List<string>([]);
  
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
      
        
        <Button prop="this is a prop"><h1>i am a children</h1></Button>
        <input oninput={(e:any)=> input.set(e.target.value)}/>
        <button onclick={()=>{
          todo.push(input.value);
          input.set("");
        }}>add todo</button>
        <h1>{input}</h1>
        <h1>todo list</h1>
        <div>
          {todo.map((value)=><li>{value}</li>)}
        </div>
      </div>
    );
}


Mount(App, document.getElementById("app")!);
