import Timer from './timer.js';
import { createLevelLoader } from './loaders/level.js';
import { loadFont } from './loaders/font.js';
import { loadEntities } from './entities.js';
import { loadItems } from './loaders/item.js';
import { getCanvasSize } from './canvas.js';

export async function manageLevels(canvas) {

    const context = canvas.getContext('2d');
    const [entityFactory, font] = await Promise.all([
        loadEntities(),
        loadFont(),
    ]);
    const loadLevel = await createLevelLoader(entityFactory);
    let level = await loadLevel('1-1', font);    
    setupCanvas(context);

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
        }
        else {
            if (levelCounter < 2) {
                level = await loadLevel('2-1', font);
                const character = entityFactory.me();
                setupCanvas(context);
                itemGenarator = loadItems(level);
                levelCounter++;
            }else{
                level = await loadLevel('2-2', font);
                const character = entityFactory.me();
                setupCanvas(context);
                itemGenarator = loadItems(level);
                return;
            }
        }
    }
    timer.start();

}

function setupCanvas(context) {
    context.clearRect(0, 0, getCanvasSize().width, getCanvasSize().height);
}