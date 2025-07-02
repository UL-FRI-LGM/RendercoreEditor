import { ErrorT2 } from '../ErrorT2.js';
import { UUID } from '../math/uuid/UUID.js';


export class Uint32ArrayObjectBase extends Uint32Array {


	static DEFAULT = {
		UUID: new UUID(),

		TYPE: "Uint32ArrayObjectBase",
		NAME: "",
	};


	#uuid;

	#type;
	#name;


	constructor(args = {}, ...rest) {
		super(...rest);
		
		this.uuid = (args.uuid !== undefined) ? args.uuid : Uint32ArrayObjectBase.DEFAULT.UUID.clone({ cloneValue: false });

		this.type = (args.type !== undefined) ? args.type : Uint32ArrayObjectBase.DEFAULT.TYPE;
		this.name = (args.name !== undefined) ? args.name : Uint32ArrayObjectBase.DEFAULT.NAME;
	}


	get uuid() { return this.#uuid }
	set uuid(uuid){ this.#uuid = uuid; }

	get type() { return this.#type; }
	set type(type) { this.#type = type; }
	get name() { return this.#name; }
	set name(name) { this.#name = name; }


	copy(uint32ArrayObjectBase, { boolCopyUUID = false } = { }, { argsCopyUUID = { copyValue: false } } = { }) {
		if (!(uint32ArrayObjectBase instanceof Uint32ArrayObjectBase)) ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type });

		this.uuid = boolCopyUUID ? this.uuid.copy(uint32ArrayObjectBase.uuid, argsCopyUUID) : this.uuid;

		this.type = uint32ArrayObjectBase.type;
		this.name = uint32ArrayObjectBase.name;


		return this;
	}
	clone({ boolCloneUUID = false } = { }, { argsCloneUUID = { cloneValue: false } } = { }) {
		return new Uint32ArrayObjectBase(
			{
				uuid: boolCloneUUID ? ((this.uuid === Object(this.uuid)) ? this.uuid.clone(argsCloneUUID) : this.uuid) : undefined,

				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
			}
		);
	}
};
