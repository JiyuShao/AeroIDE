export function ansiColor(text: string, color: string): string {
  const colors: { [key: string]: string } = {
    black: '30',
    red: '31',
    green: '32',
    yellow: '33',
    blue: '34',
    magenta: '35',
    cyan: '36',
    white: '37',
    reset: '0',
  };

  const colorCode = colors[color] || colors['reset'];
  return `\x1b[${colorCode}m${text}\x1b[0m`;
}
