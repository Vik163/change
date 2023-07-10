const createTemplate = require('./templates/createTemplate');

// 11_1 получаем слой и слайсы
const layer = process.argv[2]; // 'features' или 'entities' или 'pages'
const sliceName = process.argv[3]; // 'Profile'

const layers = ['features', 'entities', 'pages'];

if (!layer || !layers.includes(layer)) {
    throw new Error(`Укажите слой ${layers.join(' или ')}`);
}

if (!sliceName) {
    throw new Error('Укажите название слайса');
}

createTemplate(layer, sliceName);
