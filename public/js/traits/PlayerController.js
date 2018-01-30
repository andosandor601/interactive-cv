import { Sides, Trait } from '../entity.js';
import { Vec2 } from '../math.js';

export default class PlayerController extends Trait {
    constructor() {
        super('playerController');
        this.startPos = new Vec2(0, 0);
        this.player = null;
        this.score = 300;
    }

    setPlayer(entity) {
        this.player = entity;
    }

    update(entity, deltaTime, level) {
        if (!level.entities.has(this.player)) {
            this.player.pos.set(this.startPos.x, this.startPos.y);
            level.entities.add(this.player);
        }else{
            this.score -= deltaTime;
        }
    }
}