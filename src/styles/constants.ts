export const BLUE = {
  100: "#F1F0FA",
  200: "#C5C1EB",
  300: "#8A83D8",
  400: "#4E43C4",
  500: "#3429AB",
  600: "#282083",
  700: "#201B53",
  800: "#0C0A1F",
}

export function spacing(level = 0) {
  const base = 8
  const spacing = base * (level + 1)
  return spacing + "px"
}
