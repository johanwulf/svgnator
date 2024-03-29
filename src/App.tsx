import { useEffect, useState } from "react";
import beautify from "js-beautify";
import ColorBar from "@/components/ColorBar";
import Settings from "@/components/Settings";
import useSettings from "@/hooks/useSettings";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(input);
  const [colors, setColors] = useState<string[]>([]);
  const { settings, setSettingsValue } = useSettings();

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
    const svgString = sanitizeSvg(output);
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
  }, [output]);

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen bg-primary/90">
      <Settings settings={settings} setSettingsValue={setSettingsValue} />
      <div
        className={`grid ${settings.preview ? "grid-cols-3" : "grid-cols-2"} flex-1 gap-2 px-2 pb-2 w-full`}
      >
        <textarea
          onChange={(e) => {
            setInput(e.target.value);
            setOutput(e.target.value);
          }}
          spellCheck={false}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-xl resize-none outline-none border-solid border-1 border-white"
        />
        <textarea
          value={
            settings.format
              ? beautify.html(sanitizeSvg(output), { indent_size: 4 })
              : sanitizeSvg(output)
          }
          spellCheck={false}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-xl resize-none outline-none"
          readOnly
        />
        {settings.preview && (
          <div
            className="flex items-center justify-center bg-white rounded-xl p-8"
            dangerouslySetInnerHTML={{ __html: sanitizeSvg(output) }}
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
