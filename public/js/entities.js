import Entity from './entity.js';
import { loadMeSprites } from './sprites.js'

export function createMe() {
    return loadMeSprites()
        .then(sprite => {
            const me = new Entity();

            me.draw = function drawMe(context) {
                sprite.draw('me', context, this.pos.x, this.pos.y);
            }

            me.update = function updateMe(deltaTime) {
                this.pos.x += this.vel.x * deltaTime;
                this.pos.y += this.vel.y * deltaTime;
            }

            return me;
        });
}
