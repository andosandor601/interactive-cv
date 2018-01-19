import SpriteSheet from './SpriteSheet.js';
import { loadImage} from './loaders.js';

export function loadMeSprites() {
    return loadImage('/img/characters.png')
        .then(image => {
            const sprites = new SpriteSheet(image, 18, 20);
            sprites.define('me', 2, 0, 18, 35);
            return sprites;
        });
}