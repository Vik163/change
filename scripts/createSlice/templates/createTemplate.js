const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const createModel = require('./createModel');
const createUI = require('./createUI');
const createPublicApi = require('./createPublicApi');

// создает папку для слоя и слайса
module.exports = async (layer, sliceName) => {
    try {
        await fs.mkdir(resolveRoot('src', layer, sliceName));
    } catch (e) {
        console.log(`не удалось создать директорию для слайса${sliceName}`);
    }

    // папки model, ui
    await createModel(layer, sliceName);
    await createUI(layer, sliceName);
    // index.ts
    await createPublicApi(layer, sliceName);
};
