import Compositor from './compositor.js';
import { loadLevel } from './loaders.js';
import { loadBackgroundSprites, loadMeSprites } from './sprites.js'
import { createBackgroundLayer } from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

function createSpriteLayer(sprite, pos) {
    return function drawSpriteLayer(context) {
        for (let i = 0; i < 20; i++) {
            sprite.draw('me', context, pos.x + i * 20, pos.y);
        }
    };
}

Promise.all([
    loadMeSprites(),
    loadBackgroundSprites(),
    loadLevel('1-1'),
])
    .then(([meSprite, backgroundSprites, level]) => {
        const comp = new Compositor();

        const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
        comp.layers.push(backgroundLayer);

        const pos = {
            x: 0,
            y: 0,
        };

        const spriteLayer = createSpriteLayer(meSprite, pos);
        comp.layers.push(spriteLayer);

        function update() {
            comp.draw(context);
            pos.x += 2;
            pos.y += 2;
            requestAnimationFrame(update);
        }

        update();
    });
