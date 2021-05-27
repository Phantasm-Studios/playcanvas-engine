import React from 'react';
import * as pc from 'playcanvas';
import { AssetLoader } from '../../app/helpers/loader';
import Example from '../../app/example';

class TextureBasisExample extends Example {
    static CATEGORY = 'Graphics';
    static NAME = 'Texture Basis';

    load() {
        return <>
            <AssetLoader name='seaBasis' type='texture' url='static/assets/textures/sea.basis' />
            <AssetLoader name='playcanvasBasis' type='texture' url='static/assets/textures/playcanvas.basis' />
        </>;
    }

    // @ts-ignore: override class function
    example(canvas: HTMLCanvasElement, assets: { seaBasis: pc.Asset, playcanvasBasis: pc.Asset }): void {

        // Create the application and start the update loop
        const app = new pc.Application(canvas, {});

        // @ts-ignore engine-tsd
        pc.basisDownload(
            'static/lib/basis/basis.wasm.js',
            'static/lib/basis/basis.wasm.wasm',
            'static/lib/basis/basis.js',
            function () {

                app.start();

                // Set the canvas to fill the window and automatically change resolution to be the same as the canvas size
                app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
                app.setCanvasResolution(pc.RESOLUTION_AUTO);

                app.scene.ambientLight = new pc.Color(1, 1, 1);

                // Create a Entity with a Box model component
                const box1 = new pc.Entity();
                box1.addComponent("model", { type: "box" });

                const box2 = new pc.Entity();
                box2.addComponent("model", { type: "box" });

                // Create an Entity with a camera component
                const camera = new pc.Entity();
                camera.addComponent("camera", {
                    clearColor: new pc.Color(0.4, 0.45, 0.5)
                });

                // Add the new Entities to the hierarchy
                app.root.addChild(box1);
                app.root.addChild(box2);
                app.root.addChild(camera);

                box1.setPosition(-1, 0, 0);
                box2.setPosition(1, 0, 0);

                // Move the camera 10m along the z-axis
                camera.translate(0, 0, 4);

                // Set an update function on the app's update event
                let angle = 0;
                app.on("update", function (dt) {
                    angle += dt;
                    if (angle > 360) {
                        angle = 0;
                    }

                    // Rotate the boxes
                    box1.setEulerAngles(angle * 2, angle * 4, angle * 8);
                    box2.setEulerAngles(90 - angle * 12, 120 - angle * 8, 150 - angle * 10);
                });

                let material = new pc.StandardMaterial();
                material.diffuseMap = assets.seaBasis.resource;
                material.update();
                box1.model.meshInstances[0].material = material;

                material = new pc.StandardMaterial();
                material.diffuseMap = assets.playcanvasBasis.resource;
                material.update();
                box2.model.meshInstances[0].material = material;
            }
        );
    }
}

export default TextureBasisExample;
