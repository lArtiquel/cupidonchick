import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";

const useTelegram = () => {
  const [tg, setTg] = useState(WebApp);

  useEffect(() => {
    tg.ready();
  }, [tg]);

  const onClose = () => {
    tg.close();
  };

  const onToggleMainButton = () => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  };

  return {
    tg,
    onClose,
    onToggleMainButton,
  };
};

export default useTelegram;
