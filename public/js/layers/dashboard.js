export function createDashboardLayer(font, playerEnv) {
    const LINE1 = font.size;
    const LINE2 = font.size * 3;


    return function drawDashboard(context) {
        const score = playerEnv.playerController.score;

        font.print('SANYA', context, 16, LINE1);
        //toFixed don't nedded in the future, because it dont have decimals, its a integer
        font.print(score.toFixed().toString().padStart(3, '0'), context, 16, LINE2);
    };
}