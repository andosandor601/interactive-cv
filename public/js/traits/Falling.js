import { Trait } from '../entity.js';

export default class Falling extends Trait {
    constructor() {
        super('falling');

        this.speed = 30;
        this.landed = false;
        this.landingTime = 0;
        this.removeAfter = 3;
        this.dead = false;
    }

    obstruct(entity, side) {
    }

    update(entity, deltaTime, level) {
        if (this.landed) {
            this.landingTime += deltaTime;
            if (this.landingTime > this.removeAfter && entity.killable) {
                entity.killable.kill(entity, level);
            }
        }
        else if (this.dead && entity.killable) {
            entity.killable.kill(entity, level);
        }
        else {
            entity.vel.y = this.speed;
        }   
    }
} 