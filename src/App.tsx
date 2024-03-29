import { useEffect, useState } from "react";
import beautify from "js-beautify";
import "./App.css";
import ColorBar from "./components/ColorBar";
import useConfig from "./hooks/useConfig";
import Settings from "./components/Settings";

function App() {
  const [value, setValue] = useState("");
  const [colors, setColors] = useState<string[]>([]);
  const { config, setConfigValue } = useConfig();

  const sanitizeSvg = (svg: string) => {
    if (svg.length === 0) return "";

    const sanitized = svg
      .replace(/xmlns:xlink="http:\/\/www\.w3\.org\/1999\/xlink"/g, "")
      .replace(/class="[^"]*"/, "")
      .replace(/width="[^"]*"/, "")
      .replace(/height="[^"]*"/, "")
      .replace(/><\/path>/g, "/>")
      .replace("  ", "");
    return sanitized;
  };

  useEffect(() => {
    const svgString = sanitizeSvg(value);
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
    const elements = svgDoc.querySelectorAll("*");
    const fillColors: string[] = [];

    elements.forEach((element) => {
      const fill = element.getAttribute("fill");
      if (fill && !fillColors.includes(fill)) {
        fillColors.push(fill);
      }
    });

    setColors([...new Set(fillColors)]);
  }, [value]);

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen bg-primary/90">
      <Settings config={config} setConfigValue={setConfigValue} />
      <div
        className={`grid ${config.preview ? "grid-cols-3" : "grid-cols-2"} flex-1 gap-2 px-2 pb-2 w-full`}
      >
        <textarea
          onChange={(e) => setValue(e.target.value)}
          spellCheck={false}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-xl resize-none outline-none border-solid border-1 border-white"
        />
        <textarea
          value={
            config.format
              ? beautify.html(sanitizeSvg(value), { indent_size: 4 })
              : sanitizeSvg(value)
          }
          spellCheck={false}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-xl resize-none outline-none"
          readOnly
        />
        {config.preview && (
          <div
            className="flex items-center justify-center bg-white rounded-xl p-8"
            dangerouslySetInnerHTML={{ __html: sanitizeSvg(value) }}
          />
        )}
      </div>
      <ColorBar
        colors={colors}
        onChange={(oldColor: string, newColor: string) =>
          setValue(value.replace(new RegExp(oldColor, "g"), newColor))
        }
      />
    </div>
  );
}

export default App;
