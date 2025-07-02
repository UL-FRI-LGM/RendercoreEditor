import { DescriptorBase } from "../DescriptorBase.js";
import { BindGroupLayoutEntry } from "./BindGroupLayoutEntry.js";


export class BindGroupLayoutDescriptor extends DescriptorBase {


    static DEFAULT = {
        ENTRIES: undefined,
    };

    static CONFIGURATION = {
        BGLD00: {
            BGLEs_Bx01_Tx00_Sx00: new BindGroupLayoutDescriptor(
                {
                    label: "[BGLD00.BGLEs_Bx01_Tx00_Sx00]",
                    entries: [
                        BindGroupLayoutEntry.CONFIGURATION.BGLE00_VVF_RB_TU,
                    ]
                }
            ),
            BGLEs_Bx02_Tx00_Sx00: new BindGroupLayoutDescriptor(
                {
                    label: "[BGLD00.BGLEs_Bx02_Tx00_Sx00]",
                    entries: [
                        BindGroupLayoutEntry.CONFIGURATION.BGLE00_VVF_RB_TU,
                        BindGroupLayoutEntry.CONFIGURATION.BGLE01_VVF_RB_TU,
                    ]
                }
            )
        },
        BGLD01: {
            BGLEs_Bx01_Tx00_Sx00: new BindGroupLayoutDescriptor(
                {
                    label: "[BGLD01.BGLEs_Bx01_Tx00_Sx00]",
                    entries: [
                        BindGroupLayoutEntry.CONFIGURATION.BGLE10_VVF_RB_TU,
                    ]
                }
            )
        },
        BGLD02: {
            BGLEs_Bx01_Tx00_Sx00: new BindGroupLayoutDescriptor(
                {
                    label: "[BGLD02.BGLEs_Bx01_Tx00_Sx00]",
                    entries: [
                        BindGroupLayoutEntry.CONFIGURATION.BGLE00_VVF_RB_TU,
                    ]
                }
            ),
            BGLEs_Bx02_Tx00_Sx00: new BindGroupLayoutDescriptor(
                {
                    label: "[BGLD02.BGLEs_Bx02_Tx00_Sx00]",
                    entries: [
                        BindGroupLayoutEntry.CONFIGURATION.BGLE00_VVF_RB_TU,
                        BindGroupLayoutEntry.CONFIGURATION.BGLE01_VVF_RB_TU,
                    ]
                }
            ),
            BGLEs_Bx02_Tx00_Sx00_S: new BindGroupLayoutDescriptor(
                {
                    label: "[BGLD02.BGLEs_Bx02_Tx00_Sx00]",
                    entries: [
                        BindGroupLayoutEntry.CONFIGURATION.BGLE00_VVF_RB_TU,
                        BindGroupLayoutEntry.CONFIGURATION.BGLE01_VVF_RB_TS_RO,
                    ]
                }
            )
        },
        BGLD03: {
            BGLEs_Bx01_Tx01_Sx01: new BindGroupLayoutDescriptor(
                {
                    label: "[BGLD03.BGLEs_Bx01_Tx01_Sx01]",
                    entries: [
                        BindGroupLayoutEntry.CONFIGURATION.BGLE00_VVF_RB_TU,
    
                        BindGroupLayoutEntry.CONFIGURATION.BGLE10_VVF_RT_TF,
                        
                        BindGroupLayoutEntry.CONFIGURATION.BGLE20_VVF_RS_TF,
                    ]
                }
            ),
            BGLEs_Bx01_Tx01_Sx01_UNFILTERABLE: new BindGroupLayoutDescriptor(
                {
                    label: "[BGLD03.BGLEs_Bx01_Tx01_Sx01_UNFILTERABLE]",
                    entries: [
                        BindGroupLayoutEntry.CONFIGURATION.BGLE00_VVF_RB_TU,
    
                        BindGroupLayoutEntry.CONFIGURATION.BGLE10_VVF_RT_TUF,
                        
                        BindGroupLayoutEntry.CONFIGURATION.BGLE20_VVF_RS_TUF,
                    ]
                }
            ),
            BGLEs_Bx01_Tx01_Sx01_Tx0A: new BindGroupLayoutDescriptor(
                {
                    label: "[BGLD03.BGLEs_Bx01_Tx01_Sx01_Tx0A]",
                    entries: [
                        BindGroupLayoutEntry.CONFIGURATION.BGLE00_VVF_RB_TU,
    
                        BindGroupLayoutEntry.CONFIGURATION.BGLE10_VVF_RT_TF,
                        
                        BindGroupLayoutEntry.CONFIGURATION.BGLE20_VVF_RS_TF,


                        BindGroupLayoutEntry.CONFIGURATION.BGLE32_VVF_RT_TF,
                    ]
                }
            ),
            BGLEs_Bx01_Tx02_Sx02: new BindGroupLayoutDescriptor(
                {
                    label: "[BGLD03.BGLEs_Bx01_Tx02_Sx02]",
                    entries: [
                        BindGroupLayoutEntry.CONFIGURATION.BGLE00_VVF_RB_TU,
    
                        BindGroupLayoutEntry.CONFIGURATION.BGLE10_VVF_RT_TF,
                        BindGroupLayoutEntry.CONFIGURATION.BGLE11_VVF_RT_TF,
                        
                        BindGroupLayoutEntry.CONFIGURATION.BGLE20_VVF_RS_TF,
                        BindGroupLayoutEntry.CONFIGURATION.BGLE21_VVF_RS_TF,
                    ]
                }
            ),
            BGLEs_Bx01_Tx04_Sx04: new BindGroupLayoutDescriptor(
                {
                    label: "[BGLD03.BGLEs_Bx01_Tx04_Sx04]",
                    entries: [
                        BindGroupLayoutEntry.CONFIGURATION.BGLE00_VVF_RB_TU,
    
                        BindGroupLayoutEntry.CONFIGURATION.BGLE10_VVF_RT_TF,
                        BindGroupLayoutEntry.CONFIGURATION.BGLE11_VVF_RT_TF,
                        BindGroupLayoutEntry.CONFIGURATION.BGLE12_VVF_RT_TF,
                        BindGroupLayoutEntry.CONFIGURATION.BGLE13_VVF_RT_TF,
                        
                        BindGroupLayoutEntry.CONFIGURATION.BGLE20_VVF_RS_TF,
                        BindGroupLayoutEntry.CONFIGURATION.BGLE21_VVF_RS_TF,
                        BindGroupLayoutEntry.CONFIGURATION.BGLE22_VVF_RS_TF,
                        BindGroupLayoutEntry.CONFIGURATION.BGLE23_VVF_RS_TF,
                    ]
                }
            )
        },
    };


    #entries;
    

    constructor(args = {}) {
        super(args);

        this.entries = (args.entries !== undefined) ? args.entries : BindGroupLayoutDescriptor.DEFAULT.ENTRIES;
    }


    get entries() { return this.#entries; }
    set entries(entries) { this.#entries = entries; }


    clone() {
        return new BindGroupLayoutDescriptor(
            {
                name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,

				label: (this.label === Object(this.label)) ? this.label.clone() : this.label,
				dirtyCache: (this.dirtyCache === Object(this.dirtyCache)) ? this.dirtyCache.clone() : this.dirtyCache,

				entries: (this.entries === Object(this.entries)) ? this.entries.clone() : this.entries,
            }
        );
    }
};