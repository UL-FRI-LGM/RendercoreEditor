import { Instruction } from "./Instruction.js";
import { ResourceBinding } from "./ResourceBinding.js";


export class SetInstruction extends Instruction { //set (write) instruction


	static DEFAULT = {
		NAME: "",
		TYPE: "SetInstruction",

		LABEL: "UPDATE",

		NUMBER: null,
		TARGET: ResourceBinding.TARGET.EXTERNAL,

		SOURCE: {},
		DESTINATION: {},
		SIZE: {},
	};


	#number;
	#target;

	#source;
	#destination;
	#size;


	constructor(args = {}) {
        super(
			{
				...args,
				
                name: (args.name !== undefined) ? args.name : SetInstruction.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : SetInstruction.DEFAULT.TYPE,

				label: (args.label !== undefined) ? args.label : SetInstruction.DEFAULT.LABEL,
			}
		);

		this.number = (args.number !== undefined) ? args.number : SetInstruction.DEFAULT.NUMBER;
		this.target = (args.target !== undefined) ? args.target : SetInstruction.DEFAULT.TARGET;
		
		this.source = (args.source !== undefined) ? args.source : SetInstruction.DEFAULT.SOURCE;
		this.destination = (args.destination !== undefined) ? args.destination : SetInstruction.DEFAULT.DESTINATION;
		this.size = (args.size !== undefined) ? args.size : SetInstruction.DEFAULT.SIZE;
	}


	get number() { return this.#number; }
	set number(number) { this.#number = number; }
	get target() { return this.#target; }
	set target(target) { this.#target = target; }

	get source() { return this.#source; }
	set source(source) { this.#source = source; }
	get destination() { return this.#destination; }
	set destination(destination) { this.#destination = destination; }
	get size() { return this.#size; }
	set size(size) { this.#size = size; }
};