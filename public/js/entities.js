import Entity from './entity.js';
import Jump from './traits/Jump.js';
import Go from './traits/Go.js';
import { loadSpriteSheet } from './loaders.js';

export function createMe() {
    return loadSpriteSheet("characters")
        .then(sprite => {
            console.log(sprite);
            const me = new Entity();
            me.size.set(16,32);

            me.addTrait(new Jump());
            me.addTrait(new Go());

            me.draw = function drawMe(context) {
                sprite.draw('me', context, this.pos.x, this.pos.y);
            }

            return me;
        });
}
