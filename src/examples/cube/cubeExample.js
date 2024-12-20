import { PerspectiveCamera } from "../../rendercore/RenderCore.js";
import { Vector4, Vector3 } from "../../rendercore/RenderCore.js";
import { Euler } from "../../rendercore/math/Euler.js";
import { Scene } from "../../rendercore/objects/Scene.js";
import { CanvasAlphaMode } from "../../rendercore/canvas/CanvasAlphaMode.js";
import { API } from "../../rendercore/core/API.js";
import { ArrayT2 } from "../../rendercore/core/ArrayT2.js";
import { PowerPreference } from "../../rendercore/core/PowerPreference.js";
import { Extent3D } from "../../rendercore/core/RC/textures/Extent3D.js";
import { TextureFormat } from "../../rendercore/core/RC/textures/TextureFormat.js";
import { CubeBasicMaterial } from "../../rendercore/materials/CubeBasicMaterial.js";
import { Color4 } from "../../rendercore/math/Color4.js";
import { Color3 } from "../../rendercore/math/Color3.js";
import { Cube } from "../../rendercore/objects/Cube.js";
import { CubeGeometry } from "../../rendercore/objects/CubeGeometry.js";
import { ClearValue } from "../../rendercore/renderers/ClearValue.js";
import { MeshRenderer } from "../../rendercore/renderers/MeshRenderer.js";
import { Size } from "../../rendercore/renderers/Size.js";
import { Viewport } from "../../rendercore/renderers/render_passes/Viewport.js";
import { Time } from "../../rendercore/time/Time.js";
import { roundToDecimal} from "../../js/utils.js";
import * as create from "../../js/objectCreationTemplate.js";
import { CameraManager } from "../../rendercore/cameras/CameraManager.js";
import { loadScene } from "../../js/SceneLoader.js";
import { LightManager } from "../../rendercore/lights/LightManager.js";
import { FullOrbitCameraControls } from "../../rendercore/cameras/FullOrbitCameraControls.js";
import { PointLight } from "../../rendercore/RenderCore.js";
//TODO: clean up imports

export class Control  extends EventTarget{

	#renderer
	#animationFrame
	#scene
	#selected
	#rendererARGS
	#pixelRatio
	#orbit
	#currentCamera
	//#fixedAspect

	constructor() {
		super();
		this.#pixelRatio = window.devicePixelRatio || 1;
		this.main();
		//this.#fixedAspect = false;

	}

