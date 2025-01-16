import type { NextConfig } from "next";
import withMDX from "@next/mdx";

const nextConfig: NextConfig = withMDX({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: "@mdx-js/react",
  },
})({
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  experimental: {
    appDir: true,
  },
});

export default nextConfig;
