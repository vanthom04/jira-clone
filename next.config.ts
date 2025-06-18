import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "fra.cloud.appwrite.io" }
    ]
  }
}

export default nextConfig
