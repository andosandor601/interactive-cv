import Timer from './timer.js';
import { loadLevel } from './loaders.js';
import { createMe } from './entities.js';
import { createCollisionLayer } from './layers.js';
import { setupKeyboard } from './input.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createMe(),
    loadLevel('1-1'),
])
    .then(([me, level]) => {

        me.pos.set(120, 120);

        level.entities.add(me);

        const input = setupKeyboard(me);

        //level.comp.layers.push(createCollisionLayer(level));

        input.listenTo(window);

        const timer = new Timer(1 / 60);

        timer.update = function update(deltaTime) {
            level.update(deltaTime);
            level.comp.draw(context);
        }

        timer.start();
    });
