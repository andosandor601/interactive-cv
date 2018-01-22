import Timer from './timer.js';
import { loadLevel } from './loaders/level.js';
import { createMe } from './entities.js';
import { setupKeyboard } from './input.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([ 
    loadLevel('1-1'),
    createMe(),
])
    .then(([level, me]) => {

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
    });
