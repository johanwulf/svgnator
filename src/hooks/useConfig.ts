import { useState } from "react";

export type Config = {
  format: boolean;
  removeIds: boolean;
  removeClasses: boolean;
  removeSizing: boolean;
  preview: boolean;
  react: boolean;
};

const useConfig = () => {
  const [config, setConfig] = useState<Config>({
    format: true,
    removeIds: true,
    removeClasses: true,
    removeSizing: true,
    preview: true,
    react: true,
  });

  const setConfigValue = (key: keyof Config, value: boolean) => {
    setConfig((prevConfig) => ({ ...prevConfig, [key]: value }));
  };

  return {
    config,
    setConfigValue,
  };
};

export default useConfig;
