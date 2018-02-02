import { loadMe } from './entities/me.js';
import { loadInfantMe } from './entities/infant_me.js';
import { loadPacifier } from './entities/pacifier.js';
import { loadBlackRook } from './entities/blackRook.js';
import { loadWhiteRook } from './entities/whiteRook.js';
import { loadStarToy } from './entities/starToy.js';
import { loadFootball } from './entities/football.js';
import { loadSmile } from './entities/smile.js';
import { loadCry } from './entities/cry.js';
import { loadBeer } from './entities/beer.js';
import { loadBrusselsSprout } from './entities/brusselsSprout.js';

export function loadEntities() {
    const entityFactories = {};

    function addAs(name) {
        return factory => entityFactories[name] = factory;
    }

    return Promise.all([
        loadMe().then(addAs('me')),
        loadInfantMe().then(addAs('infantMe')),
        loadPacifier().then(addAs('pacifier')),
        loadBlackRook().then(addAs('blackRook')),
        loadWhiteRook().then(addAs('whiteRook')),
        loadStarToy().then(addAs('starToy')),
        loadFootball().then(addAs('football')),
        loadSmile().then(addAs('smile')),
        loadCry().then(addAs('cry')),
        loadBeer().then(addAs('beer')),
        loadBrusselsSprout().then(addAs('brusselsSprout'))
    ])
        .then(() => entityFactories);
}