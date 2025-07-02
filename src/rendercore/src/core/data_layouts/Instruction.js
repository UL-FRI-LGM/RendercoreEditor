import { ObjectBase } from "../ObjectBase.js";
import { ErrorT2 } from "../../ErrorT2.js";


export class Instruction extends ObjectBase {


	static DEFAULT = {
		TYPE: "Instruction",
		NAME: "",
		LABEL: "",
		DIVISION: ObjectBase.DEFAULT.DIVISION,
	};


	constructor(args = {}) {
        super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : Instruction.DEFAULT.TYPE,
                name: (args.name !== undefined) ? args.name : Instruction.DEFAULT.NAME,
				label: (args.label !== undefined) ? args.label : Instruction.DEFAULT.LABEL,
				division: (args.division !== undefined) ? args.division : Instruction.DEFAULT.DIVISION,
            }
		);
	}


	copy(instruction) {
		if (!(instruction instanceof Instruction)) ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type });

		super.copy(instruction);


		return this;
	}
	clone() {
		return new Instruction(Object.assign(super.clone, {}));
	}
};
