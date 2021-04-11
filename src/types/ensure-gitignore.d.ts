declare module 'ensure-gitignore' {
  interface EnsureGitignoreOptions {
    patterns: string[];
    comment?: string;
    filepath?: string;
    dryRun?: boolean;
  }

  type EnsureGitignore = (options: EnsureGitignoreOptions) => Promise<string>;

  const ensureGitignore: EnsureGitignore;
  export = ensureGitignore;
}
