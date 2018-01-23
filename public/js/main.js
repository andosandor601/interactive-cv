import Timer from './timer.js';
import { loadLevel } from './loaders/level.js';
import { setupKeyboard } from './input.js';
import {loadEntities} from './entities.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([ 
    loadLevel('1-1'),
    loadEntities(),
])
    .then(([level, entity]) => {
        console.log(entity);

        const me = entity.me();

        me.pos.set(120, 120);

        const child = entity.childMe();
        child.pos.x = 220;
        level.entities.add(child);

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
