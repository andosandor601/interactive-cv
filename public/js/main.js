import Compositor from './compositor.js';
import Entity from './entity.js';
import Timer from './timer.js';
import { loadLevel } from './loaders.js';
import { createMe } from './entities.js'
import { loadBackgroundSprites } from './sprites.js'
import { createBackgroundLayer, createSpriteLayer } from './layers.js';


const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createMe(),
    loadBackgroundSprites(),
    loadLevel('1-1'),
])
    .then(([me, backgroundSprites, level]) => {
        const comp = new Compositor();

        const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
        comp.layers.push(backgroundLayer);

        const gravity = 30;
        me.pos.set(120, 400);
        me.vel.set(300, -600);

        const spriteLayer = createSpriteLayer(me);
        comp.layers.push(spriteLayer);

        const timer = new Timer(1 / 60);

        timer.update = function update(deltaTime) {
            comp.draw(context);
            me.update(deltaTime);
            me.vel.y += gravity;
        }

        timer.start();
    });
