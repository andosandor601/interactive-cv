import Level from '../level.js';
import { Matrix } from '../math.js';
import { createSpriteLayer } from '../layers/sprite.js';
import { createBackgroundLayer } from '../layers/background.js'
import { loadJSON, loadSpriteSheet } from '../loaders.js';
import { createDashboardLayer } from '../layers/dashboard.js';
import { setupKeyboard } from '../input.js';

function setupCollision(levelSpec, level) {
    const mergedTiles = levelSpec.layers.reduce((mergedTiles, layerSpec) => {
        return mergedTiles.concat(layerSpec.tiles);
    }, []);
    const colliosionGrid = createCollisionGrid(mergedTiles, levelSpec.patterns);
    level.setCollisionGrid(colliosionGrid);
}

function setupBackground(levelSpec, level, backgroundSprites) {
    levelSpec.layers.forEach(layer => {
        const backgroundGrid = createBackgroundGrid(layer.tiles, levelSpec.patterns);
        const backgroundLayer = createBackgroundLayer(level, backgroundGrid, backgroundSprites);
        level.comp.layers.push(backgroundLayer);
    });
}

function setupItems(levelSpec, level, entityFactory) {
    levelSpec.items.forEach(({ name, score, text }) => {
        const createItem = entityFactory['item'];
        const item = createItem();
        item.text = text;
        item.name = name;
        item.score = score;
        level.items.add(item);
    });

    const spriteLayer = createSpriteLayer(level.entities);
    level.comp.layers.push(spriteLayer);
}

function setupCharacter(levelSpec, level, entityFactory, font) {
    const createCharacter = entityFactory[levelSpec.character];
    const character = createCharacter();

    level.entities.push(character);
    level.comp.layers.push(createDashboardLayer(font, character, level));

    const input = setupKeyboard(character);
    input.listenTo(window);
}

function setupMessages(levelSpec, level) {
    levelSpec.messages.forEach((message) => {
        level.messages.push(message);
    })
}

export function createLevelLoader(entityFactory) {
    return function loadLevel(name, font) {
        return loadJSON(`levels/${name}.json`)
            .then(levelSpec => Promise.all([
                levelSpec,
                loadSpriteSheet(levelSpec.spriteSheet),
            ]))
            .then(([levelSpec, backgroundSprites]) => {
                const level = new Level();

                level.levelName = levelSpec.level;
                level.score = levelSpec.score;
                
                setupCollision(levelSpec, level);
                setupBackground(levelSpec, level, backgroundSprites);
                setupCharacter(levelSpec, level, entityFactory, font);
                setupItems(levelSpec, level, entityFactory);
                setupMessages(levelSpec, level);

                return level;
            });
    }
}

function createCollisionGrid(tiles, patterns) {
    const grid = new Matrix();
    for (const { tile, x, y } of expandTiles(tiles, patterns)) {
        grid.set(x, y, { type: tile.type });
    }
    return grid;
}

function createBackgroundGrid(tiles, patterns) {
    const grid = new Matrix();
    for (const { tile, x, y } of expandTiles(tiles, patterns)) {
        grid.set(x, y, { name: tile.name });
    }

    return grid;
}

function* expandSpan(xStart, xLen, yStart, yLen) {
    const xEnd = xStart + xLen;
    const yEnd = yStart + yLen;
    for (let x = xStart; x < xEnd; x++) {
        for (let y = yStart; y < yEnd; y++) {
            yield { x, y };
        }
    }
}

function expandRange(range) {
    if (range.length === 4) {
        const [xStart, xLen, yStart, yLen] = range;
        return expandSpan(xStart, xLen, yStart, yLen);
    } else if (range.length === 3) {
        const [xStart, xLen, yStart] = range;
        return expandSpan(xStart, xLen, yStart, 1);
    } else if (range.length === 2) {
        const [xStart, yStart] = range;
        return expandSpan(xStart, 1, yStart, 1);
    }
}

function* expandRanges(ranges) {
    for (const range of ranges) {
        yield* expandRange(range);
    }
}

function* expandTiles(tiles, patterns) {
    function* walkTiles(tiles, offsetX, offsetY) {
        for (const tile of tiles) {
            for (const { x, y } of expandRanges(tile.ranges)) {
                const derivedX = x + offsetX;
                const derivedY = y + offsetY;
                if (tile.pattern) {
                    const tiles = patterns[tile.pattern].tiles;
                    yield* walkTiles(tiles, derivedX, derivedY);
                } else {
                    yield {
                        tile,
                        x: derivedX,
                        y: derivedY,
                    };
                }
            }
        }
    }

    yield* walkTiles(tiles, 0, 0);
}