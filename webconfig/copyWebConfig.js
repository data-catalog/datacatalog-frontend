const fs = require('fs');

const webConfigPath = './build/web.config';

if (fs.existsSync(webConfigPath)) {
  fs.unlinkSync(webConfigPath);
}

fs.copySync('./webconfig/web.config', webConfigPath);
