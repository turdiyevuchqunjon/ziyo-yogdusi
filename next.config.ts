import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // sizning boshqa configlaringiz bo‘lsa shu yerda qoladi
};

export default withBundleAnalyzer(nextConfig);
