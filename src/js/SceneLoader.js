import { Scene } from "../rendercore/objects/Scene.js";
import { Cube } from "../rendercore/objects/Cube.js";
import { Color4 } from "../rendercore/math/Color4.js";
import { Frustum, PerspectiveCamera, Vector3, Vector4 } from "../rendercore/RenderCore.js";
import { CubeGeometry } from "../rendercore/objects/CubeGeometry.js";
import { CubeBasicMaterial } from "../rendercore/materials/CubeBasicMaterial.js";
import { AmbientLight } from "../rendercore/lights/AmbientLight.js";
import { Extent3D } from "../rendercore/core/RC/textures/Extent3D.js";
import { PointLight } from "../rendercore/RenderCore.js";
import { randomInt } from "./utils.js";
import { object } from "./objectCreationTemplate.js";
import { Line } from "../rendercore/objects/Line.js";
import { LineGeometry } from "../rendercore/objects/LineGeometry.js";
import { LineBasicMaterial } from "../rendercore/materials/LineBasicMaterial.js";

export function loadScene(type, scene, data = null) {
	switch(type) {
		case "empty":
			return empty(scene);
		case "cube":
			return cube(scene);
		case "load":
			return load(scene, data);
		case "test":
			return testOnly(scene);
		default:
			return testOnly(scene);
	}
	//default is cube
}
function testOnly(scene) {
	const pixelRatio = window.devicePixelRatio || 1;

	const extent = new Extent3D(
		{
			width: Math.floor(document.body.clientWidth * pixelRatio),
			height: Math.floor(document.body.clientHeight * pixelRatio)
		}
	);
	const al = new AmbientLight(
		{
			colorIntensity: new Color4(1, 1, 1, 1/8),
		}
	);
	scene.add(al);
	const line = new Line(
		{		
			geometry: new LineGeometry(
				{
					indexed: true,
					baseGeometry: {
						positions: [new Vector3(-5, 0, 0),  new Vector3 (5,0,0)],
					},
				},
			),
			material: new LineBasicMaterial(
				{
					emissive: new Color4(1, 1, 1, 1),
					diffuse: new Color4(1, 1, 1, 1),
				}
			),
			picabkle: true,
			frustumCulled: false,
		}
	)
	scene.add(line)
	const camera = new PerspectiveCamera(
		{
			fov: 90,
			aspect: extent.width / extent.height,
			near: 0.125,
			far: 128.0
		}
	);
	camera.position = new Vector3(0, 2, 8);
	scene.cameraManager.activeCamera = camera;

    scene.add(camera);

	return scene
}
function empty(scene) {
    //const scene = new Scene();

    const pixelRatio = window.devicePixelRatio || 1;

	const extent = new Extent3D(
		{
			width: Math.floor(document.body.clientWidth * pixelRatio),
			height: Math.floor(document.body.clientHeight * pixelRatio)
		}
	);

	const al = new AmbientLight(
		{
			colorIntensity: new Color4(1, 1, 1, 1/8),
		}
	);
	al.position = new Vector3(0, 0, 0);
	scene.add(al);
    const camera = new PerspectiveCamera(
		{
			fov: 90,
			aspect: extent.width / extent.height,
			near: 0.125,
			far: 128.0
		}
	);
	camera.position = new Vector3(0, 2, 8);
    scene.add(camera);

	camera.name = "Empty camera"
    scene.cameraManager.activeCamera = camera;

    return scene;
}

function cube(scene) {
    //const scene = new Scene()
    
	

    const pixelRatio = window.devicePixelRatio || 1;

	const extent = new Extent3D(
		{
			width: Math.floor(document.body.clientWidth * pixelRatio),
			height: Math.floor(document.body.clientHeight * pixelRatio)
		}
	);

    //add light
    const al = new AmbientLight(
		{
			colorIntensity: new Color4(1, 1, 1, 1/8),
		}
	);
	al.position = new Vector3(0, 0, 0);
	scene.add(al);


	const pl = new PointLight(
		{
			colorIntensity: new Color4(0.5, 0.5, 0, 0.5),
			decayDistance: new Vector4(1.0, 0.01, 0.0001, 0.0),
		}
	);
	pl.position = new Vector3(-2, -2, +2)

	scene.add(pl);

	const pl2 = new PointLight(
		{
			colorIntensity: new Color4(0, 0.5, 0.5, 0.5),
			decayDistance: new Vector4(1.0, 0.01, 0.0001, 0.0),
		}
	);	
	//scene.add(pl2);
	//pl.position = new Vector3(-2, -2,+2);
	//scene.add(pl2);


    //add cube
    const cube = new Cube(
		{
			geometry: new CubeGeometry(
				{
					baseGeometry: {
						positions: [ new Vector3(0, 0, 0) ]
					}
				}
			),
			material: new CubeBasicMaterial(
				{
					emissive: new Color4(1, 1, 1, 1/8),
					diffuse: new Color4(1, 1, 1, 1)
				}
			)
		}
	);
	cube.position = new Vector3(0,0,0);
	cube.visible = true;
    scene.add(cube);

    const camera = new PerspectiveCamera(
		{
			fov: 90,
			aspect: extent.width / extent.height,
			near: 0.125,
			far: 128.0
		}
	);
	camera.position = new Vector3(0, 2, 8);
    scene.add(camera);

	camera.name = "Perspective Camera"
    scene.cameraManager.activeCamera = camera;

    return scene;

}