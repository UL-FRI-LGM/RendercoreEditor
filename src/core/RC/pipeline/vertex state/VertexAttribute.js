export class VertexAttribute { //RC vertex attribute


    static DEFAULT = {
        FORMAT: undefined,
        OFFSET: undefined,

        SHADER_LOCATION: undefined,
    };


    #format;
    #offset;
    
    #shaderLocation;


    constructor(args = {}) {
        this.format = args.format !== undefined ? args.format : VertexAttribute.DEFAULT.FORMAT;
        this.offset = args.offset !== undefined ? args.offset : VertexAttribute.DEFAULT.OFFSET;
        
        this.shaderLocation = args.shaderLocation !== undefined ? args.shaderLocation : VertexAttribute.DEFAULT.SHADER_LOCATION;
    }


    get format() { return this.#format; }
    set format(format) { this.#format = format; }
    get offset() { return this.#offset; }
    set offset(offset) { this.#offset = offset; }

    get shaderLocation() { return this.#shaderLocation; }
    set shaderLocation(shaderLocation) { this.#shaderLocation = shaderLocation; }
};