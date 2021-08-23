import type { ET } from "./element";

export type Component<T> = (props:T, ...children: Array<string | ET |((props:object)=>ET)>) => ET;

export const Mount = (
  obj: Component<{}>,
  appendTo: HTMLElement
): HTMLElement => {
  const sub = sub_mount(obj({}), obj);
  appendTo.appendChild(sub);
  return sub;
};

const sub_mount = <T>(to_render: ET, obj: Component<T>) => {
  let element = document.createElement(to_render.name);
  for (const prop in to_render.props) {
    if (prop.trim().startsWith("on")) {
      // @ts-ignore
      element.addEventListener(
        prop.slice(2),
        // @ts-ignore
        to_render.props[prop].bind(obj)
      );
    } else {
      element.setAttribute(prop, to_render.props[prop] as string);
    }
  }

  for (const prop in to_render.vars) {
    element.setAttribute(prop, JSON.stringify(to_render.vars[prop]));
  }
  console.log(to_render.children);
  for (const child of to_render.children) {
    if (typeof child == "object") {
      element.appendChild(sub_mount(child, obj));
    } else {
      element.append(child);
    }
  }

  return element;
};
