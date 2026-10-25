const r = require("raylib");

function degreeToRadian(degree) {
    return (Math.PI / 180) * degree;
}

function setup() {
    const width = 1000;
    const height = 1000;
    const windowTitle = "render";
    const fps = 60;

    r.InitWindow(width, height, windowTitle);
    r.SetTargetFPS(fps);

    const radius = 250;

    return {
        screen: { width, height },
        radius,
    };
}

function draw(world) {
    const target = world.target;

    r.DrawTexture(target.texture, 50, 50, r.WHITE);
}

function teardown() {
    r.CloseWindow();
}

function loop(world) {
    const target = r.LoadRenderTexture(600, 600);
    let radius = world.radius;

    world.cf = 0;
    world.target = target;

    while (!r.WindowShouldClose()) {
        const currentValue = world.cf++ % 361;
        if (world.cf % 360 === 0) {
            radius = radius - 25;
        }

        const x = 300 + radius * Math.cos(degreeToRadian(currentValue));
        const y = 300 + radius * Math.sin(degreeToRadian(currentValue));

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
