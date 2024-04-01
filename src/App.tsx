import { useEffect, useState } from "react";
import ColorBar from "@/components/ColorBar";
import Settings from "@/components/Settings";
import useSettings from "@/hooks/useSettings";
import prettier from "prettier";
import babel from "prettier/plugins/babel";
import estree from "prettier/plugins/estree";

const REACT_TEMPLATE = `const svg = () => {
CODE
}
`;

const transform = async (settings: any, svg: string) => {
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
};

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(input);
  const [colors, setColors] = useState<string[]>([]);
  const [transformed, setTransformed] = useState("");
  const { settings, setSettingsValue } = useSettings();

  useEffect(() => {
    const u = window.atob(
      new URLSearchParams(document.location.search).get("input") ?? "",
    );
    setInput(u);
    setOutput(u);
  }, []);

  useEffect(() => {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(output, "image/svg+xml");
    const elements = svgDoc.querySelectorAll("*");
    const fillColors: string[] = [];

    elements.forEach((element) => {
      const fill = element.getAttribute("fill");
      if (fill && !fillColors.includes(fill)) {
        fillColors.push(fill);
      }
    });

    setColors([...new Set(fillColors)]);
  }, [output]);

  useEffect(() => {
    const transformAndSetSvg = async () => {
      const transformedSvg = await transform(settings, output);
      setTransformed(transformedSvg);
    };

    transformAndSetSvg();
  }, [settings, output]);

  const onInput = (e: any) => {
    const params = new URLSearchParams();
    params.append("input", window.btoa(e));
    const queryString = params.toString();
    const newUrl = `${window.location.pathname}?${queryString}`;
    window.history.replaceState(null, "", newUrl);
    setInput(e);
    setOutput(e);
  };

  const handleDrop = async (e: any) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files;
    if (dropped.length === 1) {
      const [file] = dropped;
      if (file.type === "image/svg+xml") {
        const reader = new FileReader();
        reader.onload = async (e: any) => {
          onInput(e.target.result);
        };
        reader.readAsText(file);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen bg-primary/90">
      <Settings settings={settings} setSettingsValue={setSettingsValue} />
      <div
        className={`grid ${settings.preview ? "grid-cols-3" : "grid-cols-2"} flex-1 gap-2 px-2 pb-2 w-full`}
      >
        <textarea
          defaultValue={input}
          onChange={(e) => onInput(e.target.value)}
          spellCheck={false}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-xl resize-none outline-none border-solid border-1 border-white"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        />
        <textarea
          value={transformed}
          spellCheck={false}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-xl resize-none outline-none"
          readOnly
        />
        {settings.preview && (
          <div
            className="flex items-center justify-center bg-white rounded-xl p-8"
            dangerouslySetInnerHTML={{ __html: output }}
          />
        )}
      </div>
      <ColorBar
        colors={colors}
        onChange={(oldColor: string, newColor: string) =>
          setOutput(output.replace(new RegExp(oldColor, "g"), newColor))
        }
        onReset={() => setOutput(input)}
      />
    </div>
  );
}

export default App;
