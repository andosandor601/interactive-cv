import Entity from './entity.js';
import Jump from './traits/Jump.js';
import Go from './traits/Go.js';
import Velocity from './traits/Velocity.js';
import { loadMeSprites } from './sprites.js';

export function createMe() {
    return loadMeSprites()
        .then(sprite => {
            const me = new Entity();
            me.size.set(18,32);

            me.addTrait(new Jump());
            me.addTrait(new Go());
            //me.addTrait(new Velocity());

            me.draw = function drawMe(context) {
                sprite.draw('me', context, this.pos.x, this.pos.y);
            }

            return me;
        });
}
