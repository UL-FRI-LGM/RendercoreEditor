import { ProgrammableStage } from "./ProgrammableStage.js";
import { MeshBasicMaterial } from "../../../RenderCore.js";
import { MeshLambertMaterial } from "../../../materials/MeshLambertMaterial.js";
import { ColorTargetState } from "./fragment_state/ColorTargetState.js";
import { PostprocessToneMappingMaterial } from "../../../materials/PostprocessToneMappingMaterial.js";
import { SpriteBasicMaterial } from "../../../materials/SpriteBasicMaterial.js";
import { VertexNormalBasicMaterial } from "../../../materials/helpers/VertexNormalBasicMaterial.js";
import { PostprocessDilationMaterial } from "../../../materials/PostprocessDilationMaterial.js";
import { PostprocessPixelizationMaterial } from "../../../materials/PostprocessPixelizationMaterial.js";
import { PostprocessCopyTextureMaterial } from "../../../materials/PostprocessCopyTextureMaterial.js";
import { MeshPhongMaterial } from "../../../materials/MeshPhongMaterial.js";
import { MeshBlinnMaterial } from "../../../materials/MeshBlinnMaterial.js";


export class FragmentState extends ProgrammableStage {


	static DEFAULT = {
		MODULE: undefined,
		ENTRY_POINT: undefined,
		CONSTANTS: undefined,

		TARGETS: new Array(),
	};

