import { Light, PerspectiveCamera } from "../rendercore/src/RenderCore.js";
import { Vector3 } from "../rendercore/src/math/Vector3.js";
import { Vector4 } from "../rendercore/src/math/Vector4.js";
import { Euler } from "../rendercore/src/math/Euler.js";
import { Scene } from "../rendercore/src/objects/scene/Scene.js";
import { AmbientLight } from "../rendercore/src/lights/AmbientLight.js";
import { PointLight } from "../rendercore/src/lights/PointLight.js";
import { CanvasAlphaMode } from "../rendercore/src/canvas/CanvasAlphaMode.js";
import { API } from "../rendercore/src/core/API.js";
import { ArrayT2 } from "../rendercore/src/core/ArrayT2.js";
import { PowerPreference } from "../rendercore/src/core/PowerPreference.js";
import { Extent3D } from "../rendercore/src/core/RC/textures/Extent3D.js";
import { TextureFormat } from "../rendercore/src/core/RC/textures/TextureFormat.js";
import { CubeBasicMaterial } from "../rendercore/src/materials/CubeBasicMaterial.js";
import { Color4 } from "../rendercore/src/math/Color4.js";
import { Cube } from "../rendercore/src/objects/cube/Cube.js";
import { CubeGeometry } from "../rendercore/src/objects/cube/CubeGeometry.js";
import { ClearValue } from "../rendercore/src/renderers/ClearValue.js";
import { MeshRenderer } from "../rendercore/src/renderers/MeshRenderer.js";
import { AttachmentSize } from "../rendercore/src/renderers/AttachmentSize.js";
import { Viewport } from "../rendercore/src/renderers/render_passes/Viewport.js";
import { Time } from "../rendercore/src/time/Time.js";
import { AttachmentTextureDescriptor } from "../rendercore/src/renderers/AttachmentTextureDescriptor.js";
import { CanvasDescriptor } from "../rendercore/src/canvas/CanvasDescriptor.js";
import { PredefinedColorSpace } from "../rendercore/src/canvas/PredefinedColorSpace.js";
import { ScissorRectangle } from "../rendercore/src/renderers/render_passes/ScissorRectangle.js";
import { TextureDescriptor } from "../rendercore/src/core/RC/textures/TextureDescriptor.js";
import { TextureDimension } from "../rendercore/src/core/RC/textures/TextureDimension.js";
import { TextureUsage } from "../rendercore/src/core/RC/textures/TextureUsage.js";
import { TextureView } from "../rendercore/src/core/RC/textures/TextureView.js";
import { TextureViewDescriptor } from "../rendercore/src/core/RC/textures/TextureViewDescriptor.js";
import { AttachmentTextureViewDescriptor } from "../rendercore/src/renderers/AttachmentTextureViewDescriptor.js";
import { LoadOp } from "../rendercore/src/core/RC/LoadOp.js";
import { StoreOp } from "../rendercore/src/core/RC/StoreOp.js";
import { AttachmentReadOnly } from "../rendercore/src/renderers/AttachmentReadOnly.js";
import { LoadOperation } from "../rendercore/src/renderers/LoadOperation.js";
import { StoreOperation } from "../rendercore/src/renderers/StoreOperation.js";
import { loadScene } from "./SceneLoader.js";
import * as create from "./objectCreationTemplate.js";
import { Line } from "../rendercore/src/objects/line/Line.js";
import { Group } from "../rendercore/src/RenderCore.js";
import { Triangle } from "../rendercore/src/objects/triangle/Triangle.js";
import { FullOrbitCameraControls } from "../rendercore/src/cameras/FullOrbitCameraControls.js";
import { KeyboardInput } from "../rendercore/src/controls/KeyboardInput.js";
import { MouseInput } from "../rendercore/src/controls/MouseInput.js"
import { LineBasicMaterial } from "../rendercore/src/materials/LineBasicMaterial.js";

export class Control  extends EventTarget{

	#renderer
	#scene
	#selected 
	#rendererARGS
	#pixelRatio
	#camera
	#cameraControl
	//#fixedAspect

	constructor() {
		super();
		this.main();
		this.#pixelRatio = window.pixelRatio || 1
		//this.#fixedAspect = false;
	}

