import { ObjectBase } from "../core/ObjectBase.js";
import { MapT2 } from "../core/MapT2.js";
import { RenderArray } from "./RenderArray.js";
import { OpaqueRenderArray } from "./OpaqueRenderArray.js";
import { TransparentRenderArray } from "./TransparentRenderArray.js";
import { Mesh } from "../objects/mesh/Mesh.js";


export class RenderArrayManager extends ObjectBase {


	static DEFAULT = {
		TYPE: "RenderArrayManager",
		NAME: "",

		RENDER_ARRAYS: new MapT2(
			{
				name: "render array manager render arrays",
			},
			[
				["skyboxes", new OpaqueRenderArray()],
				["lights", new RenderArray()],
				["opaqueObjects", new OpaqueRenderArray()],
				["transparentObjects", new TransparentRenderArray()],
				["boundingSphereFrames", new OpaqueRenderArray()],
				["boundingBoxFrames", new OpaqueRenderArray()],
				["vertexNormals", new OpaqueRenderArray()],
			]
		),

		SKYBOXES: new OpaqueRenderArray(),
		LIGHTS: new RenderArray(),
		OPAQUE_OBJECTS: new OpaqueRenderArray(),
		TRANSPARENT_OBJECTS: new TransparentRenderArray(),
		BOUNDING_SPHERE_FRAMES: new OpaqueRenderArray(),
		BOUNDING_BOX_FRAMES: new OpaqueRenderArray(),
		VERTEX_NORMALS: new OpaqueRenderArray(),
	};


	#renderArrays;

	#skyboxes;
	#lights;
	#opaqueObjects;
	#transparentObjects;
	#boundingSphereFrames;
	#boundingBoxFrames;
	#vertexNormals;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : RenderArrayManager.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : RenderArrayManager.DEFAULT.NAME,
			}
		);

		this.renderArrays = (args.renderArrays !== undefined) ? args.renderArrays : RenderArrayManager.DEFAULT.RENDER_ARRAYS.clone();

		this.skyboxes = (args.skyboxes !== undefined) ? args.skyboxes : RenderArrayManager.DEFAULT.SKYBOXES.clone();
		this.lights = (args.lights !== undefined) ? args.lights : RenderArrayManager.DEFAULT.LIGHTS.clone();
		this.opaqueObjects = (args.opaqueObjects !== undefined) ? args.opaqueObjects : RenderArrayManager.DEFAULT.OPAQUE_OBJECTS.clone();
		this.transparentObjects = (args.transparentObjects !== undefined) ? args.transparentObjects : RenderArrayManager.DEFAULT.TRANSPARENT_OBJECTS.clone();
		this.boundingSphereFrames = (args.boundingSphereFrames !== undefined) ? args.boundingSphereFrames : RenderArrayManager.DEFAULT.BOUNDING_SPHERE_FRAMES.clone();
		this.boundingBoxFrames = (args.boundingBoxFrames !== undefined) ? args.boundingBoxFrames : RenderArrayManager.DEFAULT.BOUNDING_BOX_FRAMES.clone();
		this.vertexNormals = (args.vertexNormals !== undefined) ? args.vertexNormals : RenderArrayManager.DEFAULT.VERTEX_NORMALS.clone();
	}


	get renderArrays(){ return this.#renderArrays; }
	set renderArrays(renderArrays) {
		this.#renderArrays = renderArrays;

		this.skyboxes = renderArrays.get("skyboxes");
		this.lights = renderArrays.get("lights");
		this.opaqueObjects = renderArrays.get("opaqueObjects");
		this.transparentObjects = renderArrays.get("transparentObjects");
		this.boundingSphereFrames = renderArrays.get("boundingSphereFrames");
		this.boundingBoxFrames = renderArrays.get("boundingBoxFrames");
		this.vertexNormals = renderArrays.get("vertexNormals");
	}

	get skyboxes() { return this.#skyboxes; }
	set skyboxes(skyboxes) {
		this.#skyboxes = skyboxes;

		this.renderArrays.set("skyboxes", skyboxes);
	}
	get lights() { return this.#lights; }
	set lights(lights) {
		this.#lights = lights;

		this.renderArrays.set("lights", lights);
	}
	get opaqueObjects() { return this.#opaqueObjects; }
	set opaqueObjects(opaqueObjects) {
		this.#opaqueObjects = opaqueObjects;

		this.renderArrays.set("opaqueObjects", opaqueObjects);
	}
	get transparentObjects() { return this.#transparentObjects; }
	set transparentObjects(transparentObjects) {
		this.#transparentObjects = transparentObjects;

		this.renderArrays.set("transparentObjects", transparentObjects);
	}
	get boundingSphereFrames() { return this.#boundingSphereFrames; }
	set boundingSphereFrames(boundingSphereFrames) {
		this.#boundingSphereFrames = boundingSphereFrames;

		this.renderArrays.set("boundingSphereFrames", boundingSphereFrames);
	}
	get boundingBoxFrames() { return this.#boundingBoxFrames; }
	set boundingBoxFrames(boundingBoxFrames) {
		this.#boundingBoxFrames = boundingBoxFrames;

		this.renderArrays.set("boundingBoxFrames", boundingBoxFrames);
	}
	get vertexNormals() { return this.#vertexNormals; }
	set vertexNormals(vertexNormals) {
		this.#vertexNormals = vertexNormals;

		this.renderArrays.set("vertexNormals", vertexNormals);
	}


	clearAll() {
		for (const [key, renderArray] of this.renderArrays) {
			renderArray.clear();
		}
	}

	#objectInFrustum(camera, object) {
		// return (object.frustumCulled) ? camera.frustum.intersectsSphere(object.bounding.sphere.global.worldspace) : true;
		return !object.frustumCulled || camera.frustum.intersectsSphere(object.bounding.sphere.global.worldspace);
	}
	#fillRenderArray(object) {
		if (object.material.transparent) {
			this.transparentObjects.addLast(object);
		} else {
			this.opaqueObjects.addLast(object);
		}

		if (object.helper.boundingSphereFrame.enabled) {
			this.boundingSphereFrames.addLast(object.helper.boundingSphereFrame.object);
		}
		if (object.helper.boundingBoxFrame.enabled) {
			this.boundingBoxFrames.addLast(object.helper.boundingBoxFrame.object);
		}
		if (object.helper.vertexNormal.enabled) {
			this.vertexNormals.addLast(object.helper.vertexNormal.object);
		}
	}
	fill(object, camera) {
		if (object.visible && this.#objectInFrustum(camera, object)) {
			if (object instanceof Mesh) {
				this.#fillRenderArray(object);
			}


			// Recursively descend through children
			for (const child of object.children) {
				this.fill(child, camera);
			}
		}
	}

	sort(camera) {
		this.renderArrays.forEach((v_renderArray, k_renderArray) => { v_renderArray.sort(camera); });
	} 
};
