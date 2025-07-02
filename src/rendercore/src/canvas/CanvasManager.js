import { ManagerBase } from "../core/ManagerBase.js";
import { MapT2 } from "../core/MapT2.js";
import { Division } from "../Division.js";
import { ErrorT2 } from "../ErrorT2.js";
import { Canvas } from "./Canvas.js";


export class CanvasManager extends ManagerBase { //RC canvas manager


	static DEFAULT = {
		TYPE: "CanvasManager",
		NAME: "",
		LABEL: "",
		DIVISION: Division.RENDER_CORE,

		ENTITIES: new MapT2({ label: `${CanvasManager.name}` }),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : CanvasManager.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : CanvasManager.DEFAULT.NAME,
				label: (args.label !== undefined) ? args.label : CanvasManager.DEFAULT.LABEL,
				division: (args.division !== undefined) ? args.division : CanvasManager.DEFAULT.DIVISION,

				entities: (args.entities !== undefined) ? args.entities : CanvasManager.DEFAULT.ENTITIES.clone(),
			}
		);
	}


	static #createCanvas(descriptor, canvas) {
		return new Canvas({}, descriptor, canvas);
	}
	createCanvas(descriptor) {
		return this.entities.has(descriptor) ? ErrorT2.throw(ErrorT2.MESSAGE.HAS.TRUE, { cause: this.createCanvas.name }) : CanvasManager.#createCanvas(descriptor, undefined);
	}
	static #updateCanvas(descriptor, canvas) {
		return descriptor.isDirty() ? canvas.update(descriptor) : canvas; 
    }
	updateCanvas(descriptor) {
		return this.entities.has(descriptor) ? CanvasManager.#updateCanvas(descriptor, this.entities.get(descriptor)) : ErrorT2.throw(ErrorT2.MESSAGE.HAS.FALSE, { cause: this.updateCanvas.name });
    }
	static #getCanvas(descriptor, canvas) {
		return canvas;
	}
    getCanvas(descriptor) {
		return this.entities.has(descriptor) ? CanvasManager.#getCanvas(descriptor, this.entities.get(descriptor)) : ErrorT2.throw(ErrorT2.MESSAGE.HAS.FALSE, { cause: this.getCanvas.name });
	}
	#setCanvas(descriptor, canvas) {
		return this.entities.set(descriptor, canvas);
	}
	setCanvas(descriptor, canvas) {
		return this.entities.has(descriptor) ? ErrorT2.throw(ErrorT2.MESSAGE.HAS.TRUE, { cause: this.setCanvas.name }) : this.#setCanvas(descriptor, canvas);
	}
	#destroyCanvas(descriptor, canvas) {
        return this.entities.delete(descriptor) && canvas.destroy();
	}
    destroyCanvas(descriptor) {
		return this.entities.has(descriptor) ? this.#destroyCanvas(descriptor, this.entities.get(descriptor)) : ErrorT2.throw(ErrorT2.MESSAGE.HAS.FALSE, { cause: this.destroyCanvas.name });
    }
};
