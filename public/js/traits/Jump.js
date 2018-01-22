import { Sides, Trait } from '../entity.js';

export default class Jump extends Trait {
    constructor() {
        super('jump');

        this.ready = false;
        this.duration = 0.3;
        this.velocity = 200;
        this.engageTime = 0;
        this.requestTime = 0;
        this.gracePeriod = 0.3;
    }

    start() {
        this.requestTime = this.gracePeriod;
    }

    canceled() {
        this.engageTime = 0;
        this.requestTime = 0;
    }

    obstruct(entity, side) {
        if (side === Sides.BOTTOM) {
            this.ready = true;
        } else if (side === Sides.TOP) {
            this.canceled();
        }
    }

    update(entity, deltaTime) {
        if (this.requestTime > 0) {
            if (this.ready > 0) {
                this.engageTime = this.duration;
                this.requestTime = 0;
            }

            this.requestTime -= deltaTime;
        }

        if (this.engageTime > 0) {
            entity.vel.y = -this.velocity;
            this.engageTime -= deltaTime;
        }

        this.ready = false;
    }
} 