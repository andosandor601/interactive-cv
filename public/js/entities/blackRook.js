import Entity, {Trait} from '../entity.js';
import Falling from '../traits/Falling.js';
import { loadSpriteSheet } from '../loaders.js';

export function loadBlackRook() {
    return loadSpriteSheet("items")
        .then(createItemFactory);
}

class Behaviour extends Trait {
    constructor() {
        super('behaviour');
    }

    collides(us, them) {
        //valójában itt majd eltüntetjük az entity-t és növeljük vagy csökkentjük a számlálót/progressionbart
        us.falling.speed = 0;
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

        BlackRook.draw = drawBlackRook;

        return BlackRook;
    }
}