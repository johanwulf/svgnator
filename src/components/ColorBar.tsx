import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { HexColorPicker } from "react-colorful";

type ColorBarProps = {
  colors: string[];
  onChange: (oldColor: string, newColor: string) => void;
  onReset: () => void;
};

const ColorBar = ({ colors, onChange, onReset }: ColorBarProps) => {
  const [active, setActive] = useState(-1);

  const handleColorBoxClick = useCallback((idx: number) => {
    setActive(idx);
  }, []);

  const handleClosePicker = useCallback(() => {
    setActive(-1);
  }, []);

  if (!(colors.length > 0)) {
    return <></>;
  }

  return (
    <div className="fixed flex flex-row w-auto h-auto bottom-4 mx-auto bg-primary rounded items-center gap-4 p-4">
      {colors.map((c, idx) => (
        <div className="" key={idx}>
          <Button
            className="w-8 h-8 border border-black"
            style={{ background: c }}
            onClick={() => handleColorBoxClick(idx)}
          />
          {active === idx && (
            <div className="absolute bottom-[120%]">
              <Button
                variant="outline"
                className="absolute z-20 w-5 h-5 right-[-1.25rem] p-0"
                onClick={handleClosePicker}
              >
                X
              </Button>
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
