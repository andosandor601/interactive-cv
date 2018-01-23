import Entity from '../entity.js';
import Falling from '../traits/Falling.js';
import { loadSpriteSheet } from '../loaders.js';

export function loadChildMe() {
    return loadSpriteSheet("child_me")
        .then(createMeFactory);
}

function createMeFactory(sprite) {

    function drawMe(context) {
        sprite.draw('run-1', context, this.pos.x, this.pos.y);
    }

    return function createMe() {
        const me = new Entity();
        me.size.set(16, 22);

        me.addTrait(new Falling());

        me.draw = drawMe;

        return me;
    }
}