import { useEffect, useState } from "react";
import ColorBar from "@/components/ColorBar";
import Settings from "@/components/Settings";
import PlayGround from "@/components/PlayGround";
import useSettings from "@/hooks/useSettings";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(input);
  const [colors, setColors] = useState<string[]>([]);
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

  const onInput = (e: any) => {
    const params = new URLSearchParams();
    params.append("input", window.btoa(e));
    const queryString = params.toString();
    const newUrl = `${window.location.pathname}?${queryString}`;
    window.history.replaceState(null, "", newUrl);
    setInput(e);
    setOutput(e);
  };

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen bg-secondary/90">
      <Settings settings={settings} setSettingsValue={setSettingsValue} />
      <PlayGround
        settings={settings}
        onInput={onInput}
        input={input}
        output={output}
      />
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
