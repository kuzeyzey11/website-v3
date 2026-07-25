export interface CommandResult {
  output: string;
  clear?: boolean;
  navigate?: string;
  openUrl?: string;
}

export const COMMANDS = [
  'help', 'about', 'projects', 'blog', 'uses', 'now',
  'socials', 'github', 'clear', 'whoami', 'date'
];

export function executeCommand(rawInput: string): CommandResult {
  const trimmed = rawInput.trim().toLowerCase();
  if (!trimmed) return { output: '' };

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0];
  const args = parts.slice(1);

  switch (cmd) {
    case 'help':
      return {
        output: `commands:
  about      who is kuzyy
  projects   view builds
  blog       read writing
  uses       hardware & software setup
  now        current focus
  socials    github & contact
  clear      clear screen`
      };

    case 'about':
      return { output: 'student from türkiye. exploring linux, AI, and minimal web apps.' };

    case 'projects':
      return { output: 'redirecting to projects...', navigate: '/projects' };

    case 'blog':
      return { output: 'redirecting to blog...', navigate: '/blog' };

    case 'uses':
      return { output: 'redirecting to uses...', navigate: '/uses' };

    case 'now':
      return { output: 'redirecting to now...', navigate: '/now' };

    case 'socials':
    case 'github':
      return { output: 'opening github...', openUrl: 'https://github.com/kuzeyzey11' };

    case 'whoami':
      return { output: 'kuzyy' };

    case 'date':
      return { output: new Date().toISOString().slice(0, 10) };

    case 'clear':
    case 'cls':
      return { output: '', clear: true };

    default:
      return { output: `command not found: ${cmd}` };
  }
}
