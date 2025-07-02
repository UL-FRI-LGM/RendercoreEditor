import { UUID } from '../math/uuid/UUID.js';
import { ErrorT2 } from '../ErrorT2.js';


export class ArrayObjectBase extends Array {


	static DEFAULT = {
		UUID: new UUID(),

		TYPE: "ArrayObjectBase",
		NAME: "",
	};


	#uuid;

	#type;
	#name;


	constructor(args = {}, ...rest) {
		super(...rest);
		
		this.uuid = (args.uuid !== undefined) ? args.uuid : ArrayObjectBase.DEFAULT.UUID.clone({ cloneValue: false });

		this.type = (args.type !== undefined) ? args.type : ArrayObjectBase.DEFAULT.TYPE;
		this.name = (args.name !== undefined) ? args.name : ArrayObjectBase.DEFAULT.NAME;
	}


	get uuid() { return this.#uuid }
	set uuid(uuid){ this.#uuid = uuid; }

	get type() { return this.#type; }
	set type(type) { this.#type = type; }
	get name() { return this.#name; }
	set name(name) { this.#name = name; }


	copy(arrayObjectBase, { boolCopyUUID = false } = { }, { argsCopyUUID = { copyValue: false } } = { }) {
		if (!(arrayObjectBase instanceof ArrayObjectBase)) ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type });

		this.uuid = boolCopyUUID ? this.uuid.copy(arrayObjectBase.uuid, argsCopyUUID) : this.uuid;

		this.type = arrayObjectBase.type;
		this.name = arrayObjectBase.name;


		return this;
	}
	clone({ boolCloneUUID = false } = { }, { argsCloneUUID = { cloneValue: false } } = { }) {
		return new ArrayObjectBase(
			{
				uuid: boolCloneUUID ? ((this.uuid === Object(this.uuid)) ? this.uuid.clone(argsCloneUUID) : this.uuid) : undefined,

				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
			}
		);
	}
};
