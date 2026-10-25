const r = require("raylib");

// What does DrawTexture function do with color

function setup() {
    const width = 1000;
    const height = 1000;
    const windowTitle = "render";
    const fps = 60;

    r.InitWindow(width, height, windowTitle);
    r.SetTargetFPS(fps);

    return {
        screen: { width, height },
    };
}

function draw(world) {
    const target = world.target;
    const horizontalFlip = {
        x: 0,
        y: 0,
        width: -300,
        height: 200,
    };
    const verticalFlip = {
        x: 0,
        y: 0,
        width: 300,
        height: -200,
    };

    r.DrawTexture(target.texture, 10, 100, r.WHITE);
    r.DrawTextureRec(
        target.texture,
        horizontalFlip,
        { x: 400, y: 100 },
        r.WHITE,
    );
    r.DrawTextureRec(target.texture, verticalFlip, { x: 100, y: 400 }, r.WHITE);

    // r.DrawTexture(target.texture, 50, 50, r.WHITE);
}

function teardown() {
    r.CloseWindow();
}

function loop(world) {
    const target = r.LoadRenderTexture(300, 200);
    world.target = target;

    while (!r.WindowShouldClose()) {
        r.BeginTextureMode(target);

        r.ClearBackground(r.DARKGRAY);
        r.DrawCircle(100, 100, 60, r.RED);
        r.DrawCircle(80, 80, 15, r.WHITE);

        r.EndTextureMode();

        r.BeginDrawing();
        r.ClearBackground(r.SKYBLUE);
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
