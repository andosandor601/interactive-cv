import { Trait } from '../entity.js';

export default class Behaviour extends Trait {
    constructor() {
        super('behaviour');
    }

    obstruct(us, side) {
        us.falling.landed = true;
    }

    collides(us, them, level) {
        if (them.hit && us.killable && them.characterLogic) {
            us.killable.kill(us, level);
            them.characterLogic.score += us.score;
            them.characterLogic.text = us.text;          
        }
    }
}