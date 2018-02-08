import Keyboard from './keyboardState.js';

export function setupKeyboard(me) {
    const input = new Keyboard();

    input.addMapping('ArrowUp', keyState => {
        if (keyState) {
            me.jump.start();
        } else {
            me.jump.canceled();
        }
    });

    input.addMapping('ArrowRight', keyState => {
        me.go.dir = keyState ? 1 : 0;
    });

    input.addMapping('ArrowLeft', keyState => {
        me.go.dir = keyState ? -1 : 0;
    });

    return input;
}