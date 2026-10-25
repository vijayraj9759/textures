const r = require("raylib");

// What does DrawTexture function do with color

function setup() {
    const width = 1000;
    const height = 1000;
    const windowTitle = "render";
    const fps = 60;

    r.InitWindow(width, height, windowTitle);
    r.SetTargetFPS(fps);

    const texture1Triangle = {
        v1: { x: 200, y: 0 },
        v2: { x: 0, y: 0 },
        v3: { x: 100, y: 200 },
    };

    const texture2Triangle = {
        v1: { x: 200, y: 0 },
        v2: { x: 0, y: 100 },
        v3: { x: 200, y: 200 },
    };

    return {
        screen: { width, height },
        texture1Triangle,
        texture2Triangle,
    };
}

function draw(world) {
    const target1 = world.target1;
    const target2 = world.target2;
    const horizontalFlip = {
        x: 0,
        y: 0,
        width: -200,
        height: 200,
    };
    const verticalFlip = {
        x: 0,
        y: 0,
        width: 200,
        height: -200,
    };

    r.DrawTexture(target1.texture, 400, 100, r.WHITE);
    r.DrawTexture(target2.texture, 200, 300, r.WHITE);

    r.DrawTextureRec(
        target2.texture,
        horizontalFlip,
        { x: 600, y: 300 },
        r.WHITE,
    );
    r.DrawTextureRec(
        target1.texture,
        verticalFlip,
        { x: 400, y: 500 },
        r.WHITE,
    );

    // r.DrawRectangle(400, 300, 200, 200, r.YELLOW);
}

function teardown() {
    r.CloseWindow();
}

function loop(world) {
    const target1 = r.LoadRenderTexture(200, 200);
    const target2 = r.LoadRenderTexture(200, 200);

    world.target1 = target1;
    world.target2 = target2;

    const triangle1 = world.texture1Triangle;
    const triangle2 = world.texture2Triangle;

    while (!r.WindowShouldClose()) {
        r.BeginTextureMode(target1);

        r.ClearBackground(r.SKYBLUE);
        r.DrawTriangle(triangle1.v1, triangle1.v2, triangle1.v3, r.YELLOW);
        r.EndTextureMode();

        r.BeginDrawing();
        r.BeginTextureMode(target2);

        r.ClearBackground(r.SKYBLUE);
        r.DrawTriangle(triangle2.v1, triangle2.v2, triangle2.v3, r.YELLOW);
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
