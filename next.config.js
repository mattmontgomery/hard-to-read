/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          {
            test: /\.txt$/,
            loader: "emit-file-loader",
            options: {
              name: "dist/[path][name].[ext]",
            },
          },
          {
            test: /\.txt$/,
            loader: "raw-loader",
          },
        ],
      },
    };
  },
};
