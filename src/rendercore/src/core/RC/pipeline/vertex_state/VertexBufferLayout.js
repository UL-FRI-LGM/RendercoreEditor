import { VertexAttribute } from "./VertexAttribute.js";
import { VertexFormat } from "./VertexFormat.js";
import { VertexStepMode } from "./VertexStepMode.js";


export class VertexBufferLayout { //RC vertex buffer layout


    static DEFAULT = {
        ARRAY_STRIDE: undefined,
        STEP_MODE: VertexStepMode.VERTEX,
        ATTRIBUTES: new Array(),
    };

    static CONFIGURATION = {
        L00_S3_SMV_A1xF32: new VertexBufferLayout(
            {
                arrayStride: 3 * 4,
                stepMode: VertexStepMode.VERTEX,
                attributes: [
                    new VertexAttribute(
                        {
                            format: VertexFormat.FLOAT_32x3,
                            offset: 0,
                            shaderLocation: 0,
                        }
                    )
                ],						
            }
        ),
        L01_S3_SMV_A1xF32: new VertexBufferLayout(
            {
                arrayStride: 3 * 4,
                stepMode: VertexStepMode.VERTEX,
                attributes: [
                    new VertexAttribute(
                        {
                            format: VertexFormat.FLOAT_32x3,
                            offset: 0,
                            shaderLocation: 1,
                        }
                    )
                ],						
            }
        ),
        L02_S2_SMV_A1xF32: new VertexBufferLayout(
            {
                arrayStride: 2 * 4,
                stepMode: VertexStepMode.VERTEX,
                attributes: [
                    new VertexAttribute(
                        {
                            format: VertexFormat.FLOAT_32x2,
                            offset: 0,
                            shaderLocation: 2,
                        }
                    )
                ],						
            }
        ),
        L03_S1_SMV_A1xF32: new VertexBufferLayout(
            {
                arrayStride: 1 * 4,
                stepMode: VertexStepMode.VERTEX,
                attributes: [
                    new VertexAttribute(
                        {
                            format: VertexFormat.FLOAT_32,
                            offset: 0,
                            shaderLocation: 3,
                        }
                    )
                ],						
            }
        ),
        L03_S2_SMV_A1xF32: new VertexBufferLayout(
            {
                arrayStride: 2 * 4,
                stepMode: VertexStepMode.VERTEX,
                attributes: [
                    new VertexAttribute(
                        {
                            format: VertexFormat.FLOAT_32x2,
                            offset: 0,
                            shaderLocation: 3,
                        }
                    )
                ],						
            }
        ),
        L04_S1_SMV_A1xF32: new VertexBufferLayout(
            {
                arrayStride: 1 * 4,
                stepMode: VertexStepMode.VERTEX,
                attributes: [
                    new VertexAttribute(
                        {
                            format: VertexFormat.FLOAT_32,
                            offset: 0,
                            shaderLocation: 4,
                        }
                    )
                ],						
            }
        )
    };


    #arrayStride;
    #stepMode;
    #attributes;


    constructor(args = {}) {
        this.arrayStride = args.arrayStride !== undefined ? args.arrayStride : VertexBufferLayout.DEFAULT.ARRAY_STRIDE;
        this.stepMode = args.stepMode !== undefined ? args.stepMode : VertexBufferLayout.DEFAULT.STEP_MODE;
        this.attributes = args.attributes !== undefined ? args.attributes : new Array(...VertexBufferLayout.DEFAULT.ATTRIBUTES); //copy
    }


    get arrayStride() { return this.#arrayStride; }
    set arrayStride(arrayStride) { this.#arrayStride = arrayStride; }
    get stepMode() { return this.#stepMode; }
    set stepMode(stepMode) { this.#stepMode = stepMode; }
    get attributes() { return this.#attributes; }
    set attributes(attributes) { this.#attributes = attributes; }
};