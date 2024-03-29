import { Config } from "@/hooks/useConfig";
import { useState } from "react";

export const Playground = ({ config }: { config: Config }) => {
  const [input, setInput] = useState("");

  return (
    <div
      className={`grid ${config.preview ? "grid-cols-3" : "grid-cols-2"} flex-1 gap-2 px-2 pb-2 w-full`}
    >
      <textarea
        onChange={(e) => setInput(e.target.value)}
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
  );
};
