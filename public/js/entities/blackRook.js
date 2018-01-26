import Entity from '../entity.js';
import Falling from '../traits/Falling.js';
import { loadSpriteSheet } from '../loaders.js';

export function loadBlackRook() {
    return loadSpriteSheet("items")
        .then(createItemFactory);
}

function createItemFactory(sprite) {

    function drawBlackRook(context) {
        sprite.draw('blackRook', context, this.pos.x, this.pos.y);
    }

    return function createBlackRook() {
        const BlackRook = new Entity();
        BlackRook.size.set(16, 16);

        BlackRook.addTrait(new Falling());

        BlackRook.draw = drawBlackRook;

        return BlackRook;
    }
}