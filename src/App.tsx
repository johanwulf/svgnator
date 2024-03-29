import { useEffect, useState } from "react";
import beautify from "js-beautify";

import "./App.css";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import ColorBar from "./components/ColorBar";

function App() {
  const [value, setValue] = useState("");
  const [format, setFormat] = useState(false);
  const [preview, setPreview] = useState(false);
  const [colors, setColors] = useState<string[]>([]);

  const sanitizeSvg = (svg: string) => {
    if (svg.length === 0) return "";

    const sanitized = svg
      .replace(/xmlns:xlink="http:\/\/www\.w3\.org\/1999\/xlink"/g, "")
      .replace(/class="[^"]*"/, "")
      .replace(/width="[^"]*"/, "")
      .replace(/height="[^"]*"/, "")
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
      <nav className="flex flex-row gap-8 p-4 w-full">
        <div className="flex items-center space-x-2">
          <Switch
            id="airplane-mode"
            className="dark"
            onClick={() => setFormat(!format)}
            checked={format}
          />
          <Label htmlFor="airplane-mode" className="text-primary-foreground">
            Format code
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="airplane-mode"
            className="dark"
            onClick={() => setPreview(!preview)}
            checked={preview}
          />
          <Label htmlFor="airplane-mode" className="text-primary-foreground">
            Preview SVG
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="airplane-mode"
            className="dark"
            onClick={() => setPreview(!preview)}
            checked={preview}
          />
          <Label htmlFor="airplane-mode" className="text-primary-foreground">
            React Component
          </Label>
        </div>
      </nav>
      <div
        className={`grid ${preview ? "grid-cols-3" : "grid-cols-2"} flex-1 gap-2 px-2 pb-2 w-full`}
      >
        <textarea
          onChange={(e) => setValue(e.target.value)}
          spellCheck={false}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-xl resize-none outline-none border-solid border-1 border-white"
        />
        <textarea
          value={
            format
              ? beautify.html(sanitizeSvg(value), { indent_size: 4 })
              : sanitizeSvg(value)
          }
          spellCheck={false}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-xl resize-none outline-none"
          readOnly
        />
        {preview && (
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
