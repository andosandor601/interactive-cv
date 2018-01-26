import Timer from './timer.js';
import { createLevelLoader } from './loaders/level.js';
import { setupKeyboard } from './input.js';
import { loadEntities } from './entities.js';


async function main(canvas) {
    const context = canvas.getContext('2d');
    const entityFactory = await loadEntities();
    const loadLevel = await createLevelLoader(entityFactory);
    const level = await loadLevel('1-1');

    const me = entityFactory.me();
    me.pos.set(120, 120);
    level.entities.add(me);

    const input = setupKeyboard(me);

    input.listenTo(window);

    const timer = new Timer(1 / 60);

    timer.update = function update(deltaTime) {
        level.update(deltaTime);
        level.comp.draw(context);
    }
    timer.start();
}

const canvas = document.getElementById('screen');
main(canvas);
