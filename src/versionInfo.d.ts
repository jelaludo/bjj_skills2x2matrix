declare module "*/versionInfo.json" {
  const value: {
    version: string;
    gitHash: string;
    commitMessage: string;
    branch: string;
    buildDate: string;
    buildTime: string;
    fullBuildInfo: string;
  };
  export default value;
} 