	//set renderer(renderer) {this.#renderer = renderer;}
	//get renderer() { return this.#renderer; }
	//get fixedAspect() {return this.#fixedAspect}
	//set fixedAspect(value) {return value ? this.#fixedAspect = value : this.#fixedAspect = !this.#fixedAspect}
	get scene() {return this.#scene;}
	get selected() {return this.#selected}

	selectByIndex(index) {
		this.#selected = [...this.#scene.children][index];
		return this.#selected;
	}

	updateObjectColor(newValue) {
		this.#selected.colorIntensity = new Color4(newValue.r, newValue.g, newValue.b, newValue.a);
	}

	updateObjectTranslation(newValue) {
		this.#selected.position  = new Vector3(newValue.x, newValue.y, newValue.z);
	}

	updateObjectRotation(newValue) {
		const newRotation = new Euler(
			roundToDecimal(newValue.x, 3),  
			roundToDecimal(newValue.y, 3), 
			roundToDecimal(newValue.z, 3), 
			"XYZ");
		this.#selected.rotation = newRotation;

	}

	updateObjectVisibility(newValue) {
		console.log(newValue);
		this.#selected.visible = newValue;
	}
 
	updateObjectScale(newValue) {
		const newScale = new Vector3( newValue.x, newValue.y, newValue.z);
		const scale = this.#selected.scaling;
		this.#selected.scale(newScale.sub(scale))
	}
	
	updateObjectName(newValue) {
		this.#selected.name = newValue;
		this.dispatchEvent(new CustomEvent('updateObjectList', {}));
	}	

	updateObjectDimensions(value, type) {
		console.log(value, type)
		const vect = this.#selected.geometry.baseGeometry.dimensions[0][type];
		console.log(vect)
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
			this.#scene.add(obj);
			//this.#scene.lightManager.setup(this.#scene)
		} else {
			this.#scene.add(obj);
		}
		this.dispatchEvent(new CustomEvent('updateObjectList', {}));

	}
	updateMaterial(value, type) {
		//diffuse, emissive
		if (this.#selected.material) {		
			this.#selected.material[type] = new Color4(value.r, value.g, value.b, value.a)
		}
	}
	deleteSelectedObject() {
		console.log(this.#scene)
		this.#scene.children.delete(this.#selected);
		this.dispatchEvent(new CustomEvent('updateObjectList', {}));

	}

	switchViewport() {
		this.#currentCamera = this.#selected;
		this.#rendererARGS = { scene: this.#scene, camera: this.#currentCamera };

		//console.log("Viewport is now", this.#currentCamera.name)

	}

	updateCamera(value, type) {

		console.log("updating: ", type, "to value ", value)
		this.#selected[type] = value;

		this.dispatchEvent(new CustomEvent('updateUI', {
			detail: {
				value : this.#selected,
			}
		}));
	}

	changeScene(type) {
		console.log(type)
		this.#scene = new Scene();
		loadScene(type, this.#scene);
		this.#rendererARGS = { scene: this.#scene, camera:  this.#currentCamera };
		this.#renderer.render(this.#rendererARGS);
		this.dispatchEvent(new CustomEvent('updateObjectList', {}));
		console.log("loading", this.#scene)

		window.requestAnimationFrame(this.animationFrame()); 
	}

	testFunction() {
		console.log(this.#selected)
		this.dispatchEvent(new CustomEvent('updateObjectList', {}));
	}

	async main(args = {}) {

	const extent = new Extent3D(
		{
			width: Math.floor(document.body.clientWidth * this.#pixelRatio),
			height: Math.floor(document.body.clientHeight * this.#pixelRatio)
		}
	);

	
	this.#scene = new Scene();
	loadScene("cube", this.#scene);

	this.#currentCamera = this.#scene.cameraManager.activeCamera

	console.log(this.#scene.cameraManager.activeCamera)//.position)


	this.#renderer = await new MeshRenderer(
		API.WEBGPU,
		{
			parent: document.body,
			format: TextureFormat.BGRA_8_UNORM,
			alphaMode: CanvasAlphaMode.OPAQUE,

			powerPreference: PowerPreference.HIGH_PERFORMANCE,
			forceFallbackAdapter: false,

			viewport: new Viewport({ x: 0, y: 0, width: extent.width, height: extent.height, minDepth: 0, maxDepth: 1 }),

			size: new Size({ color: new ArrayT2({}, extent), depthStencil: extent }),
			clearValue: new ClearValue({ color: new ArrayT2({}, new Color4(0.5, 0.5, 0.5, 1)), depth: 1, stencil: 0 }),
		}
	);

	this.#rendererARGS = { scene: this.#scene, camera: this.#currentCamera };



	window.addEventListener("resize",  this.resize() );
	window.requestAnimationFrame(this.animationFrame());
}

animationFrame() {
	const time = new Time();

		return (timeCurr) => {
			time.update();

			//console.log(this.#currentCamera.name)
			this.#renderer.render(this.#rendererARGS);
	
			window.requestAnimationFrame(this.animationFrame());
		};
}

resize() {
	const newExtent = new Extent3D();
	const newViewport = new Viewport();
	const newSize = new Size({ color: new ArrayT2({}, newExtent), depthStencil: newExtent })


	return (event) => {
		newExtent.width = Math.floor(this.#renderer.canvas.clientWidth * this.#pixelRatio);
		newExtent.height = Math.floor(this.#renderer.canvas.clientHeight * this.#pixelRatio);
		newExtent.depthOrArrayLayers = 1;

		newViewport.x = 0;
		newViewport.y = 0;
		newViewport.width = newExtent.width;
		newViewport.height = newExtent.height;


		this.#scene.cameraManager.activeCamera.aspect = newExtent.width / newExtent.height;
		this.#renderer.viewport = newViewport;
		this.#renderer.size = newSize;
	};
}
}
