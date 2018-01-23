import { Trait } from '../entity.js';

export default class Falling extends Trait {
    constructor() {
        super('falling');

        this.speed = 30;
        this.landing = 0;
    }

    obstruct(entity, side) {
        //setInterval(alert('helo'), 10000);
        //setTimeout(console.log('törlés'), 3000);
        //majd itt kéne figyelni az élettartamát, hogy eltűnjön egy idő után
    }

    update(entity, deltaTime) {
        //console.log(me.vel.y);
        entity.vel.y = this.speed;
    }
} 