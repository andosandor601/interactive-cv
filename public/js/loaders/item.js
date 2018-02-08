import { createSpriteLayer } from '../layers/sprite.js';
import { getCanvasSize } from '../canvas.js';

export function loadItems(level){
    return new ItemGenerator(level);
}

export class ItemGenerator{
    constructor(level){
        this.time = 0;
        this.level = level;
    }

    randomGenerateNewItem(deltaTime, entityFactory) {
        this.time += deltaTime;
        if (2 < this.time) {            
            this.summonItem(this.level, entityFactory);  
            this.time = 0;
        }  
    }

    summonItem(level, entityFactory) {
        const items = Array.from(level.items);
        const nOfItems = items.length;
        const rnd = Math.floor(Math.random() * (nOfItems));
        const createItem = entityFactory[items[rnd].name];
        const item = createItem();
        item.pos.set(Math.random() * (getCanvasSize().width - item.size.x), 0);
        item.score = items[rnd].score;
        item.text = items[rnd].text;
        level.entities.push(item);
    }
}