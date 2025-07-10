// fix-paths.js
const replace = require('replace-in-file');

(async () => {
    try {
        const results1 = await replace({
            files: 'dist/**/*.html',
            from: /src="\//g,
            to: 'src="./',
        });

        const results2 = await replace({
            files: 'dist/**/*.html',
            from: /href="\//g,
            to: 'href="./',
        });

        console.log("✅ HTMLのscript/linkパスを './' に修正しました");
    } catch (error) {
        console.error('❌ パス修正中にエラー:', error);
    }
})();
