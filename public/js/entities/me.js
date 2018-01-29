import Entity from '../entity.js';
import Jump from '../traits/Jump.js';
import Go from '../traits/Go.js';
import Hit from '../traits/Hit.js';
import { loadSpriteSheet } from '../loaders.js';
import Physics from '../traits/Physics.js';

export function loadMe() {
    return loadSpriteSheet("bigger_me")
        .then(createMeFactory);
}

function createMeFactory(sprite) {

    const runAnim = sprite.animations.get('run');

    function routeFrame(me) {
        if (me.go.distance > 0) {
            return runAnim(me.go.distance);
        }
        return 'idle';
    }

    function drawMe(context) {
        sprite.draw(routeFrame(this), context, this.pos.x, this.pos.y, this.go.heading < 0);
    }

    return function createMe() {
        const me = new Entity();
        me.size.set(16, 32);

        me.addTrait(new Physics());
        me.addTrait(new Jump());
        me.addTrait(new Go());
        me.addTrait(new Hit());

        me.draw = drawMe;

        return me;
    }
}