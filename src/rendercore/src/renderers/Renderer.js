import { ObjectBase } from "../core/ObjectBase.js";


export class Renderer extends ObjectBase {


	static DEFAULT = {
		NAME: "",
		TYPE: "Renderer",
	};


	#api;
	// #contextManager;
	// #canvasManager;


	constructor(api, args) {
		super(
			{
				...args,
				name: (args.name !== undefined) ? args.name : Renderer.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : Renderer.DEFAULT.TYPE,
			}
		);

		this.api = api;
		// this.contextManager = await new ContextManager(api, args);
		// this.canvasManager = new CanvasManager(this.contextManager.context, args.canvasDescriptor);
	}


	get api() { return this.#api; }
	set api(api) { this.#api = api; }
	// get contextManager() { return this.#contextManager; }
	// set contextManager(contextManager) { this.#contextManager = contextManager; }
	// get canvasManager() { return this.#canvasManager; }
	// set canvasManager(canvasManager) { this.#canvasManager = canvasManager; }
};