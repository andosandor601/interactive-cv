export function createDashboardLayer(font, player, level) {
    const LINE1 = font.size;
    const LINE2 = font.size * 3;

    return function drawDashboard(context) {
        const levelName = level.levelName;
        const score = level.actScore;
        const text = player.characterLogic.text;

        font.print(levelName, context, 16, LINE1);
        font.print(score.toString().padStart(3, '0'), context, 16, LINE2);
        font.print(text, context, 100, LINE1);
    };
}

export function createWelcomeMessage(font, context, messages){
    messages.forEach((message) => {
        font.print(message.text, context, message.x, message.y);
    });
}