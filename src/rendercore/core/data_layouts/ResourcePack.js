import { ObjectBase } from "../ObjectBase.js";
import { BindGroupDescriptor } from "../RC/resource_binding/BindGroupDescriptor.js";
import { BindGroupLayoutDescriptor } from "../RC/resource_binding/BindGroupLayoutDescriptor.js";
import { UniformGroupDescriptor } from "./UniformGroupDescriptor.js";
import { MapT2 } from "../MapT2.js";
import { ArrayT2 } from "../ArrayT2.js";


export class ResourcePack extends ObjectBase {


	static DEFAULT = {
		NAME: "",
		TYPE: "ResourcePack",

		MAX_LOCATION_GROUPS: 1,
		MAX_BINDING_GROUPS: 4,

		RESOURCE_LOCATIONS: new MapT2({}),
		RESOURCE_BINDING_GROUPS: new MapT2({}),
	};


	#maxLocationGroups;
	#maxBindingGroups;

    #resourceLocations = new MapT2({});
	#resourceBindingGroups = new MapT2({});


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

		this.resourceLocations = (args.resourceLocations !== undefined) ? args.resourceLocations : ResourcePack.DEFAULT.RESOURCE_LOCATIONS.clone(true);
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


	clone() {
		return new ResourcePack(
			{
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,

				maxLocationGroups: (this.maxLocationGroups === Object(this.maxLocationGroups)) ? this.maxLocationGroups.clone() : this.maxLocationGroups,
				maxBindingGroups: (this.maxBindingGroups === Object(this.maxBindingGroups)) ? this.maxBindingGroups.clone() : this.maxBindingGroups,

				resourceLocations: (this.resourceLocations === Object(this.resourceLocations)) ? this.resourceLocations.clone() : this.resourceLocations,
				resourceBindingGroups: (this.resourceBindingGroups === Object(this.resourceBindingGroups)) ? this.resourceBindingGroups.clone() : this.resourceBindingGroups,
			}
		);
	}

	#assembleResourceLocationGroups() {//TODO currently not in use
		const resourceLocationGroups = new MapT2({});
		
		for (let i = 0; i < this.maxLocationGroups; i++) {
			const resourceLocationGroup = null


			resourceLocationGroups.set(i, resourceLocationGroup);
		}


		return resourceLocationGroups;
	}
	#assembleResourceBindingGroups() {
		const resourceBindingGroups = new MapT2({});

		for (let i = 0; i < this.maxBindingGroups; i++) {
			const resourceBindingGroup = new UniformGroupDescriptor(
				{
					label: `[${this.name}] resource group [${i}]`,
					number: i,
					resourceBindingsInternal: new MapT2({}),
					resourceBindingsExternal: new MapT2({}),


					//TODO members not needed?
					bindGroupLayoutDescriptor: new BindGroupLayoutDescriptor(
						{
							label: `[${this.name}] bind group layout [${i}]`,
							entries: new ArrayT2({})
						}
					),
					bindGroupDescriptor: new BindGroupDescriptor(
						{
							label: `[${this.name}] bind group [${i}]`,
							layout: null,
							entries: new ArrayT2({}),
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
			console.warn(`No resource_binding group [${groupNumber.toString().padStart(2, '0')}]!`);
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
	// 		console.warn(`No resource_binding [${bindingNumber}]!`);
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