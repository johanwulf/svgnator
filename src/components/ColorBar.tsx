import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { HexColorPicker } from "react-colorful";
import useOnClickOutside from "@/hooks/useOnClickOutside";

type ColorBarProps = {
  colors: string[];
  onChange: (oldColor: string, newColor: string) => void;
  onReset: () => void;
};

const ColorBar = ({ colors, onChange, onReset }: ColorBarProps) => {
  const [active, setActive] = useState(-1);
  const colorPickerRef = useRef(null);

  const handleColorBoxClick = useCallback((idx: number) => {
    setActive(idx);
  }, []);

  useOnClickOutside(colorPickerRef, () => setActive(-1));

  if (!(colors.length > 0)) {
    return <></>;
  }

  return (
    <div className="fixed flex flex-row w-auto h-auto bottom-4 mx-auto bg-primary rounded items-center gap-4 p-4">
      {colors.map((c, idx) => (
        <div className="" key={idx}>
          <Button
            className={`w-8 h-8 border border-black ${active === idx ? "animate-pulse" : ""}`}
            style={{ background: c }}
            onClick={() => handleColorBoxClick(idx)}
          />
          {active === idx && (
            <div ref={colorPickerRef} className="absolute bottom-[105%]">
              <HexColorPicker
                color={c}
                onChange={(color) => onChange(c, color)}
              />
            </div>
          )}
        </div>
      ))}
      <Button onClick={onReset} variant="destructive">
        Reset colors
      </Button>
    </div>
  );
};

export default ColorBar;
