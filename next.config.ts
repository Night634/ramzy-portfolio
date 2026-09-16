import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Mengubah limit unggah gambar menjadi 10 Megabyte
    },
  },
};

export default nextConfig;