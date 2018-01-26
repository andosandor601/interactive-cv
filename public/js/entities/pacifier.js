import Entity from '../entity.js';
import Falling from '../traits/Falling.js';
import { loadSpriteSheet } from '../loaders.js';

export function loadPacifier() {
    return loadSpriteSheet("items")
        .then(createItemFactory);
}

function createItemFactory(sprite) {

    function drawPacifier(context) {
        sprite.draw('pacifier', context, this.pos.x, this.pos.y);
    }

    return function createPacifier() {
        const pacifier = new Entity();
        pacifier.size.set(16, 16);

        pacifier.addTrait(new Falling());

        pacifier.draw = drawPacifier;

        return pacifier;
    }
}