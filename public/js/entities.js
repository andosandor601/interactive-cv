import Entity from './entity.js';
import Jump from './traits/Jump.js';
import Velocity from './traits/Velocity.js';
import { loadMeSprites } from './sprites.js';

export function createMe() {
    return loadMeSprites()
        .then(sprite => {
            const me = new Entity();

            me.addTrait(new Velocity());
            me.addTrait(new Jump());

            me.draw = function drawMe(context) {
                sprite.draw('me', context, this.pos.x, this.pos.y);
            }

            return me;
        });
}
