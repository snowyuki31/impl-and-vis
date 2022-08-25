/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    config.resolve.extensions = [".ts", ".tsx", ".js", ".wasm"];
    config.output.webassemblyModuleFilename =
      (isServer ? "../" : "") + "static/wasm/webassembly.wasm";
    return config;
  },
};

module.exports = nextConfig;
