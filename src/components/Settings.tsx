import { Settings as S } from "@/hooks/useSettings";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "./ThemeToggle";

type SettingsProps = {
  settings: S;
  setSettingsValue: (key: keyof S, value: boolean) => void;
};

const SETTINGS_LABEL_MAP: Record<keyof S, string> = {
  format: "Format code",
  preview: "Preview SVG",
  react: "React component",
  removeSizing: "Remove sizing",
  removeClasses: "Remove classes",
  removeIds: "Remove IDs",
  saveSettings: "Save settings in local storage",
};

const Settings = ({ settings, setSettingsValue }: SettingsProps) => {
  return (
    <nav className="flex p-4 w-full flex-wrap justify-between items-center bg-primary-foreground">
      <div className="flex flex-wrap gap-8 p-4">
        {Object.entries(settings).map(([key, value]) => (
          <div className="flex items-center space-x-2" key={key}>
            <Switch
              id={key}
              onCheckedChange={(val) => setSettingsValue(key as keyof S, val)}
              checked={value}
            />
            <Label htmlFor={key} className="text-secondary-foreground">
              {SETTINGS_LABEL_MAP[key as keyof S]}
            </Label>
          </div>
        ))}
      </div>
      <ThemeToggle />
    </nav>
  );
};

export default Settings;
