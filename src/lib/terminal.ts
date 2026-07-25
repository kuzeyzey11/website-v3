export interface CommandResult {
  output: string;
  clear?: boolean;
  navigate?: string;
  openUrl?: string;
}

export const COMMANDS = [
  'help', 'ls', 'cat', 'about', 'projects', 'blog', 'uses', 'now',
  'socials', 'github', 'discord', 'email', 'clear', 'whoami', 'date', 'fastfetch'
];

const VIRTUAL_FILES: Record<string, string> = {
  'about.txt': 'kuzyy — student & open-source builder based in türkiye. focused on linux, local ai, and minimal tools.',
  'contact.txt': 'email: kuzeyzeyneloglu@gmail.com\ngithub: https://github.com/kuzeyzey11\nx/twitter: https://x.com/turkfidelcastro\ninstagram: https://instagram.com/turkfidelcastro\ndiscord: https://discord.com/users/813830720740130826 (kuzeyzey11)\nwhatsapp: +90 534 373 7560',
  'stack.txt': 'arch linux, hyprland, neovim, kitty, astro, tailwind, typescript, lua, bash',
  'secrets.txt': 'nice try. zero secrets found here.'
};

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
  ls         list virtual files
  cat        read a virtual file (e.g. cat contact.txt)
  about      who is kuzyy
  projects   navigate to /projects
  blog       navigate to /blog
  uses       navigate to /uses
  now        navigate to /now
  socials    list verified social links
  email      get email address
  discord    open discord profile
  fastfetch  system summary
  clear      clear terminal buffer`
      };

    case 'ls':
      return { output: Object.keys(VIRTUAL_FILES).join('   ') };

    case 'cat':
      if (!args[0]) return { output: 'usage: cat <filename>' };
      const file = args[0].toLowerCase();
      if (file in VIRTUAL_FILES) {
        return { output: VIRTUAL_FILES[file] };
      }
      return { output: `cat: ${args[0]}: No such file or directory` };

    case 'about':
      return { output: VIRTUAL_FILES['about.txt'] };

    case 'projects':
      return { output: 'redirecting to /projects...', navigate: '/projects' };

    case 'blog':
      return { output: 'redirecting to /blog...', navigate: '/blog' };

    case 'uses':
      return { output: 'redirecting to /uses...', navigate: '/uses' };

    case 'now':
      return { output: 'redirecting to /now...', navigate: '/now' };

    case 'socials':
      return {
        output: `verified contact & socials:
  email      kuzeyzeyneloglu@gmail.com
  github     https://github.com/kuzeyzey11
  x/twitter  https://x.com/turkfidelcastro
  instagram  https://instagram.com/turkfidelcastro
  discord    https://discord.com/users/813830720740130826
  whatsapp   https://wa.me/905343737560`
      };

    case 'email':
      return { output: 'kuzeyzeyneloglu@gmail.com' };

    case 'discord':
      return { output: 'opening discord profile...', openUrl: 'https://discord.com/users/813830720740130826' };

    case 'github':
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

    case 'clear':
    case 'cls':
      return { output: '', clear: true };

    default:
      return { output: `command not found: ${cmd}. type 'help' for available commands.` };
  }
}
