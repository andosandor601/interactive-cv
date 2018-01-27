import { Trait } from '../entity.js';

export default class Killable extends Trait {
    constructor() {
        super('killable');
        this.dead = false;
    }

    update(entity, deltaTime, level) {
        if (this.dead) {
            level.entities.delete(entity);
        }  
    }

    kill(entity, level) {
        this.dead = true;
    }
} 