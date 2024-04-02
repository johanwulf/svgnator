import { Settings as S } from "@/hooks/useSettings";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { useModal } from "./ModalStack";

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
  const { openModal } = useModal();
  return (
    <nav className="flex p-4 w-full flex-wrap justify-between items-center bg-primary-foreground">
      <div className="flex flex-wrap gap-8">
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
      <div className="flex flex-wrap gap-8">
        <Button
          onClick={() =>
            openModal({
              title: "Confirmation",
              message: "Are you sure?",
              onClose: () => console.log("closed"),
              element: (
                <Button
                  onClick={() =>
                    openModal({
                      title: "Confirmation",
                      message: "Are you sure?",
                      onClose: () => console.log("closed"),
                    })
                  }
                >
                  Theme
                </Button>
              ),
            })
          }
        >
          Theme
        </Button>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Settings;
