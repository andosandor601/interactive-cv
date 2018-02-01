import Timer from './timer.js';
import { createLevelLoader } from './loaders/level.js';
import { loadFont } from './loaders/font.js';
import { setupKeyboard } from './input.js';
import { loadEntities } from './entities.js';
import { createDashboardLayer } from './layers/dashboard.js';
import Entity from './entity.js';
import { loadItems } from './loaders/item.js';


async function main(canvas) {
    const context = canvas.getContext('2d');
    const [entityFactory, font] = await Promise.all([
        loadEntities(),
        loadFont(),
    ]);
    const loadLevel = await createLevelLoader(entityFactory);
    const level = await loadLevel('1-1');

    const me = entityFactory.me();
    level.entities.push(me);

    level.comp.layers.push(createDashboardLayer(font, me));

    const input = setupKeyboard(me);

    input.listenTo(window);

    const timer = new Timer(1 / 60);

    const itemGenarator = loadItems(level);
    

    timer.update = function update(deltaTime) {
        level.update(deltaTime);
        level.comp.draw(context);
        //TODO: if level is not completed
        itemGenarator.randomGenerateNewItem(deltaTime, entityFactory);
    }
    timer.start();
}

const canvas = document.getElementById('screen');
main(canvas);
