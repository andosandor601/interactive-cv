import { Trait } from '../entity.js';

export default class Killable extends Trait {
    constructor() {
        super('killable');
    }

    kill(entity, level) {
        const index = level.entities.indexOf(entity);
        level.entities.splice(index, 1);
    }
} 