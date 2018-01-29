import { Trait } from '../entity.js';

export default class Behaviour extends Trait {
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