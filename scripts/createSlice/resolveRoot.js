// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = (...segments) => path.resolve(__dirname, '..', '..', ...segments);
