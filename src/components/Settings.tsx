import { Settings as S } from "@/hooks/useSettings";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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
  concatTags: "Concatenate tags",
};

const Settings = ({ settings, setSettingsValue }: SettingsProps) => {
  return (
    <nav className="flex flex-row gap-8 p-4 w-full">
      {Object.entries(settings).map(([key, value]) => (
        <div className="flex items-center space-x-2" key={key}>
          <Switch
            id={key}
            className="dark"
            onCheckedChange={(val) => setSettingsValue(key as keyof S, val)}
            checked={value}
          />
          <Label htmlFor={key} className="text-primary-foreground">
            {SETTINGS_LABEL_MAP[key as keyof S]}
          </Label>
        </div>
      ))}
    </nav>
  );
};

export default Settings;
