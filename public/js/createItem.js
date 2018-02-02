import Entity, { Trait } from './entity.js';
import Falling from './traits/Falling.js';
import Killable from './traits/Killable.js';
import Physics from './traits/Physics.js';
import Behaviour from './traits/Behaviour.js';

export function createItem(draw) {
    return function create() {
        const item = new Entity();
        item.size.set(16, 16);

        item.addTrait(new Physics());
        item.addTrait(new Falling());
        item.addTrait(new Behaviour());
        item.addTrait(new Killable());

        item.draw = draw;
        return item;
    }
}