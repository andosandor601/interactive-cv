import { createSpriteLayer } from '../layers/sprite.js';

export function loadItems(level){
    return new GenerateItems(level);
}

export class GenerateItems{
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
        //static canvas width => dynamic width in json
        item.pos.set(Math.random() * (320 - item.size.x), 0);
        item.score = items[rnd].score;
        level.entities.push(item);
    
        const spriteLayer = createSpriteLayer(level.entities);
        level.comp.layers.push(spriteLayer);
    }
}