import { Config } from "@/hooks/useConfig";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

type SettingsProps = {
  config: Config;
  setConfigValue: (key: keyof Config, value: boolean) => void;
};

const CONFIG_LABEL_MAP: Record<keyof Config, string> = {
  format: "Format code",
  preview: "Preview SVG",
  react: "React component",
  removeSizing: "Remove sizing",
  removeClasses: "Remove classes",
  removeIds: "Remove IDs",
};

const Settings = ({ config, setConfigValue }: SettingsProps) => {
  return (
    <nav className="flex flex-row gap-8 p-4 w-full">
      {Object.entries(config).map(([key, value]) => (
        <div className="flex items-center space-x-2" key={key}>
          <Switch
            id={key}
            className="dark"
            onCheckedChange={(val) => setConfigValue(key as keyof Config, val)}
            checked={value}
          />
          <Label htmlFor={key} className="text-primary-foreground">
            {CONFIG_LABEL_MAP[key as keyof Config]}
          </Label>
        </div>
      ))}
    </nav>
  );
};

export default Settings;