	//set renderer(renderer) {this.#renderer = renderer;}
	//get renderer() { return this.#renderer; }
	//get fixedAspect() {return this.#fixedAspect}
	//set fixedAspect(value) {return value ? this.#fixedAspect = value : this.#fixedAspect = !this.#fixedAspect}
	get scene() {return this.#scene;}
	get selected() {return this.#selected}


	//BFS for object with matching UUID + select result
	selectByUUID(uuid, root = this.#scene.children) {
		//begin queue
		let children = [...root];
		for (let i = 0; i < children.length; i++) {
			if (children[i].uuid.value.localeCompare(uuid) == 0) {
				this.#selected = children[i];
				return this.#selected
			}
			let subchildren = children[i].children
			//add children to queue if has any
			if (subchildren.size != 0) {
				children = children.concat([...subchildren])
			}
		}
	}

	findByUUID(uuid, root = this.#scene.children) {
		//begin queue
		let children = [...root];
		for (let i = 0; i < children.length; i++) {
			if (children[i].uuid.value.localeCompare(uuid) == 0) { ;
				return children[i];
			}
			let subchildren = children[i].children
			//add children to queue if has any
			if (subchildren.size != 0) {
				children = children.concat([...subchildren])
			}
		}
	}

	updateObjectColor(newValue) {
		this.#selected.colorIntensity = new Color4(newValue.r, newValue.g, newValue.b, newValue.a);
	}

	updateObjectTranslation(newValue) {
		this.#selected.position  = new Vector3(newValue.x, newValue.y, newValue.z);
	}

	updateObjectRotation(newValue,  target = this.#selected) {
		const newRotation = new Euler(
			newValue.x,
			newValue.y,  
			newValue.z,
			"XYZ");
		target.rotation = newRotation;

	}

	updateObjectVisibility(newValue, target = this.#selected) {
		target.visible = !target.visible;
	}
 
	updateObjectScale(newValue) {
		if(newValue.x == 0 || newValue.y == 0 ||newValue.z == 0) {
			return;
		}
		const newScale = new Vector3( newValue.x, newValue.y, newValue.z);
		const scale = this.#selected.scaling;
		this.#selected.scale(newScale.sub(scale))
	}
	
	updateObjectName(newValue) {
		this.#selected.name = newValue;
		const uuid = this.#selected.uuid.value;
		this.dispatchEvent(new CustomEvent('updateObjectList', {
			detail : {
				type : "namechange",
				uuid : uuid,
				value : newValue,
				variable : "name",
			}
		}));

	}	

	updateObjectDimensions(value, type) {
		const vect = this.#selected.geometry.baseGeometry.dimensions[0][type];
		this.#selected.geometry.baseGeometry.dimensions[0][type] = new Vector3(value.x, value.y, value.z)
	/* 	this.#selected.geometry.baseGeometry.dimensions[0][type].x = value.x;
		this.#selected.geometry.baseGeometry.dimensions[0][type].y = value.y;
		this.#selected.geometry.baseGeometry.dimensions[0][type].z = value.z; */
	}
	addObject(type, subtype) {
		const obj = create.object(subtype)
		obj.name = subtype + " " + this.#scene.children.size
		if (type == "light") {
			//handle light adding
			//bug with rendercore?
			this.#scene.add(obj);
			//this.#scene.lightManager.setup(this.#scene)
		} else {
			this.#scene.add(obj);
		}
		this.dispatchEvent(new CustomEvent('updateObjectList', {
			detail: {
				type : "add",
				object: obj,
				concealed: false,
		}}));

	}
	updateMaterial(value, type, object = null) {
		if (object) {
			object.material[type] = value;
		} else if (this.#selected.material) {		
			this.#selected.material[type] = new Color4(value.r, value.g, value.b, value.a);
		}
	}
	deleteSelectedObject(value) {
		const uuid = this.#selected.uuid.value;
		this.#scene.children.delete(this.#selected);
		this.dispatchEvent(new CustomEvent('updateObjectList', {
			detail : {
				type : "delete",
				uuid : uuid,
			}
		}));

	}

	lockCamera() {
		this.#cameraControl.locked = !this.#cameraControl.locked;
	}
	switchViewport() {
		this.#camera = this.#selected;
		this.#rendererARGS = { scene: this.#scene, camera: this.#camera };
	}

	updateCamera(value, type) {
		this.#selected[type] = value;
	}

	changeScene(type) {
		this.#scene = new Scene();
		loadScene(type, this.#scene);
		this.#rendererARGS = { scene: this.#scene, camera:  this.#camera };
		this.#renderer.render(this.#rendererARGS);
		this.dispatchEvent(new CustomEvent('updateObjectList', {
			detail: {
				type : "changeScene",
				scene : this.#scene
			}
		})); 

		//window.requestAnimationFrame(animationFrame); 
	}

	testFunction() {

		//Test button for displaying custom information
		//console.log("Selected object is, ", this.#selected)
		console.log(this.#selected)

	}

	async main(args = {}) {
		const pixelRatio = window.devicePixelRatio || 1;

		const extent = new Extent3D(
			{
				width: Math.floor(document.body.clientWidth * pixelRatio),
				height: Math.floor(document.body.clientHeight * pixelRatio)
			}
		);

		this.#scene =  new Scene();

		this.#scene.add(new AmbientLight(
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
		this.#scene.add(pl);

		const xAxis = new Line({
			material : new LineBasicMaterial({
				emissive: new Color4(1, 0, 0, 0.5),
			})
		});
		xAxis.rotate(new Euler(0, 0, -Math.PI/4, "XYZ"));
		xAxis.scale(new Vector3(1000, 1000, 1000));
		const yAxis = new Line({
			material : new LineBasicMaterial({
				emissive: new Color4(0, 1, 0, 0.5),
			})
		});
		yAxis.rotate(new Euler(0, 0, Math.PI / 4, "XYZ"));
		yAxis.scale(new Vector3(1000, 1000, 1000));


		const zAxis = new Line({
			material : new LineBasicMaterial({
				emissive: new Color4(0, 0, 1, 0.5),
			})
		});
		zAxis.rotate(new Euler(-Math.PI/4,Math.PI/2, 0, "XYZ"));
		zAxis.scale(new Vector3(1000, 1000, 1000));
	
		const coordinateLines = new Group()
		coordinateLines.add(xAxis)
		coordinateLines.add(yAxis)
		coordinateLines.add(zAxis)
		coordinateLines.label = "DONOTPARSE";
		coordinateLines.name = "coordinateLines";

		const grid = new Group();
		const gridMaterial = new LineBasicMaterial({
			emissive: new Color4(0.3, 0.3, 0.3, 0.1),
			diffusive: new Color4(0.3, 0.4, 0.3, 0.3),
		})
		let max = 50;
		for (let i = 0; i < max; i++) {
			const object1 = new Line({
				material : gridMaterial
			});
			object1.translate(new Vector3(0,0,i-max/2));
			object1.rotate(new Euler(0, 0, -Math.PI/4, "XYZ"));
			object1.scale(new Vector3(max/3,max/3,max/3));
	
	
			grid.add(object1);

			const object2 = new Line({
				materiaL : gridMaterial
			});
			object2.translate(new Vector3(i-max/2,0,0));
			object2.rotate(new Euler(-Math.PI/4,Math.PI/2, 0, "XYZ"));
			object2.scale(new Vector3(max/3,max/3,max/3));
	
	
			grid.add(object2);
		}
		
		grid.label = "DONOTPARSE";
		grid.name = "grid";
		this.#scene.add(grid);
		
		this.#scene.add(coordinateLines);


		const cube = new Cube();
		this.#scene.add(cube)

		this.#camera = new PerspectiveCamera(
			{
				fov: 90/2,
				aspect: extent.width / extent.height,
				near: 0.125,
				far: 128.0
			}
		);
		this.#scene.add(this.#camera);

		this.#renderer = await new MeshRenderer(
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

		this.#cameraControl = new FullOrbitCameraControls(
			this.#camera, new Vector3(3,2,8), new Vector3(0, 0, 1), 4, {
			}, this.#scene)

		
		this.#rendererARGS= { scene: this.#scene, camera: this.#camera }

		this.dispatchEvent(new CustomEvent('updateObjectList', {
			detail: {
				type : "changeScene",
				scene : this.#scene
			}
		})); 


		


		const keyboardInput = new KeyboardInput(window);
		const mouseInput = new MouseInput(window);

		const input = {
			mouseInput : mouseInput,
			keyboardInput : keyboardInput,
		}


		const resize = (() => {
			const newExtent = new Extent3D();
			const newViewport = new Viewport();
			const newScissorRectangle = new ScissorRectangle();
			const newAttachmentSize = new AttachmentSize({ color: new ArrayT2({}, newExtent), depthStencil: newExtent });


			return (event) => {
				newExtent.width = Math.floor(this.#renderer.canvas.clientWidth * pixelRatio);
				newExtent.height = Math.floor(this.#renderer.canvas.clientHeight * pixelRatio);
				newExtent.depthOrArrayLayers = 1;

				newViewport.x = 0;
				newViewport.y = 0;
				newViewport.width = newExtent.width;
				newViewport.height = newExtent.height;

				newScissorRectangle.x = 0;
				newScissorRectangle.y = 0;
				newScissorRectangle.width = newExtent.width;
				newScissorRectangle.height = newExtent.height;


				this.#camera.aspect = newExtent.width / newExtent.height;
				this.#renderer.viewport = newViewport;
				this.#renderer.scissorRectangle = newScissorRectangle;
				this.#renderer.attachmentSize = newAttachmentSize;
			};
		})();

		const animationFrame = (() => {
			const time = new Time();
			let lastTime = performance.now();

	
			const groupRotation = new Euler(0, 0, 0, "XYZ");
			this.#rendererARGS= { scene: this.#scene, camera: this.#camera }

	
			return (timeCurr) => {
				time.update();
	
				groupRotation.x = groupRotation.x + 0.001 * time.delta;
				groupRotation.y = groupRotation.y + 0.001 * time.delta;
				groupRotation.z = groupRotation.z + 0.001 * time.delta;
				//group.rotation = groupRotation
				//cube.rotation = groupRotation;

				//currently locked from moving
				this.#cameraControl.update(input, time)

				const delta = timeCurr - lastTime;

				this.#renderer.render(this.#rendererARGS);
	
	
				window.requestAnimationFrame(animationFrame);
			};
		})();

		window.addEventListener("resize", resize);
		window.requestAnimationFrame(animationFrame);
	}



}

