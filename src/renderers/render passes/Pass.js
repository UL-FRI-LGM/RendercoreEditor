import { ObjectBase } from "../../core/ObjectBase.js";


export class Pass extends ObjectBase { //pass base


	static DEFAULT = {
		NAME: "",
		TYPE: "Pass",

		INITIALIZED: false,
		EXTERNAL: {
			INITIALIZE: (args = {}) => { return true; },
			PREPROCESS: (args = {}) => { return null; },
			PROCESS: (args = {}) => { return null; },
			POSTPROCESS: (args = {}) => { return null; },
		},
	};


	#initialized;
	#initializeExternal;
	#preprocessExternal;
	#processExternal;
	#postprocessExternal;


	constructor(args = {}) {
		super(
			{
				...args,
				
				name: (args.name !== undefined) ? args.name : Pass.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : Pass.DEFAULT.TYPE,
			}
		);

		this.initialized = (args.initialized !== undefined) ? args.initialized : Pass.DEFAULT.INITIALIZED;
		this.initializeExternal = (args.initializeExternal !== undefined) ? args.initializeExternal : Pass.DEFAULT.EXTERNAL.INITIALIZE;
		this.preprocessExternal = (args.preprocessExternal !== undefined) ? args.preprocessExternal : Pass.DEFAULT.EXTERNAL.PREPROCESS;
		this.processExternal = (args.processExternal !== undefined) ? args.processExternal : Pass.DEFAULT.EXTERNAL.PROCESS;
		this.postprocessExternal = (args.postprocessExternal !== undefined) ? args.postprocessExternal : Pass.DEFAULT.EXTERNAL.POSTPROCESS;
	}


	get initialized() { return this.#initialized; }
	set initialized(initialized) { this.#initialized = initialized; }
	get initializeExternal() { return this.#initializeExternal; }
	set initializeExternal(initializeExternal) { this.#initializeExternal = initializeExternal; }
	get preprocessExternal() { return this.#preprocessExternal; }
	set preprocessExternal(preprocessExternal) { this.#preprocessExternal = preprocessExternal; }
	get processExternal() { return this.#processExternal; }
	set processExternal(processExternal) { this.#processExternal = processExternal; }
	get postprocessExternal() { return this.#postprocessExternal; }
	set postprocessExternal(postprocessExternal) { this.#postprocessExternal = postprocessExternal; }


	initializeInternal(args = {}) { return { ...args, ...this.initializeExternal(args) }; }
	preprocessInternal(args = {}) { return { ...args, ...this.preprocessExternal(args) }; }
	processInternal(args = {}) { return { ...args, ...this.processExternal(args) }; }
	postprocessInternal(args = {}) { return { ...args, ...this.postprocessExternal(args) }; }
	processMain(args = {}) {
		// INITIALIZE
		if (!this.initialized) {
			this.initializeInternal(args);
			this.initialized = true;
		}

		// PREPROCESS
		const argsOut1 = this.preprocessInternal(args);

		// PROCESS
		const argsOut2 = this.processInternal(argsOut1);

		// POSTPROCESS
		const argsOut3 = this.postprocessInternal(argsOut2);
	 }
};