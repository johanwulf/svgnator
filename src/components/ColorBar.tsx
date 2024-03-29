import { useState, useCallback } from "react";
import { Button } from "./ui/button";
import { HexColorPicker } from "react-colorful";

type ColorBarProps = {
  colors: string[];
  onChange: (oldColor: string, newColor: string) => void;
};

const ColorBar = ({ colors, onChange }: ColorBarProps) => {
  const [active, setActive] = useState(-1);

  const handleColorBoxClick = useCallback((idx: number) => {
    setActive(idx);
  }, []);

  const handleClosePicker = useCallback(() => {
    setActive(-1);
  }, []);

  return (
    <div className="fixed flex flex-row w-auto h-auto bottom-4 mx-auto bg-white rounded">
      {colors.map((c, idx) => (
        <div className="flex-auto p-4" key={idx}>
          <div
            className="h-8 w-8 border border-black rounded flex flex-column"
            style={{ background: c }}
            onClick={() => handleColorBoxClick(idx)}
            tabIndex={0}
          ></div>
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
    </div>
  );
};

export default ColorBar;
