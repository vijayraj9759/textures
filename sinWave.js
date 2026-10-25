const r = require("raylib");

// What does DrawTexture function do with color

function degreeToRadian(degree) {
    return (Math.PI / 180) * degree;
}

function trigonometryFuncValues(trigoFunc) {
    const values = [];

    for (let i = 0; i <= 360; i++) {
        const radian = degreeToRadian(i);
        values[i] = trigoFunc(radian);
    }

    return values;
}

function setup() {
    const width = 1000;
    const height = 1000;
    const windowTitle = "render";
    const fps = 60;

    r.InitWindow(width, height, windowTitle);
    r.SetTargetFPS(fps);

    const sinFunctionValues = trigonometryFuncValues(Math.sin);

    return {
        screen: { width, height },
        sinFunctionValues,
    };
}

function draw(world) {
    const target = world.target;

    r.DrawTexture(target.texture, 50, 50, r.WHITE);
}

function teardown() {
    r.CloseWindow();
}

function mapX(value, min, max) {
    return ((max - min) / 360) * value;
}

function mapY(value, min, max) {
    return min + Math.ceil(((max - min) / 20) * 10) * (1 - value);
}

function loop(world) {
    const target = r.LoadRenderTexture(720, 400);
    world.cf = 0;
    world.target = target;

    while (!r.WindowShouldClose()) {
        const currentValue = world.cf++ % 361;
        const sinValue = world.sinFunctionValues[currentValue];

        const x = mapX(world.cf, 0, 720);
        const y = mapY(sinValue, 0, 400);

        r.BeginTextureMode(target);

        r.DrawCircle(x, y, 5, r.WHITE);

        r.EndTextureMode();

        r.BeginDrawing();
        draw(world);
        r.EndDrawing();
    }
}

function main() {
    const world = setup();
    loop(world);
    teardown();
}

main();
