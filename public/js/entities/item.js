import { loadSpriteSheet } from '../loaders.js';
import { createItem } from '../createItem.js';

export function loadItem() {
    return loadSpriteSheet("items")
        .then(function createItemFactory(sprite) {

            function drawItem(context) {
                sprite.draw(this.name, context, this.pos.x, this.pos.y);
            }

            return createItem(drawItem);
        });
}