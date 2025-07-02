import { UUID } from "../math/uuid/UUID.js";
import { ErrorT2 } from "../ErrorT2.js";
import { Division } from "../Division.js";


export class ObjectBase extends Object {


	static DEFAULT = {
		UUID: new UUID(),

		TYPE: "ObjectBase",
		NAME: "",
		LABEL: "",
		DIVISION: Division.ALL,
	};


	#uuid;

	#type;
	#name;
	#label;
	#division;


	constructor(args = {}) {
		super();

		this.uuid = (args.uuid !== undefined) ? args.uuid : ObjectBase.DEFAULT.UUID.clone({ cloneValue: false });

		this.type = (args.type !== undefined) ? args.type : ObjectBase.DEFAULT.TYPE;
		this.name = (args.name !== undefined) ? args.name : ObjectBase.DEFAULT.NAME;
		this.label = (args.label !== undefined) ? args.label : ObjectBase.DEFAULT.LABEL;
		this.division = (args.division !== undefined) ? args.division : ObjectBase.DEFAULT.DIVISION
	}


	get uuid() { return this.#uuid }
	set uuid(uuid){ this.#uuid = (uuid instanceof UUID) ? uuid : ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type }); }

	get type() { return this.#type; }
	set type(type) { this.#type = (typeof type == "string") ? type : ErrorT2.throw(ErrorT2.MESSAGE.WRONG_TYPE, { cause: this.type }); }
	get name() { return this.#name; }
	set name(name) { this.#name = (typeof name == "string") ? name : ErrorT2.throw(ErrorT2.MESSAGE.WRONG_TYPE, { cause: this.type }); }
	get label() { return this.#label; }
	set label(label) { this.#label = (typeof label == "string") ? label : ErrorT2.throw(ErrorT2.MESSAGE.WRONG_TYPE, { cause: this.type });  }
	get division() { return this.#division; }
	set division(division) { this.#division = (division instanceof Division) ? division : ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type }); }


	copy(object, { boolCopyUUID = false } = { }, { argsCopyUUID = { copyValue: false } } = { }) {
		if (!(object instanceof ObjectBase)) ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type });

		this.uuid = boolCopyUUID ? this.uuid.copy(object.uuid, argsCopyUUID) : this.uuid;

		this.type = object.type;
		this.name = object.name;
		this.label = object.label;
		this.division = object.division;


		return this;
	}
	// clone() {
	// 	return new ObjectBase().copy(this);
	// }
	clone({ boolCloneUUID = false } = { }, { argsCloneUUID = { cloneValue: false } } = { }) {
		return new ObjectBase(
			{
				uuid: boolCloneUUID ? this.uuid.clone(argsCloneUUID) : undefined,

				type: this.type,
				name: this.name,
				label: this.label,
				division: this.division,
			}
		);
	}
};
