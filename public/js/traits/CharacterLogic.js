import { Sides, Trait } from '../entity.js';
import { Vec2 } from '../math.js';

export default class Characterlogic extends Trait {
    constructor() {
        super('characterLogic');
        this.score = 0;
        this.text = "";
    }

    update(entity, deltaTime, level) {
        if (!level.entities.includes(entity)) {
            level.entities.push(entity);
        }
    }
}