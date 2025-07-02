import { UUID } from '../math/uuid/UUID.js';
import { ErrorT2 } from '../ErrorT2.js';


export class SetObjectBase extends Set {


	static DEFAULT = {
		UUID: new UUID(),

		TYPE: "SetObjectBase",
		NAME: "",
	};


	#uuid;

	#type;
	#name;


	constructor(args = {}, iterable = undefined) {
		super(iterable);
		
		this.uuid = (args.uuid !== undefined) ? args.uuid : SetObjectBase.DEFAULT.UUID.clone({ cloneValue: false });

		this.type = (args.type !== undefined) ? args.type : SetObjectBase.DEFAULT.TYPE;
		this.name = (args.name !== undefined) ? args.name : SetObjectBase.DEFAULT.NAME;
	}


	get uuid() { return this.#uuid }
	set uuid(uuid){ this.#uuid = uuid; }

	get type() { return this.#type; }
	set type(type) { this.#type = type; }
	get name() { return this.#name; }
	set name(name) { this.#name = name; }


	copy(setObjectBase, { boolCopyUUID = false } = { }, { argsCopyUUID = { copyValue: false } } = { }) {
		if (!(setObjectBase instanceof SetObjectBase)) ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type });

		this.uuid = boolCopyUUID ? this.uuid.copy(setObjectBase.uuid, argsCopyUUID) : this.uuid;

		this.type = setObjectBase.type;
		this.name = setObjectBase.name;


		return this;
	}
	clone({ boolCloneUUID = false } = { }, { argsCloneUUID = { cloneValue: false } } = { }) {
		return new SetObjectBase(
			{
				uuid: boolCloneUUID ? ((this.uuid === Object(this.uuid)) ? this.uuid.clone(argsCloneUUID) : this.uuid) : undefined,

				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
			}
		);
	}
};
