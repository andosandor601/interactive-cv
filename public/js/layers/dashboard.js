export function createDashboardLayer(font, player) {
    const LINE1 = font.size;
    const LINE2 = font.size * 3;

    return function drawDashboard(context) {
        const score = player.characterLogic.score;
        const text = player.characterLogic.text;

        font.print('LEVEL 1', context, 16, LINE1);
        font.print(score.toString().padStart(3, '0'), context, 16, LINE2);
        font.print(text, context, 100, LINE1);
    };
}