	static CONFIGURATION = {
		SPRITE_BASIC_Tx1_T: new FragmentState(
			{
				path: SpriteBasicMaterial.DEFAULT.SHADER_PATH + SpriteBasicMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

				module: null,
				entryPoint: "main",
				constants: undefined,

				targets: [
					ColorTargetState.CONFIGURATION.F_RGBA_8_UNORM.B_ASOAOO,
				],
			}
		),
		SPRITE_BASIC_Tx1_T_FBGRA: new FragmentState(
			{
				path: SpriteBasicMaterial.DEFAULT.SHADER_PATH + SpriteBasicMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

				module: null,
				entryPoint: "main",
				constants: undefined,

				targets: [
					ColorTargetState.CONFIGURATION.F_BGRA_8_UNORM.B_ASOAOO,
				],
			}
		),
		VN_BASIC_Tx1_O_FBGRA: new FragmentState(
			{
				path: VertexNormalBasicMaterial.DEFAULT.SHADER_PATH + VertexNormalBasicMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

				module: null,
				entryPoint: "main",
				constants: undefined,

				targets: [
					ColorTargetState.CONFIGURATION.F_BGRA_8_UNORM.B_AOZAOZ,
				],
			}
		),
		VN_BASIC_Tx1_T_FBGRA: new FragmentState(
			{
				path: VertexNormalBasicMaterial.DEFAULT.SHADER_PATH + VertexNormalBasicMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

				module: null,
				entryPoint: "main",
				constants: undefined,

				targets: [
					ColorTargetState.CONFIGURATION.F_BGRA_8_UNORM.B_ASOAOO,
				],
			}
		),
		BASIC_Tx1_O: new FragmentState(
			{
				path: MeshBasicMaterial.DEFAULT.SHADER_PATH + MeshBasicMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

				module: null,
				entryPoint: "main",
				constants: undefined,

				targets: [
					ColorTargetState.CONFIGURATION.F_RGBA_8_UNORM.B_AOZAOZ,
				],
			}
		),
		BASIC_Tx1_T: new FragmentState(
			{
				path: MeshBasicMaterial.DEFAULT.SHADER_PATH + MeshBasicMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

				module: null,
				entryPoint: "main",
				constants: undefined,

				targets: [
					ColorTargetState.CONFIGURATION.F_RGBA_8_UNORM.B_ASOAOO,
				],
			}
		),
		LAMBERT_Tx1_O: new FragmentState(
			{
				path: MeshLambertMaterial.DEFAULT.SHADER_PATH + MeshLambertMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

				module: null,
				entryPoint: "main",
				constants: undefined,

				targets: [
					ColorTargetState.CONFIGURATION.F_RGBA_8_UNORM.B_AOZAOZ,
				],
			}
		),
		LAMBERT_Tx1_T: new FragmentState(
			{
				path: MeshLambertMaterial.DEFAULT.SHADER_PATH + MeshLambertMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

				module: null,
				entryPoint: "main",
				constants: undefined,

				targets: [
					ColorTargetState.CONFIGURATION.F_RGBA_8_UNORM.B_ASOAOO,
				],
			}
		),
		BASIC_Tx1_O_FBGRA: new FragmentState(
			{
				path: MeshBasicMaterial.DEFAULT.SHADER_PATH + MeshBasicMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

				module: null,
				entryPoint: "main",
				constants: undefined,

				targets: [
					ColorTargetState.CONFIGURATION.F_BGRA_8_UNORM.B_AOZAOZ,
				],
			}
		),
		BASIC_Tx1_T_FBGRA: new FragmentState(
			{
				path: MeshBasicMaterial.DEFAULT.SHADER_PATH + MeshBasicMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

				module: null,
				entryPoint: "main",
				constants: undefined,

				targets: [
					ColorTargetState.CONFIGURATION.F_BGRA_8_UNORM.B_ASOAOO,
				],
			}
		),
		LAMBERT_Tx1_O_FBGRA: new FragmentState(
			{
				path: MeshLambertMaterial.DEFAULT.SHADER_PATH + MeshLambertMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

				module: null,
				entryPoint: "main",
				constants: undefined,

				targets: [
					ColorTargetState.CONFIGURATION.F_BGRA_8_UNORM.B_AOZAOZ,
				],
			}
		),
		LAMBERT_Tx1_T_FBGRA: new FragmentState(
			{
				path: MeshLambertMaterial.DEFAULT.SHADER_PATH + MeshLambertMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

				module: null,
				entryPoint: "main",
				constants: undefined,

				targets: [
					ColorTargetState.CONFIGURATION.F_BGRA_8_UNORM.B_ASOAOO,
				],
			}
		),
		PHONG_Tx1_O_FBGRA: new FragmentState(
			{
				path: MeshPhongMaterial.DEFAULT.SHADER_PATH + MeshPhongMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

				module: null,
				entryPoint: "main",
				constants: undefined,

				targets: [
					ColorTargetState.CONFIGURATION.F_BGRA_8_UNORM.B_AOZAOZ,
				],
			}
		),
		PHONG_Tx1_T_FBGRA: new FragmentState(
			{
				path: MeshPhongMaterial.DEFAULT.SHADER_PATH + MeshPhongMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

				module: null,
				entryPoint: "main",
				constants: undefined,

				targets: [
					ColorTargetState.CONFIGURATION.F_BGRA_8_UNORM.B_ASOAOO,
				],
			}
		),
		BLINN_Tx1_O_FBGRA: new FragmentState(
			{
				path: MeshBlinnMaterial.DEFAULT.SHADER_PATH + MeshBlinnMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

				module: null,
				entryPoint: "main",
				constants: undefined,

				targets: [
					ColorTargetState.CONFIGURATION.F_BGRA_8_UNORM.B_AOZAOZ,
				],
			}
		),
		BLINN_Tx1_T_FBGRA: new FragmentState(
			{
				path: MeshBlinnMaterial.DEFAULT.SHADER_PATH + MeshBlinnMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

				module: null,
				entryPoint: "main",
				constants: undefined,

				targets: [
					ColorTargetState.CONFIGURATION.F_BGRA_8_UNORM.B_ASOAOO,
				],
			}
		),
		TONE_MAPPING_Tx1: new FragmentState(
			{
				path: PostprocessToneMappingMaterial.DEFAULT.SHADER_PATH + PostprocessToneMappingMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

				module: null,
				entryPoint: "main",
				constants: undefined,

				targets: [
					ColorTargetState.CONFIGURATION.F_RGBA_8_UNORM.B_AOZAOZ,
				],
			}
		),
		TONE_MAPPING_Tx1_O_FBGRA: new FragmentState(
			{
				path: PostprocessToneMappingMaterial.DEFAULT.SHADER_PATH + PostprocessToneMappingMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

				module: null,
				entryPoint: "main",
				constants: undefined,

				targets: [
					ColorTargetState.CONFIGURATION.F_BGRA_8_UNORM.B_AOZAOZ,
				],
			}
		),
		DILATION_Tx1_O_FBGRA: new FragmentState(
			{
				path: PostprocessDilationMaterial.DEFAULT.SHADER_PATH + PostprocessDilationMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

				module: null,
				entryPoint: "main",
				constants: undefined,

				targets: [
					ColorTargetState.CONFIGURATION.F_BGRA_8_UNORM.B_AOZAOZ,
				],
			}
		),
		PIXELIZATION_Tx1_O_FBGRA: new FragmentState(
			{
				path: PostprocessPixelizationMaterial.DEFAULT.SHADER_PATH + PostprocessPixelizationMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

				module: null,
				entryPoint: "main",
				constants: undefined,

				targets: [
					ColorTargetState.CONFIGURATION.F_BGRA_8_UNORM.B_AOZAOZ,
				],
			}
		),
		COPY_TEXTURE_Tx1_O_FBGRA: new FragmentState(
			{
				path: PostprocessCopyTextureMaterial.DEFAULT.SHADER_PATH + PostprocessCopyTextureMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

				module: null,
				entryPoint: "main",
				constants: undefined,

				targets: [
					ColorTargetState.CONFIGURATION.F_BGRA_8_UNORM.B_AOZAOZ,
				],
			}
		),
	};


	#targets;


	constructor(args = {}) {
		super(
			{
				...args,

				module: (args.module !== undefined) ? args.module : FragmentState.DEFAULT.MODULE,
				entryPoint: (args.entryPoint !== undefined) ? args.entryPoint : FragmentState.DEFAULT.ENTRY_POINT,
				constants: (args.constants !== undefined) ? args.constants : FragmentState.DEFAULT.CONSTANTS,
			}
		);
		
		this.targets = (args.targets !== undefined) ? args.targets : new Array(...FragmentState.DEFAULT.TARGETS); //copy
	}


	get targets() { return this.#targets; }
	set targets(targets) { this.#targets = targets; }
};
