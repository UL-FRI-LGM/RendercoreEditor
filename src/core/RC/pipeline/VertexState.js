import { ProgrammableStage } from "./ProgrammableStage.js";


export class VertexState extends ProgrammableStage {

    
    static DEFAULT = {
        BUFFERS: new Array(),
    };


    #buffers;


    constructor(args = {}) {
        super(args);
        
        this.buffers = (args.buffers !== undefined) ? args.buffers : new Array(...VertexState.DEFAULT.BUFFERS); //copy
    }


    get buffers() { return this.#buffers; }
    set buffers(buffers) { this.#buffers = buffers; }
};