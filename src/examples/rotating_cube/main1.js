import { Group, PerspectiveCamera, PointLight, Vector4 } from "../../rendercore/src/RenderCore.js";
import { Vector3 } from "../../rendercore/src/math/Vector3.js";
import { Euler } from "../../rendercore/src/math/Euler.js";
import { Scene } from "../../rendercore/src/objects/scene/Scene.js";
import { AmbientLight } from "../../rendercore/src/lights/AmbientLight.js";
import { CanvasAlphaMode } from "../../rendercore/src/canvas/CanvasAlphaMode.js";
import { API } from "../../rendercore/src/core/API.js";
import { ArrayT2 } from "../../rendercore/src/core/ArrayT2.js";
import { PowerPreference } from "../../rendercore/src/core/PowerPreference.js";
import { Extent3D } from "../../rendercore/src/core/RC/textures/Extent3D.js";
import { TextureFormat } from "../../rendercore/src/core/RC/textures/TextureFormat.js";
import { Color4 } from "../../rendercore/src/math/Color4.js";
import { Line } from "../../rendercore/src/objects/line/Line.js";
import { ClearValue } from "../../rendercore/src/renderers/ClearValue.js";
import { MeshRenderer } from "../../rendercore/src/renderers/MeshRenderer.js";
import { AttachmentSize } from "../../rendercore/src/renderers/AttachmentSize.js";
import { Viewport } from "../../rendercore/src/renderers/render_passes/Viewport.js";
import { Time } from "../../rendercore/src/time/Time.js";
import { CanvasDescriptor } from "../../rendercore/src/canvas/CanvasDescriptor.js";
import { PredefinedColorSpace } from "../../rendercore/src/canvas/PredefinedColorSpace.js";
import { ScissorRectangle } from "../../rendercore/src/renderers/render_passes/ScissorRectangle.js";
import { AttachmentTextureDescriptor } from "../../rendercore/src/renderers/AttachmentTextureDescriptor.js";
import { TextureDescriptor } from "../../rendercore/src/core/RC/textures/TextureDescriptor.js";
import { TextureDimension } from "../../rendercore/src/core/RC/textures/TextureDimension.js";
import { TextureUsage } from "../../rendercore/src/core/RC/textures/TextureUsage.js";
import { TextureView } from "../../rendercore/src/core/RC/textures/TextureView.js";
import { TextureViewDescriptor } from "../../rendercore/src/core/RC/textures/TextureViewDescriptor.js";
import { AttachmentTextureViewDescriptor } from "../../rendercore/src/renderers/AttachmentTextureViewDescriptor.js";
import { LoadOp } from "../../rendercore/src/core/RC/LoadOp.js";
import { StoreOp } from "../../rendercore/src/core/RC/StoreOp.js";
import { AttachmentReadOnly } from "../../rendercore/src/renderers/AttachmentReadOnly.js";
import { LoadOperation } from "../../rendercore/src/renderers/LoadOperation.js";
import { StoreOperation } from "../../rendercore/src/renderers/StoreOperation.js";


