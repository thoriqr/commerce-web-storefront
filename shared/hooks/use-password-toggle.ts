import { useState } from "react";

export function usePasswordToggle() {
  const [visible, setVisible] = useState(false);

  function toggle() {
    setVisible((prev) => !prev);
  }

  return {
    visible,
    toggle,
    inputType: visible ? "text" : "password"
  };
}
