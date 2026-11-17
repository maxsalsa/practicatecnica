import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";
export function ThemeToggle() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    const value = localStorage.getItem("pt-theme") === "light";
    setLight(value);
    document.documentElement.classList.toggle("light", value);
  }, []);
  return (
    <Button
      variant="outline"
      size="icon"
      title={light ? "Modo oscuro" : "Modo claro"}
      aria-label={light ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
      onClick={() => {
        const value = !light;
        setLight(value);
        localStorage.setItem("pt-theme", value ? "light" : "dark");
        document.documentElement.classList.toggle("light", value);
      }}
    >
      {light ? <Moon /> : <Sun />}
    </Button>
  );
}
