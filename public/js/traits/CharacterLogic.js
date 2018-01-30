import { Sides, Trait } from '../entity.js';
import { Vec2 } from '../math.js';

export default class Characterlogic extends Trait {
    constructor() {
        super('characterLogic');
        this.score = 0;
    }

    update(entity, deltaTime, level) {
        if (!level.entities.has(entity)) {
            level.entities.add(entity);
        }
    }
}