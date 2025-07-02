import { Cube } from "../rendercore/src/objects/cube/Cube.js";
import { CubeBasicMaterial } from "../rendercore/src/materials/CubeBasicMaterial.js";
import { Color4 } from "../rendercore/src/math/Color4.js";
import { PointLight, Sphere, SpotLight, AmbientLight, Vector3, Vector4} from "../rendercore/src/RenderCore.js";
import { Line } from "../rendercore/src/objects/line/Line.js";
import { Extent3D } from "../rendercore/src/core/RC/textures/Extent3D.js";
import { LineGeometry } from "../rendercore/src/objects/line/LineGeometry.js";
import { LineBasicMaterial } from "../rendercore/src/materials/LineBasicMaterial.js";
import { CubeGeometry } from "../rendercore/src/objects/cube/CubeGeometry.js";
import { SphereFrameGeometry } from "../rendercore/src/objects/sphere_frame/SphereFrameGeometry.js";
import { SphereFrameBasicMaterial } from "../rendercore/src/materials/SphereFrameBasicMaterial.js";
import { Quad} from "../rendercore/src/objects/quad/Quad.js"
import { QuadGeometry } from "../rendercore/src/objects/quad/QuadGeometry.js";
import { QuadBasicMaterial } from "../rendercore/src/materials/QuadBasicMaterial.js";
import { Euler } from "../rendercore/src/RenderCore.js";
import { PerspectiveCamera } from "../rendercore/src/RenderCore.js";

export function object(type) {
	console.log("Making an object of type", type)
	switch(type) {
		case "cube":
			return cube();
		case "sphere":
			return sphere();
		case "quad":
			return quad();
		case "line":
			return line();
		case "box":
			return box();
		case "ambient":
			return ambient();
		case "spot":
			return spot();
		case "point":
			return point();
		case "perspective":
			return perspective();
		case "orthographic":
			return orthographic();
		case "grid":
			return grid();
		default:
			return cube();
	}
	//default is cube
}

function cube() {
	const newFloat = Math.random()
	const material = new CubeBasicMaterial(
		{
			emissive: new Color4(newFloat, 1, 1, 1/32),
			diffuse: new Color4(1, 1, 1, 1)
		}
	)
    return new Cube(
		{
			geometry: new CubeGeometry(),
			material: material,

		}
	);
}

function sphere() {
	return new Sphere(
		{
			geometry: new SphereFrameGeometry (),
			material: new SphereFrameBasicMaterial(
				{
					emissive: new Color4(1, 1, 1, 1/32),
					diffuse: new Color4(1, 1, 1, 1),
				}
			) 
		}
	)
}

/* function box() {
	const material = new BoxBasicMaterial(
		{
			emissive: new Color4(1, 1, 1, 1/32),
			diffuse: new Color4(1, 1, 1, 1)
		}
	)
    return new Box(
		{
			geometry: new BoxGeometry(
				{
					baseGeometry: {
						positions: [ new Vector3(0, 0, 0) ],
						dimensions: [{ min: new Vector3(-1, -1, -1), max: new Vector3(+1, +1, +1)}],
					}
				}
			),
			material: material,

		}
	);
} */


function quad() {
	let obj = new Quad({
		
		geometry: new QuadGeometry(),
		material: new QuadBasicMaterial(
			{
				emissive: new Color4(1, 0.7, 1, 1/32),
				diffuse: new Color4(1, 0.95, 1, 1)
			}
		),
	
})	
	obj.position = new Vector3(0,-1,0)
	obj.scaling = new Vector3(5,5,1)
	obj.rotation = new Euler (Math.PI/2, 0, 0)

	return obj
}

function spot() {
	const l = new SpotLight(
		{
			colorIntensity: new Color4(1, 1, 1, 1/8),
			direction: new Vector3(1, 0, 0),
			//innerCutoff: 0.8,
			//outerCutoff: 0.9,
		}
	)
	l.position = new Vector3(0, 0, 0);
	return l;
}

function ambient() {
	const l = new AmbientLight(
		{
			colorIntensity: new Color4(1, 1, 1, 1/8),
		}
	);
	l.position = new Vector3(0, 0, 0);
	return l;

}
function line() {
	return new Line(
		{		
			geometry: new LineGeometry(),
			material: new LineBasicMaterial(
				{
					emissive: new Color4(1, 1, 1, 1),
					diffuse: new Color4(Math.random(), Math.random(), Math.random(), 1),
				}
			),
		}
	)
}
function point() {
	const pl = new PointLight(
		{
			colorIntensity: new Color4(0.5, 0.5, 0.5, 0.5),
			decayDistance: new Vector4(1.0, 0.01, 0.0001, 0.0),
		}
	);
	pl.position = new Vector3(0, 0, +2)
	//pl.renderOrder = 1;
	return pl;
}

function perspective() {
	const pixelRatio = window.devicePixelRatio || 1;

	const extent = new Extent3D(
		{
			width: Math.floor(document.body.clientWidth * pixelRatio),
			height: Math.floor(document.body.clientHeight * pixelRatio)
		}
	);
	const camera = new PerspectiveCamera(
		{
			fov: 90,
			aspect: extent.width / extent.height,
			near: 0.125,
			far: 128.0
		}
	);
	camera.position = new Vector3(0, 2, 8);
	return camera 
}

function orthographic() {
	
}

function grid() {
	const line = new Line(
		{		
			geometry: new LineGeometry(
				{
					indexed: true,
					baseGeometry: {
						positions: [ new Vector3(-30,0,0), new Vector3(+30.0,0,0)],
					},
				},
			),
		}
	)
	const line2 = new Line();
	return line2;
}