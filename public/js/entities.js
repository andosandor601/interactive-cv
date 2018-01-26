import { loadMe } from './entities/me.js';
import { loadChildMe } from './entities/child_me.js';
import { loadPacifier } from './entities/pacifier.js';
import { loadBlackRook } from './entities/blackRook.js';

export function loadEntities() {
    const entityFactories = {};

    function addAs(name) {
        return factory => entityFactories[name] = factory;
    }

    return Promise.all([
        loadMe().then(addAs('me')),
        loadChildMe().then(addAs('childMe')),
        loadPacifier().then(addAs('pacifier')),
        loadBlackRook().then(addAs('blackRook'))
    ])
    .then(() => entityFactories);
}