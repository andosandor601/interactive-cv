import Compositor from './compositor.js';
import Entity from './entity.js';
import Timer from './timer.js';
import Keyboard from './keyboardState.js';
import { loadLevel } from './loaders.js';
import { createMe } from './entities.js';
import { loadBackgroundSprites } from './sprites.js';
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

        const gravity = 1500;
        me.pos.set(120, 400);

        const UP = 38;
        const DOWN = 40;
        const input = new Keyboard();
        input.addMapping(UP, keyState => {
            if (keyState) {
                me.jump.start();
            }else{
                me.jump.canceled();
            }
        });
        input.listenTo(window);

        const spriteLayer = createSpriteLayer(me);
        comp.layers.push(spriteLayer);

        const timer = new Timer(1 / 60);

        timer.update = function update(deltaTime) {
            me.update(deltaTime);
            comp.draw(context);
            me.vel.y += gravity * deltaTime;
        }

        timer.start();
    });
