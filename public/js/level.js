import Compositor from './compositor.js';
import TileCollider from './tileCollider.js';
import EntityCollider from './entityCollider.js';
import { createWelcomeMessage } from './layers/dashboard.js';

export default class Level {
    constructor() {
        this.gravity = 1500;

        this.comp = new Compositor();
        this.entities = new Array();
        this.messages = new Array();

        this.items = new Set();

        this.tileCollider = null;
        this.EntityCollider = new EntityCollider(this.entities);

        this.start = true;
        this.time = 0;
        this.message = {};

        this.isCompleted = false;
        this.actScore = 0;
        this.score = 0;
        this.levelName = "";
    }

    setCollisionGrid(matrix) {
        this.tileCollider = new TileCollider(matrix);
    }

    startMethod(deltaTime) {
        this.time += deltaTime;
        if (this.time > 10) {
            const index = this.comp.layers.indexOf(this.message);
            this.comp.layers.splice(index, 1);
            this.start = false;
        }
    }

    update(deltaTime) {
        if (this.start) {
            this.startMethod(deltaTime);
        } else {
            this.entities.forEach(entity => {
                entity.update(deltaTime, this);
                this.EntityCollider.check(entity, this);
            });
            if (this.actScore >= this.score) {
                this.isCompleted = true;
            }
        }
    }

    showWelcomeMessage(font, context) {
        this.message = createWelcomeMessage(font, context, this.messages);
        if (!this.comp.layers.includes(this.message)) {
            this.comp.layers.push(this.message);
        }
    }
}