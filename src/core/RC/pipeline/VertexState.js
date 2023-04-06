import { ProgrammableStage } from "./ProgrammableStage.js";


export class VertexState extends ProgrammableStage {

    
    static DEFAULT = {
        MODULE: undefined,
        ENTRY_POINT: undefined,
        CONSTANTS: undefined,

        BUFFERS: new Array(),
    };


    #buffers;


    constructor(args = {}) {
        super(
            {
                ...args,

                module: (args.module !== undefined) ? args.module : VertexState.DEFAULT.MODULE,
                entryPoint: (args.entryPoint !== undefined) ? args.entryPoint : VertexState.DEFAULT.ENTRY_POINT,
                constants: (args.constants !== undefined) ? args.constants : VertexState.DEFAULT.CONSTANTS,
            }
        );
        
        this.buffers = (args.buffers !== undefined) ? args.buffers : new Array(...VertexState.DEFAULT.BUFFERS); //copy
    }


    get buffers() { return this.#buffers; }
    set buffers(buffers) { this.#buffers = buffers; }
};