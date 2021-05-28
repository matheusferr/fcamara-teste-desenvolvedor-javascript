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
          "@dals": "./src/database/dals/implementation",
          "@validators": "./src/validation/validators",
          "@errors": "./src/validation/errors",
        },
      },
    ],
  ],
  ignore: ["__tests__/**/*", "dist/**/*"],
};
