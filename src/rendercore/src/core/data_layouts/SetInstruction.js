import { Instruction } from "./Instruction.js";
import { ResourceBinding } from "./ResourceBinding.js";
import { Source } from "./Source.js";
import { Destination } from "./Destination.js";
import { Float32ArrayT2 } from "../Float32ArrayT2.js";
import { Layout } from "./Layout.js";
import { ErrorT2 } from "../../ErrorT2.js";


export class SetInstruction extends Instruction { //set (write) instruction


	static DEFAULT = {
		NAME: "",
		TYPE: "SetInstruction",

		LABEL: "UPDATE",

		NUMBER: null,
		TARGET: ResourceBinding.TARGET.EXTERNAL,

		SOURCE: new Source(
			{
				arrayBuffer: new Float32ArrayT2({}),
				layout: new Layout(
					{
						offset: 0
					}
				)
			}
		),
		DESTINATION: new Destination(
			{
				buffer: null,
				layout: new Layout(
					{
						offset: 0
					}
				)
			}
		),
		SIZE: 0,
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


	copy(setInstruction) {
		if (!(setInstruction instanceof SetInstruction)) ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type });

		super.copy(setInstruction);

		this.number = setInstruction.number;
		this.target = setInstruction.target;

		this.source.copy(setInstruction.source);
		this.destination.copy(setInstruction.destination);
		this.size = setInstruction.size;


		return this;
	}
	clone() {
		return new SetInstruction(
			Object.assign(
				super.clone(),
				{
					number: this.number,
					target: this.target,

					source: this.source.clone(),
					destination: this.destination.clone(),
					size: this.size,
				}
			)
		);
	}
};