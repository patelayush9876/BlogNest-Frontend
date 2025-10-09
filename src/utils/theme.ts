export const getInitialTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const stored = localStorage.getItem("theme");
    if (stored) return stored;
  }
  return "light"; // default
};

export const saveTheme = (theme: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("theme", theme);
  }
};
