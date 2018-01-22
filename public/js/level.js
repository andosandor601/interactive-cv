import Compositor from './compositor.js';
import TileCollider from './tileCollider.js';

export default class Level {
    constructor() {
        this.gravity = 1500;

        this.comp = new Compositor();
        this.entities = new Set();

        this.tileCollider = null;
    }

    setCollisionGrid(matrix){
        this.tileCollider = new TileCollider(matrix);
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);

            entity.pos.x += entity.vel.x * deltaTime;
            this.tileCollider.checkX(entity);

            entity.pos.y += entity.vel.y * deltaTime;
            this.tileCollider.checkY(entity);

            entity.vel.y += this.gravity * deltaTime;
        });
    }
}