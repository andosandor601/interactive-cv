import { manageLevels } from './levelManager.js';

async function main(canvas) {
    manageLevels(canvas)
}

const canvas = document.getElementById('screen');
main(canvas);
