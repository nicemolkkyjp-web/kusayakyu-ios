import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.hiroyaapps.kusayakyu",
  appName: "草野球マスター",
  webDir: "www",
  server: {
    url: "https://kusayakyu.vercel.app",
    cleartext: false,
  },
  // 画面の上下（ステータスバー・ホームバー側）やスクロール端で見える下地をアプリと同じ黒にする
  backgroundColor: "#000000",
  ios: {
    contentInset: "always",
    backgroundColor: "#000000",
  },
};

export default config;
