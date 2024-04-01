import { Settings } from "@/hooks/useSettings";
import { transform } from "@/lib/utils";
import { useEffect, useState } from "react";

type PlayGroundProps = {
  settings: Settings;
  onInput: (e: any) => void;
  input: string;
  output: string;
};

const PlayGround = ({ settings, input, output, onInput }: PlayGroundProps) => {
  const [transformed, setTransformed] = useState("");

  useEffect(() => {
    const transformAndSetSvg = async () => {
      const transformedSvg = await transform(settings, output);
      setTransformed(transformedSvg);
    };
    transformAndSetSvg();
  }, [settings, output]);

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
    <div
      className={`grid ${settings.preview ? "grid-cols-3" : "grid-cols-2"} flex-1 gap-2 px-2 pb-2 w-full bg-primary-foreground`}
    >
      <textarea
        defaultValue={input}
        onChange={onInput}
        spellCheck={false}
        className="px-4 py-2 bg-secondary text-secondary-foreground rounded-xl resize-none outline-none border-solid border-1 border-white"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      />
      <textarea
        value={transformed}
        spellCheck={false}
        className="px-4 py-2 bg-secondary text-secondary-foreground rounded-xl resize-none outline-none"
        readOnly
      />
      {settings.preview && (
        <div
          className="flex items-center justify-center bg-primary-foreground rounded-xl p-8"
          dangerouslySetInnerHTML={{ __html: output }}
        />
      )}
    </div>
  );
};

export default PlayGround;
