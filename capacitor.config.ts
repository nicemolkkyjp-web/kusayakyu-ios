import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.hiroyaapps.kusayakyu",
  appName: "草野球マスター",
  webDir: "www",
  server: {
    url: "https://kusayakyu.vercel.app",
    cleartext: false,
  },
  ios: {
    contentInset: "always",
  },
};

export default config;
