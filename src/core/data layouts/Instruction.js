import { ObjectBase } from "../ObjectBase.js";


export class Instruction extends ObjectBase {


	static DEFAULT = {
		NAME: "",
		TYPE: "Instruction",

		LABEL: "",
	};


	#label;


	constructor(args = {}) {
        super(
			{
				...args,
				
                name: (args.name !== undefined) ? args.name : Instruction.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : Instruction.DEFAULT.TYPE,
            }
		);

		this.label = (args.label !== undefined) ? args.label : Instruction.DEFAULT.LABEL;
	}


	get label() {return this.#label; }
	set label(label) { this.#label = label; }
};