export async function main(args = {}) {
	const pixelRatio = window.devicePixelRatio || 1;

	const extent = new Extent3D(
		{
			width: Math.floor(document.body.clientWidth * pixelRatio),
			height: Math.floor(document.body.clientHeight * pixelRatio)
		}
	);


	const scene = new Scene();

	scene.add(new AmbientLight(
		{
			colorIntensity: new Color4(1, 1, 1, 1/8),
		}
	));

	const pl = new PointLight(
		{
			colorIntensity: new Color4(1, 1, 1, 1),
			decayDistance: new Vector4(1.0, 0.1, 0.01, 0.0)
		}
	);
	pl.position = new Vector3(-2, +2, +2);
	scene.add(pl);

	const group = new Group();
	for (let i = 0; i < 32; i++) {
		const object = new Line();
		object.translate(new Vector3(Math.random(), Math.random(), Math.random()).subScalar(0.5).multiplyScalar(4));
		object.rotate(new Euler(Math.random()*Math.PI, Math.random()*Math.PI, Math.random()*Math.PI, "XYZ"));
		object.scale(new Vector3(Math.random(), Math.random(), Math.random()));


		group.add(object);
	}
	scene.add(group);


	const camera = new PerspectiveCamera(
		{
			fov: 90/2,
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
			powerPreference: PowerPreference.HIGH_PERFORMANCE,
			forceFallbackAdapter: false,

			viewport: new Viewport({ x: 0, y: 0, width: extent.width, height: extent.height, minDepth: 0, maxDepth: 1 }),
			scissorRectangle: new ScissorRectangle({ x: 0, y: 0, width: extent.width, height: extent.height }),

			clearValue: new ClearValue({ color: new ArrayT2({}, new Color4(0.5, 0.5, 0.5, 1)), depth: 1, stencil: 0 }),
			loadOperation: new LoadOperation({ color: new ArrayT2({}, LoadOp.CLEAR), depth: LoadOp.CLEAR, stencil: undefined }),
			storeOperation: new StoreOperation({ color: new ArrayT2({}, StoreOp.STORE), depth: StoreOp.STORE, stencil: undefined }),
			// attachmentReadOnly: new AttachmentReadOnly({ color: new ArrayT2({}, null), depth: false, stencil: true }),

			attachmentTextureDescriptor: new AttachmentTextureDescriptor(
				{
					color: new ArrayT2({},
						new CanvasDescriptor(
							{
								label: "RP-00 CA-00 T CANVAS",

								parent: document.body,

								size: extent,
								format: TextureFormat.BGRA_8_UNORM,

								colorSpace: PredefinedColorSpace.SRGB,
								alphaMode: CanvasAlphaMode.OPAQUE,
							}
						)
					),
					depthStencil: new TextureDescriptor(
						{
							label: "RP-00 DSA-00 T CANVAS",

							size: extent,
							dimension: TextureDimension.D2,
							format: TextureFormat.DEPTH_32_FLOAT,
							usage: TextureUsage.RENDER_ATTACHMENT,
						}
					)
				}
			),
			attachmentTextureViewDescriptor: new AttachmentTextureViewDescriptor(
				{
					color: new ArrayT2({},
						new TextureViewDescriptor(
							{
								label: "RP-00 CA-00 TV CANVAS",
								dimension: TextureView.DIMENSION.D2,
								format: TextureFormat.BGRA_8_UNORM,
								aspect: TextureView.ASPECT.ALL,
								baseMipLevel: 0,
								mipLevelCount: 1,
								baseArrayLayer: 0,
								arrayLayerCount: 1,
							}
						)
					),
					depthStencil: new TextureViewDescriptor(
						{
							label: "RP-00 DSA-00 TV CANVAS",
							dimension: TextureView.DIMENSION.D2,
							format: TextureView.FORMAT.DEPTH_32_FLOAT,
							aspect: TextureView.ASPECT.ALL,
							baseMipLevel: 0,
							mipLevelCount: 1,
							baseArrayLayer: 0,
							arrayLayerCount: 1,
						}
					)
				}
			),

			attachmentSize: new AttachmentSize({ color: new ArrayT2({}, extent), depthStencil: extent }),
		}
	);


	const animationFrame = (() => {
		const time = new Time();

		const groupRotation = new Euler(0, 0, 0, "XYZ");
		const RENDER_ARGS = { scene: scene, camera: camera };


		return (timeCurr) => {
			time.update();


			groupRotation.x = groupRotation.x + 0.001 * time.delta;
			groupRotation.y = groupRotation.y + 0.001 * time.delta;
			groupRotation.z = groupRotation.z + 0.001 * time.delta;
			group.rotation = groupRotation;

			renderer.render(RENDER_ARGS);


			window.requestAnimationFrame(animationFrame);
		};
	})();

	const resize = (() => {
		const newExtent = new Extent3D();
		const newViewport = new Viewport();
		const newScissorRectangle = new ScissorRectangle();
		const newAttachmentSize = new AttachmentSize({ color: new ArrayT2({}, newExtent), depthStencil: newExtent });


		return (event) => {
			console.log("resizing")

			newExtent.width = Math.floor(renderer.canvas.clientWidth * pixelRatio);
			newExtent.height = Math.floor(renderer.canvas.clientHeight * pixelRatio);
			newExtent.depthOrArrayLayers = 1;

			newViewport.x = 0;
			newViewport.y = 0;
			newViewport.width = newExtent.width;
			newViewport.height = newExtent.height;

			newScissorRectangle.x = 0;
			newScissorRectangle.y = 0;
			newScissorRectangle.width = newExtent.width;
			newScissorRectangle.height = newExtent.height;


			camera.aspect = newExtent.width / newExtent.height;
			renderer.viewport = newViewport;
			renderer.scissorRectangle = newScissorRectangle;
			renderer.attachmentSize = newAttachmentSize;
		};
	})();


	window.addEventListener("resize", resize);
	window.requestAnimationFrame(animationFrame);
}


window.addEventListener("load", (event) => { main({ event: event }); });