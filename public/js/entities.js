import Entity from './entity.js';
import Jump from './traits/Jump.js';
import Go from './traits/Go.js';
import { loadSpriteSheet } from './loaders.js';
import {createAnim} from './anim.js';

export function createMe() {
    return loadSpriteSheet("characters")
        .then(sprite => {
            const me = new Entity();
            me.size.set(16, 32);

            me.addTrait(new Jump());
            me.addTrait(new Go());

            const runAnim = createAnim(['run-1', 'run-2', 'run-3'], 10);

            function routeFrame(me) {
                if (me.go.dir !== 0) {
                    return runAnim(me.go.distance);
                }
                return 'idle';
            }

            me.draw = function drawMe(context) {
                sprite.draw(routeFrame(this), context, this.pos.x, this.pos.y, this.go.heading < 0);
            }

            return me;
        });
}
