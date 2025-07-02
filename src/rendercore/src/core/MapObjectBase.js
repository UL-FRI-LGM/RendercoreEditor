import { UUID } from '../math/uuid/UUID.js';
import { ErrorT2 } from '../ErrorT2.js';


export class MapObjectBase extends Map {


	static DEFAULT = {
		UUID: new UUID(),

		TYPE: "MapObjectBase",
		NAME: "",
	};


	#uuid;

	#type;
	#name;


	constructor(args = {}, iterable = undefined) {
		super(iterable);
		
		this.uuid = (args.uuid !== undefined) ? args.uuid : MapObjectBase.DEFAULT.UUID.clone({ cloneValue: false });

		this.type = (args.type !== undefined) ? args.type : MapObjectBase.DEFAULT.TYPE;
		this.name = (args.name !== undefined) ? args.name : MapObjectBase.DEFAULT.NAME;
	}


	get uuid() { return this.#uuid }
	set uuid(uuid){ this.#uuid = uuid; }

	get type() { return this.#type; }
	set type(type) { this.#type = type; }
	get name() { return this.#name; }
	set name(name) { this.#name = name; }


	copy(mapObjectBase, { boolCopyUUID = false } = { }, { argsCopyUUID = { copyValue: false } } = { }) {
		if (!(mapObjectBase instanceof MapObjectBase)) ErrorT2.throw(ErrorT2.MESSAGE.NOT_IMPLEMENTED, { cause: this.type });

		this.uuid = boolCopyUUID ? this.uuid.copy(mapObjectBase.uuid, argsCopyUUID) : this.uuid;

		this.type = mapObjectBase.type;
		this.name = mapObjectBase.name;


		return this;
	}
	clone({ boolCloneUUID = false } = { }, { argsCloneUUID = { cloneValue: false } } = { }) {
		return new MapObjectBase(
			{
				uuid: boolCloneUUID ? ((this.uuid === Object(this.uuid)) ? this.uuid.clone(argsCloneUUID) : this.uuid) : undefined,

				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
			}
		);
	}
};
