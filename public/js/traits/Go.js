import { Trait } from '../entity.js';

export default class Go extends Trait {
    constructor() {
        super('go');

        this.dir = 0;
        this.acc = 600;
        this.dec = 300;
        this.dragFactor = 1/3000;

        this.distance = 0;
        this.heading = 1;
    }

    update(entity, deltaTime) {
        const absX = Math.abs(entity.vel.x)
        if (this.dir !== 0) {
            entity.vel.x += this.acc * deltaTime * this.dir;
            this.heading = this.dir;
        }else if (entity.vel.x !== 0) {
            const deceleration = Math.min(absX, this.dec * deltaTime);
            entity.vel.x += entity.vel.x > 0 ? -deceleration : deceleration;
        } else {
            this.distance = 0;
        }

        const drag = this.dragFactor * entity.vel.x * absX;
        entity.vel.x -= drag;

        
        this.distance += absX * deltaTime;
    }
} 