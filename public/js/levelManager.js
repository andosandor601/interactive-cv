import Timer from './timer.js';
import { createLevelLoader } from './loaders/level.js';
import { loadFont } from './loaders/font.js';
import { setupKeyboard } from './input.js';
import { loadEntities } from './entities.js';
import { createDashboardLayer } from './layers/dashboard.js';
import Entity from './entity.js';
import { loadItems } from './loaders/item.js';
import { getCanvasSize } from './canvas.js';

export async function manageLevels(canvas) {

    const context = canvas.getContext('2d');
    const [entityFactory, font] = await Promise.all([
        loadEntities(),
        loadFont(),
    ]);
    const loadLevel = await createLevelLoader(entityFactory);
    let level = await loadLevel('1-1');
    const character = entityFactory.infantMe();
    setupLevel(level, character, font, context);

    const timer = new Timer(1 / 60);

    let itemGenarator = loadItems(level);

    let levelCounter = 1;

    timer.update = async function update(deltaTime) {
        if (!level.isCompleted) {
            level.update(deltaTime);
            if (level.start) {
                level.showWelcomeMessage(font, context);
            } else {
                level.comp.draw(context);
                itemGenarator.randomGenerateNewItem(deltaTime, entityFactory);
            }
            return false;
        }
        else {
            if (levelCounter !== 2) {
                levelCounter++;
                level = null;
                level = await loadLevel('2-1');
                const character = entityFactory.me();
                setupLevel(level, character, font, context);
                itemGenarator = loadItems(level);
                return;
            }else{
                level = null;
                level = await loadLevel('2-2');
                const character = entityFactory.me();
                setupLevel(level, character, font, context);
                itemGenarator = loadItems(level);
                return;
            }
        }
    }
    timer.start();

}

async function setupLevel(level, character, font, context) {
    context.clearRect(0, 0, getCanvasSize().width, getCanvasSize().height);

    level.entities.push(character);
    level.comp.layers.push(createDashboardLayer(font, character, level));

    let input = setupKeyboard(character);
    input.listenTo(window);

}