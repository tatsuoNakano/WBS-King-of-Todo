const replace = require('replace-in-file');
const path = require('path');

const distPath = path.join(__dirname, '../gatsby/public');

(async () => {
    try {
        const results = await replace({
            files: [
                `${distPath}/**/*.html`,
                `${distPath}/**/*.js`,
                `${distPath}/**/*.json`
            ],
            from: /"(\/(page-data|app|component-|webpack-runtime|framework|static|assets)\/[^"]+)"/g,
            to: '"./$2/$3"',
        });

        console.log('✅ パス修正完了:', results.length, 'ファイルに適用');
    } catch (error) {
        console.error('❌ パス修正エラー:', error);
        process.exit(1);
    }
})();
