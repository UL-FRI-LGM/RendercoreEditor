export class BindGroupEntry {


    static DEFAULT = {
        BINDING: undefined,
        RESOURCE: undefined,
    };


    #binding;
    #resource;


    constructor(args = {}) {
        this.binding = (args.binding !== undefined) ? args.binding : BindGroupEntry.DEFAULT.BINDING;
        this.resource = (args.resource !== undefined) ? args.resource : BindGroupEntry.DEFAULT.RESOURCE;
    }

    
    get binding() { return this.#binding; }
    set binding(binding) { this.#binding = binding; }
    get resource() { return this.#resource; }
    set resource(resource) { this.#resource = resource; }
};