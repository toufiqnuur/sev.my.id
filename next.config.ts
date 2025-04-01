import { execSync } from "child_process";
import type { NextConfig } from "next";
import packageJson from "./package.json";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_GIT_COMMIT: execSync("git rev-parse --short HEAD")
      .toString()
      .trim(),
    NEXT_PUBLIC_VERSION: packageJson.version,
  },
};

export default nextConfig;
