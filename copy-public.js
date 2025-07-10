const fs = require('fs-extra');
const path = require('path');

const srcDir = path.join(__dirname, 'gatsby', 'public');
const destDir = path.join(__dirname, 'dist');

fs.copy(srcDir, destDir, { overwrite: true })
    .then(() => console.log('✅ Gatsby build copied to dist'))
    .catch(err => {
        console.error('❌ Failed to copy Gatsby build:', err);
        process.exit(1);
    });
