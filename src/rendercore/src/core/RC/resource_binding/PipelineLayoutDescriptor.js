import { DescriptorBase } from "../DescriptorBase.js";
import { BindGroupLayoutDescriptor } from "./BindGroupLayoutDescriptor.js";


export class PipelineLayoutDescriptor extends DescriptorBase {


    static DEFAULT = {
        BIND_GROUP_LAYOUT_DESCRIPTORS: undefined,

        BIND_GROUP_LAYOUTS: undefined,
    };

    static CONFIGURATION = {
        RENDER: {
            BASIC: new PipelineLayoutDescriptor(
                {
                    label: "[RENDER.BASIC]",

                    bindGroupLayoutDescriptors: [
                        BindGroupLayoutDescriptor.CONFIGURATION.BGLD00.BGLEs_Bx02_Tx00_Sx00,
                        BindGroupLayoutDescriptor.CONFIGURATION.BGLD01.BGLEs_Bx01_Tx00_Sx00,
                        BindGroupLayoutDescriptor.CONFIGURATION.BGLD02.BGLEs_Bx02_Tx00_Sx00_S,
                        // BindGroupLayoutDescriptor.CONFIGURATION.BGLD03.BGLEs_Bx01_Tx01_Sx01,
                        // BindGroupLayoutDescriptor.CONFIGURATION.BGLD03.BGLEs_Bx01_Tx01_Sx01_Tx0A,
                        BindGroupLayoutDescriptor.CONFIGURATION.BGLD03.BGLEs_Bx01_Tx04_Sx04,
                    ],

                    bindGroupLayouts: [
                        // resolve later
                        // bindGroupLayoutManager.getBindGroupLayout(BindGroupLayoutDescriptor.CONFIGURATION.G00_C),
                        // bindGroupLayoutManager.getBindGroupLayout(BindGroupLayoutDescriptor.CONFIGURATION.G01_L),
                        // bindGroupLayoutManager.getBindGroupLayout(BindGroupLayoutDescriptor.CONFIGURATION.G02_O),
                        // bindGroupLayoutManager.getBindGroupLayout(BindGroupLayoutDescriptor.CONFIGURATION.G03_M),
                    ],
                }
            ),
            POSTPROCESS: {
                FILTERABLE: new PipelineLayoutDescriptor(
                    {
                        label: "[RENDER.POSTPROCESS.FILTERABLE]",
    
                        bindGroupLayoutDescriptors: [
                            BindGroupLayoutDescriptor.CONFIGURATION.BGLD03.BGLEs_Bx01_Tx01_Sx01,
                        ],
    
                        bindGroupLayouts: new Array(),
                    }
                ),
                UNFILTERABLE: new PipelineLayoutDescriptor(
                    {
                        label: "[RENDER.POSTPROCESS.UNFILTERABLE]",
    
                        bindGroupLayoutDescriptors: [
                            BindGroupLayoutDescriptor.CONFIGURATION.BGLD03.BGLEs_Bx01_Tx01_Sx01_UNFILTERABLE,
                        ],
    
                        bindGroupLayouts: new Array(),
                    }
                )
            },
        },
        COMPUTE: {

        }
    };


    #bindGroupLayoutDescriptors;

    #bindGroupLayouts;


    constructor(args = {}) {
        super(args);

        this.bindGroupLayoutDescriptors = args.bindGroupLayoutDescriptors !== undefined ? args.bindGroupLayoutDescriptors : PipelineLayoutDescriptor.DEFAULT.BIND_GROUP_LAYOUT_DESCRIPTORS;

        this.bindGroupLayouts = args.bindGroupLayouts !== undefined ? args.bindGroupLayouts : PipelineLayoutDescriptor.DEFAULT.BIND_GROUP_LAYOUTS;
    }


    get bindGroupLayoutDescriptors() { return this.#bindGroupLayoutDescriptors; }
    set bindGroupLayoutDescriptors(bindGroupLayoutDescriptors) { this.#bindGroupLayoutDescriptors = bindGroupLayoutDescriptors; }

    get bindGroupLayouts() { return this.#bindGroupLayouts; }
    set bindGroupLayouts(bindGroupLayouts) { this.#bindGroupLayouts = bindGroupLayouts; }
};