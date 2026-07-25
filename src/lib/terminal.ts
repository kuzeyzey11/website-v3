export interface CommandResult {
  output: string;
  clear?: boolean;
  navigate?: string;
  openUrl?: string;
}

export const COMMANDS = [
  'help', 'about', 'projects', 'blog', 'uses', 'now',
  'socials', 'github', 'clear', 'whoami', 'date', 'fastfetch', 'cat'
];

export function executeCommand(rawInput: string): CommandResult {
  const trimmed = rawInput.trim();
  if (!trimmed) return { output: '' };

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (cmd) {
    case 'help':
      return {
        output: `available commands:
  about      who is kuzyy
  projects   navigate to /projects
  blog       navigate to /blog
  uses       navigate to /uses
  now        navigate to /now
  fastfetch  system summary
  cat        read virtual files (try: cat about.txt)
  socials    open github profile
  clear      clear terminal buffer`
      };

    case 'about':
      return { output: 'student & builder based in türkiye. exploring linux, local ai, and minimal web apps.' };

    case 'projects':
      return { output: 'redirecting to /projects...', navigate: '/projects' };

    case 'blog':
      return { output: 'redirecting to /blog...', navigate: '/blog' };

    case 'uses':
      return { output: 'redirecting to /uses...', navigate: '/uses' };

    case 'now':
      return { output: 'redirecting to /now...', navigate: '/now' };

    case 'github':
    case 'socials':
      return { output: 'opening github profile...', openUrl: 'https://github.com/kuzeyzey11' };

    case 'whoami':
      return { output: 'visitor@kuzyy.com' };

    case 'date':
      return { output: new Date().toUTCString() };

    case 'fastfetch':
    case 'neofetch':
      return {
        output: `kuzyy@web
---------
os: arch linux
wm: hyprland
shell: fish
editor: neovim
terminal: kitty
stack: astro + tailwind`
      };

    case 'cat':
      if (!args[0]) return { output: 'usage: cat <filename>' };
      const file = args[0].toLowerCase();
      if (file === 'about.txt') return { output: 'kuzyy — student, open-source enthusiast, builder.' };
      if (file === 'secrets.txt') return { output: 'nice try.' };
      return { output: `cat: ${args[0]}: No such file or directory` };

    case 'clear':
    case 'cls':
      return { output: '', clear: true };

    default:
      return { output: `command not found: ${cmd}. type 'help' for available commands.` };
  }
}
