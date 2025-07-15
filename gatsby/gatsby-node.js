exports.onCreateWebpackConfig = ({ stage, actions }) => {
    if (stage === "develop" || stage === "build-javascript") {
        actions.setWebpackConfig({
            resolve: {
                fallback: {
                    fs: false,
                    path: false,
                    electron: false,
                },
            },
        });
    }
};
