const path = require('path');

//  11_1 выходим до корня проекта
module.exports = (...segments) => path.resolve(__dirname, '..', '..', ...segments);
