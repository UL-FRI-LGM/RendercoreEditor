import { PerspectiveCamera } from "../../rendercore/RenderCore.js";
import { Vector3 } from "../../rendercore/math/Vector3.js";
import { Vector4 } from "../../rendercore/math/Vector4.js";
import { Euler } from "../../rendercore/math/Euler.js";
import { Scene } from "../../rendercore/objects/Scene.js";
import { AmbientLight } from "../../rendercore/lights/AmbientLight.js";
import { PointLight } from "../../rendercore/lights/PointLight.js";
import { CanvasAlphaMode } from "../../rendercore/canvas/CanvasAlphaMode.js";
import { API } from "../../rendercore/core/API.js";
import { ArrayT2 } from "../../rendercore/core/ArrayT2.js";
import { PowerPreference } from "../../rendercore/core/PowerPreference.js";
import { Extent3D } from "../../rendercore/core/RC/textures/Extent3D.js";
import { TextureFormat } from "../../rendercore/core/RC/textures/TextureFormat.js";
import { CubeBasicMaterial } from "../../rendercore/materials/CubeBasicMaterial.js";
import { Color4 } from "../../rendercore/math/Color4.js";
import { Cube } from "../../rendercore/objects/Cube.js";
import { CubeGeometry } from "../../rendercore/objects/CubeGeometry.js";
import { ClearValue } from "../../rendercore/renderers/ClearValue.js";
import { MeshRenderer } from "../../rendercore/renderers/MeshRenderer.js";
import { Size } from "../../rendercore/renderers/Size.js";
import { Viewport } from "../../rendercore/renderers/render_passes/Viewport.js";
import { Time } from "../../rendercore/time/Time.js";


async function main(args = {}) {
	const pixelRatio = window.devicePixelRatio || 1;

	const extent = new Extent3D(
		{
			width: Math.floor(document.body.clientWidth * pixelRatio),
			height: Math.floor(document.body.clientHeight * pixelRatio)
		}
	);


	const scene = new Scene();


	const al = new AmbientLight(
		{
			colorIntensity: new Color4(1, 1, 1, 1/8),
		}
	);
	al.position = new Vector3(0, 0, 0);
	scene.add(al);

	const pl = new PointLight(
		{
			colorIntensity: new Color4(1, 1, 1, 1),
			decayDistance: new Vector4(1.0, 0.01, 0.0001, 0.0)
		}
	);
	pl.position = new Vector3(-2, +2, +2);
	scene.add(pl);


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
					emissive: new Color4(1, 1, 1, 1/32),
					diffuse: new Color4(1, 1, 1, 1)
				}
			)
		}
	);
	scene.add(cube);


	const camera = new PerspectiveCamera(
		{
			fov: 90,
			aspect: extent.width / extent.height,
			near: 0.125,
			far: 128.0
		}
	);
	camera.position = new Vector3(0, 0, 8);
	scene.add(camera);


	const renderer = await new MeshRenderer(
		API.WEBGPU,
		{
			parent: document.body,
			format: TextureFormat.BGRA_8_UNORM,
			alphaMode: CanvasAlphaMode.OPAQUE,

			powerPreference: PowerPreference.HIGH_PERFORMANCE,
			forceFallbackAdapter: false,

			viewport:  new Viewport({ x: 0, y: 0, width: extent.width, height: extent.height, minDepth: 0, maxDepth: 1 }),

			size: new Size({ color: new ArrayT2({}, extent), depthStencil: extent }),
			clearValue: new ClearValue({ color: new ArrayT2({}, new Color4(0.5, 0.5, 0.5, 1)), depth: 1, stencil: 0 }),
		}
	);


	const animationFrame = (() => {
		const time = new Time();

		const cubeRotation = new Euler(0, 0, 0, "XYZ");
		const RENDER_ARGS = { scene: scene, camera: camera };


		return (timeCurr) => {
			time.update();


			cubeRotation.x = cubeRotation.x + 0.001 * time.delta;
			cubeRotation.y = cubeRotation.y + 0.001 * time.delta;
			cubeRotation.z = cubeRotation.z + 0.001 * time.delta;
			//console.log(cubeRotation)
			cube.rotation = cubeRotation;

			renderer.render(RENDER_ARGS);
	
	
			window.requestAnimationFrame(animationFrame);
		};
	})();

	const resize = (() => {
		const newExtent = new Extent3D();
		const newViewport = new Viewport();
		const newSize = { color: [newExtent], depthStencil: newExtent };


		return (event) => {
			newExtent.width = Math.floor(renderer.canvas.clientWidth * pixelRatio);
			newExtent.height = Math.floor(renderer.canvas.clientHeight * pixelRatio);
			newExtent.depthOrArrayLayers = 1;

			newViewport.x = 0;
			newViewport.y = 0;
			newViewport.width = newExtent.width;
			newViewport.height = newExtent.height;
	
	
			camera.aspect = newExtent.width / newExtent.height;
			renderer.viewport = newViewport;
			renderer.size = newSize;
		};
	})();


	window.addEventListener("resize", resize);
	window.requestAnimationFrame(animationFrame);
}

window.addEventListener("load", (event) => { main({ event: event }); });

