import { useState, useEffect } from "react";

export type Settings = {
  format: boolean;
  removeIds: boolean;
  removeClasses: boolean;
  removeSizing: boolean;
  concatTags: boolean;
  preview: boolean;
  react: boolean;
  saveSettings: boolean;
};

const DEFAULT_SETTINGS = {
  format: true,
  removeIds: true,
  removeClasses: true,
  removeSizing: true,
  preview: true,
  react: true,
  concatTags: true,
  saveSettings: false,
};

const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(() => {
    const savedSettings = localStorage.getItem("settings");
    return savedSettings ? JSON.parse(savedSettings) : DEFAULT_SETTINGS;
  });

  const setSettingsValue = (key: keyof Settings, value: boolean) => {
    setSettings((prev) => {
      const updatedSettings = { ...prev, [key]: value };
      if (prev.saveSettings) {
        localStorage.setItem("settings", JSON.stringify(updatedSettings));
      }
      return updatedSettings;
    });
  };

  useEffect(() => {
    if (settings.saveSettings) {
      localStorage.setItem("settings", JSON.stringify(settings));
    } else {
      localStorage.removeItem("settings");
    }
  }, [settings]);

  return {
    settings,
    setSettingsValue,
  };
};

export default useSettings;
