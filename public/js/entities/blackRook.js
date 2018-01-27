import Entity, { Trait } from '../entity.js';
import Falling from '../traits/Falling.js';
import Killable from '../traits/Killable.js';
import { loadSpriteSheet } from '../loaders.js';

export function loadBlackRook() {
    return loadSpriteSheet("items")
        .then(createItemFactory);
}

class Behaviour extends Trait {
    constructor() {
        super('behaviour');
    }

    obstruct(us, side){
        us.falling.landed = true;
    }

    collides(us, them) {
        // növeljük vagy csökkentjük a számlálót/progressionbart
        if (them.hit && us.killable) {
            us.killable.kill(us);
        }
    }
}

function createItemFactory(sprite) {

    function drawBlackRook(context) {
        sprite.draw('blackRook', context, this.pos.x, this.pos.y);
    }

    return function createBlackRook() {
        const BlackRook = new Entity();
        BlackRook.size.set(16, 16);

        BlackRook.addTrait(new Falling());
        BlackRook.addTrait(new Behaviour());
        BlackRook.addTrait(new Killable());

        BlackRook.draw = drawBlackRook;

        return BlackRook;
    }
}