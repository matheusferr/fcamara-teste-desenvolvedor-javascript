module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@utils": "./src/utils",
          "@models": "./src/database/models",
        },
      },
    ],
  ],
  ignore: ["__tests__/**/*", "dist/**/*"],
};
