const webpack = require("webpack");

module.exports = function override(config, env) {
    // Fallback for Node.js modules that are not included in Webpack 5
    config.resolve.fallback = {
        ...config.resolve.fallback,
        stream: require.resolve("stream-browserify"),
        assert: require.resolve("assert/"),
        process: require.resolve("process/browser"),
    };

    // Plugin for providing Node.js globals and process/browser polyfill
    config.plugins = [
        ...(config.plugins || []),
        new webpack.ProvidePlugin({
            process: "process/browser", // Polyfill for process
            Buffer: ["buffer", "Buffer"], // Polyfill for Buffer
        }),
    ];

    return config;
};
