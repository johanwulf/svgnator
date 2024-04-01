import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import prettier from "prettier";
import babel from "prettier/plugins/babel";
import estree from "prettier/plugins/estree";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const REACT_TEMPLATE = `const svg = () => {
CODE
}
`;

export async function transform(settings: any, svg: string) {
  let obj = svg;

  if (settings.removeIds) {
    obj = obj.replace(/id="[^"]*"/g, "");
  }

  if (settings.react) {
    obj = obj.replace(/class=/g, "className=");
    obj = obj.replace(/xmlns:xlink="http:\/\/www\.w3\.org\/1999\/xlink"/g, "");
    obj = REACT_TEMPLATE.replace("CODE", obj);
  }

  if (settings.removeClasses) {
    obj = obj.replace(/className="[^"]*"/g, "");
    obj = obj.replace(/class="[^"]*"/g, "");
  }

  if (settings.removeSizing) {
    obj = obj.replace(/width="[^"]*"/, "").replace(/height="[^"]*"/, "");
  }

  if (settings.format) {
    obj = await prettier.format(obj, {
      semi: false,
      parser: "babel",
      plugins: [babel, estree],
    });
  }

  obj = obj.replace(";", "");

  return obj;
}
