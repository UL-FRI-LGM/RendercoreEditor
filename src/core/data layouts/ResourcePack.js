import { ObjectBase } from "../ObjectBase.js";
import { BindGroupDescriptor } from "../RC/resource binding/BindGroupDescriptor.js";
import { BindGroupLayoutDescriptor } from "../RC/resource binding/BindGroupLayoutDescriptor.js";
import { UniformGroupDescriptor } from "./UniformGroupDescriptor.js";


export class ResourcePack extends ObjectBase {


	static DEFAULT = {
		NAME: "",
		TYPE: "ResourcePack",

		MAX_LOCATION_GROUPS: 1,
		MAX_BINDING_GROUPS: 4,

		RESOURCE_LOCATIONS: new Map(),
		RESOURCE_BINDING_GROUPS: new Map(),
	};


	#maxLocationGroups;
	#maxBindingGroups;

    #resourceLocations = new Map();
	#resourceBindingGroups = new Map();


	constructor(args = {}) {
        super(
			{
				...args,

                name: (args.name !== undefined) ? args.name : ResourcePack.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : ResourcePack.DEFAULT.TYPE,
            }
		);


		this.maxLocationGroups = (args.maxLocationGroups !== undefined) ? args.maxLocationGroups : ResourcePack.DEFAULT.MAX_LOCATION_GROUPS;
		this.maxBindingGroups = (args.maxBindingGroups !== undefined) ? args.maxBindingGroups : ResourcePack.DEFAULT.MAX_BINDING_GROUPS;

		this.resourceLocations = (args.resourceLocations !== undefined) ? args.resourceLocations : new Map(ResourcePack.DEFAULT.RESOURCE_LOCATIONS);
		this.resourceBindingGroups = (args.resourceBindingGroups !== undefined) ? args.resourceBindingGroups : this.#assembleResourceBindingGroups();
	}


	get maxLocationGroups() { return this.#maxLocationGroups; }
	set maxLocationGroups(maxLocationGroups) { this.#maxLocationGroups = maxLocationGroups; }
	get maxBindingGroups() { return this.#maxBindingGroups; }
	set maxBindingGroups(maxBindingGroups) { this.#maxBindingGroups = maxBindingGroups; }

	get resourceLocations() { return this.#resourceLocations; }
	set resourceLocations(resourceLocations) { this.#resourceLocations = resourceLocations; }
	get resourceBindingGroups() { return this.#resourceBindingGroups; }
	set resourceBindingGroups(resourceBindingGroups) { this.#resourceBindingGroups = resourceBindingGroups; }


	#assembleResourceLocationGroups() {//TODO currently not in use
		const resourceLocationGroups = new Map();
		
		for (let i = 0; i < this.maxLocationGroups; i++) {
			const resourceLocationGroup = null


			resourceLocationGroups.set(i, resourceLocationGroup);
		}


		return resourceLocationGroups;
	}
	#assembleResourceBindingGroups() {
		const resourceBindingGroups = new Map();

		for (let i = 0; i < this.maxBindingGroups; i++) {
			const resourceBindingGroup = new UniformGroupDescriptor(
				{
					label: `[${this.name}] resource group [${i}]`,
					number: i,
					resourceBindingsInternal: new Map(),
					resourceBindingsExternal: new Map(),


					//TODO members not needed?
					bindGroupLayoutDescriptor: new BindGroupLayoutDescriptor(
						{
							label: `[${this.name}] bind group layout [${i}]`,
							entries: new Array()
						}
					),
					bindGroupDescriptor: new BindGroupDescriptor(
						{
							label: `[${this.name}] bind group [${i}]`,
							layout: null,
							entries: new Array(),
						}
					)
				}
			);


			resourceBindingGroups.set(i, resourceBindingGroup);
			// this.setResourceBindingGroup(i, resourceBindingGroup);
		}


		return resourceBindingGroups;
	}

	getResourceBindingGroup(groupNumber) {
		if (this.resourceBindingGroups.has(groupNumber)) {
			return this.resourceBindingGroups.get(groupNumber);
		} else {
			console.warn(`No resource binding group [${groupNumber.toString().padStart(2, '0')}]!`);
			return null;
		}
	}
	setResourceBindingGroup(groupNumber, resourceBindingGroup) {
		this.resourceBindingGroups.set(groupNumber, resourceBindingGroup);
	}

	// #getResourceBinding(resourceBindings, bindingNumber) {
	// 	if (resourceBindings.has(bindingNumber)) {
	// 		return resourceBindings.get(bindingNumber);
	// 	} else {
	// 		console.warn(`No resource binding [${bindingNumber}]!`);
	// 		return null;
	// 	}
	// }
	getResourceBindingInternal(groupNumber, bindingNumber) {
		return this.getResourceBindingGroup(groupNumber).getResourceBindingInternal(bindingNumber);
	}
	getResourceBindingExternal(groupNumber, bindingNumber) {
		return this.getResourceBindingGroup(groupNumber).getResourceBindingExternal(bindingNumber);
	}
	getResourceBindingExteInte(groupNumber, bindingNumber) {
		return this.getResourceBindingGroup(groupNumber).getResourceBindingExteInte(bindingNumber);
	}

	setResourceBindingInternal(groupNumber, bindingNumber, binding) {
		this.getResourceBindingGroup(groupNumber).setResourceBindingInternal(bindingNumber, binding);
	}
	setResourceBindingExternal(groupNumber, bindingNumber, binding) {
		this.getResourceBindingGroup(groupNumber).setResourceBindingExternal(bindingNumber, binding);
	}
	setResourceBindingExteInte(groupNumber, bindingNumber, binding) {
		this.getResourceBindingGroup(groupNumber).setResourceBindingExteInte(bindingNumber, binding);
	}
	setMapBindingInternal(groupNumber, mapNumber, mapBinding, setInstruction = undefined) {
		this.getResourceBindingGroup(groupNumber).setMapBindingInternal(mapNumber, mapBinding, setInstruction);
	}
	setMapBindingExternal(groupNumber, mapNumber, mapBinding, setInstruction = undefined) {
		this.getResourceBindingGroup(groupNumber).setMapBindingExternal(mapNumber, mapBinding, setInstruction);
	}

	//TODO set unifroms here?
	// bindings (uniforms)
	setResourceBindingValueInternal(groupNumber, bindingNumber, setInstruction) {
		this.getResourceBindingGroup(groupNumber).setResourceBindingValueInternal(bindingNumber, setInstruction);
	}
	setResourceBindingValueExternal(groupNumber, bindingNumber, setInstruction) {
		this.getResourceBindingGroup(groupNumber).setResourceBindingValueExternal(bindingNumber, setInstruction);
	}
	setMapBindingValueInternal(groupNumber, mapNumber, mapBinding, setInstruction) {
		this.getResourceBindingGroup(groupNumber).setMapBindingValueInternal(mapNumber, mapBinding, setInstruction);
	}
	setMapBindingValueExternal(groupNumber, mapNumber, mapBinding, setInstruction) {
		this.getResourceBindingGroup(groupNumber).setMapBindingValueExternal(mapNumber, mapBinding, setInstruction);
	}
};