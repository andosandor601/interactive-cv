import { Trait } from '../entity.js';

export default class Hit extends Trait {
    constructor() {
        super('hit');
    }

    collides(us, them, level) {
        if (us.hit && us.characterLogic) {
            us.characterLogic.score += them.score;
            us.characterLogic.text = them.text;
        }
    }
} 