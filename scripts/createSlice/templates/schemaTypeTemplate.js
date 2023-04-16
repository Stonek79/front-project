// eslint-disable-next-line @typescript-eslint/no-var-requires
const firstCharUpperCase = require('../firstCharUpperCase');

module.exports = (sliceName) => `export interface ${firstCharUpperCase(sliceName)}Schema {
    
}`;
