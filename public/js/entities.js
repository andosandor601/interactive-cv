import { loadMe } from './entities/me.js';
import { loadInfantMe } from './entities/infant_me.js';
import { loadItem } from './entities/item.js'

export function loadEntities() {
    const entityFactories = {};

    function addAs(name) {
        return factory => entityFactories[name] = factory;
    }

    return Promise.all([
        loadMe().then(addAs('me')),
        loadInfantMe().then(addAs('infantMe')),
        loadItem().then(addAs('item'))
    ])
        .then(() => entityFactories);
}