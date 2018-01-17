import SpriteSheet from './SpriteSheet.js';
import { loadImage} from './loaders.js';

export function loadMeSprites() {
    return loadImage('/img/characters.png')
        .then(image => {
            const sprites = new SpriteSheet(image, 20, 20);
            sprites.define('me', 0, 0, 20, 35);
            return sprites;
        });
}

export function loadBackgroundSprites() {
    return loadImage('/img/tiles.png')
        .then(image => {
            const sprites = new SpriteSheet(image, 16, 16);
            sprites.defineTile('ground', 0, 0);
            sprites.defineTile('sky', 3, 23);
            return sprites;
        });
}