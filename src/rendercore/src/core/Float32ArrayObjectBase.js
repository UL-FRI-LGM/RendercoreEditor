import { ErrorT2 } from '../ErrorT2.js';
import { UUID } from '../math/uuid/UUID.js';


export class Float32ArrayObjectBase extends Float32Array {


	static DEFAULT = {
		UUID: new UUID(),

		TYPE: "Float32ArrayObjectBase",
		NAME: "",
	};


	#uuid;

	#type;
	#name;


	constructor(args = {}, ...rest) {
		super(...rest);
		
		this.uuid = (args.uuid !== undefined) ? args.uuid : Float32ArrayObjectBase.DEFAULT.UUID.clone({ cloneValue: false });

		this.type = (args.type !== undefined) ? args.type : Float32ArrayObjectBase.DEFAULT.TYPE;
		this.name = (args.name !== undefined) ? args.name : Float32ArrayObjectBase.DEFAULT.NAME;
	}


	get uuid() { return this.#uuid }
	set uuid(uuid){ this.#uuid = uuid; }

	get type() { return this.#type; }
	set type(type) { this.#type = type; }
	get name() { return this.#name; }
	set name(name) { this.#name = name; }


	copy(float32ArrayObjectBase, { boolCopyUUID = false } = { }, { argsCopyUUID = { copyValue: false } } = { }) {
		if (!(float32ArrayObjectBase instanceof Float32ArrayObjectBase)) ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type });

		this.uuid = boolCopyUUID ? this.uuid.copy(float32ArrayObjectBase.uuid, argsCopyUUID) : this.uuid;

		this.type = float32ArrayObjectBase.type;
		this.name = float32ArrayObjectBase.name;


		return this;
	}
	clone({ boolCloneUUID = false } = { }, { argsCloneUUID = { cloneValue: false } } = { }) {
		return new Float32ArrayObjectBase(
			{
				uuid: boolCloneUUID ? ((this.uuid === Object(this.uuid)) ? this.uuid.clone(argsCloneUUID) : this.uuid) : undefined,

				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
			}
		);
	}
};
