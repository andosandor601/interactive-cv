import { Vec2 } from './math.js';
import BoundingBox from './boundingBox.js'

export const Sides = {
    TOP: Symbol('top'),
    BOTTOM: Symbol('bottom'),
};

export class Trait {
    constructor(name) {
        this.NAME = name;
    }

    collides(us, them){
        
    }

    obstruct() {

    }

    update() {
        
    }
}

export default class Entity {
    constructor() {
        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);
        this.size = new Vec2(0, 0);
        this.offset = new Vec2(0, 0);
        this.bounds = new BoundingBox(this.pos, this.size, this.offset);

        this.traits = [];
    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    collides(candidate, level) {
        this.traits.forEach(trait => {
            trait.collides(this, candidate, level);
        });
    }

    obstruct(side) {
        this.traits.forEach(trait => {
            trait.obstruct(this, side);
        });
    }

    draw(){
        
    }

    update(deltaTime, level) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime, level);
        });
    }
}