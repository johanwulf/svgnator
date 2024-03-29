import { useState } from "react";

export type Settings = {
  format: boolean;
  removeIds: boolean;
  removeClasses: boolean;
  removeSizing: boolean;
  preview: boolean;
  react: boolean;
};

const useSettings = () => {
  const [settings, setSettings] = useState<Settings>({
    format: true,
    removeIds: true,
    removeClasses: true,
    removeSizing: true,
    preview: true,
    react: true,
  });

  const setSettingsValue = (key: keyof Settings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return {
    settings,
    setSettingsValue,
  };
};

export default useSettings;
