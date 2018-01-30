import { Trait } from '../entity.js';

export default class Killable extends Trait {
    constructor() {
        super('killable');
    }

    kill(entity, level) {
        level.entities.delete(entity);
    }
} 