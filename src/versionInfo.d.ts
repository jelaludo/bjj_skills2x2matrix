declare module '*/versionInfo.json' {
  const value: {
    commitHash: string;
    commitMessage: string;
    commitDate: string;
    branch: string;
    buildTime: string;
    version: string;
  };
  export default value;
} 