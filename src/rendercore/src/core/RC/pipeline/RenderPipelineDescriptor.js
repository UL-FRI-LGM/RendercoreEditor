import { PipelineDescriptor } from "./PipelineDescriptor.js";
import { PipelineLayoutDescriptor } from "../resource_binding/PipelineLayoutDescriptor.js";
import { VertexState } from "./VertexState.js";
import { PrimitiveState } from "./PrimitiveState.js";
import { DepthStencilState } from "./DepthStencilState.js";
import { MultisampleState } from "./MultisampleState.js";
import { FragmentState } from "./FragmentState.js";
import { Division } from "../../../Division.js";
import { MapT2 } from "../../MapT2.js";


export class RenderPipelineDescriptor extends PipelineDescriptor {


	static DEFAULT = {
		TYPE: "RenderPipelineDescriptor",
		NAME: "",
		LABEL: "",
		DIVISION: Division.RENDER_CORE,

		DIRTY_CACHE: new MapT2(
			{ label: `${RenderPipelineDescriptor.name}` },
			[
				...PipelineDescriptor.DEFAULT.DIRTY_CACHE.clone(true)
			]
		),

		LAYOUT: null,

		VERTEX: undefined,
		PRIMITIVE: undefined,
		DEPTH_STENCIL: undefined,
		MULTISAMPLE: undefined,
		FRAGMENT: undefined,
	};

	static CONFIGURATION = {
		POINT: {
			BASIC: {
				OPAQUE: new RenderPipelineDescriptor(
					{
						label: "[POINT.BASIC.OPAQUE]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.BASIC,
						primitive: PrimitiveState.CONFIGURATION.TPL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWET_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.BASIC_Tx1_O,
					}
				),
				OPAQUE_FBGRA: new RenderPipelineDescriptor(
					{
						label: "[POINT.BASIC.OPAQUE_FBGRA]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.BASIC,
						primitive: PrimitiveState.CONFIGURATION.TPL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWET_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.BASIC_Tx1_O_FBGRA,
					}
				),
				TRANSPARENT: new RenderPipelineDescriptor(
					{
						label: "[POINT.BASIC.TRANSPARENT]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.BASIC,
						primitive: PrimitiveState.CONFIGURATION.TPL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWEF_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.BASIC_Tx1_T,
					}
				),
				TRANSPARENT_FBGRA: new RenderPipelineDescriptor(
					{
						label: "[POINT.BASIC.TRANSPARENT_FBGRA]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.BASIC,
						primitive: PrimitiveState.CONFIGURATION.TPL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWEF_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.BASIC_Tx1_T_FBGRA,
					}
				)
			},
			LAMBERT: {
				OPAQUE: new RenderPipelineDescriptor(
					{
						label: "[POINT.LAMBERT.OPAQUE]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.LAMBERT,
						primitive: PrimitiveState.CONFIGURATION.TPL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWET_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.LAMBERT_Tx1_O,
					}
				),
				OPAQUE_FBGRA: new RenderPipelineDescriptor(
					{
						label: "[POINT.LAMBERT.OPAQUE_FBGRA]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.LAMBERT,
						primitive: PrimitiveState.CONFIGURATION.TPL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWET_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.LAMBERT_Tx1_O_FBGRA,
					}
				),
				TRANSPARENT: new RenderPipelineDescriptor(
					{
						label: "[POINT.LAMBERT.TRANSPARENT]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.LAMBERT,
						primitive: PrimitiveState.CONFIGURATION.TPL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWEF_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.LAMBERT_Tx1_T,
					}
				),
				TRANSPARENT_FBGRA: new RenderPipelineDescriptor(
					{
						label: "[POINT.LAMBERT.TRANSPARENT_FBGRA]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.LAMBERT,
						primitive: PrimitiveState.CONFIGURATION.TPL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWEF_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.LAMBERT_Tx1_T_FBGRA,
					}
				),
			},
			PHONG: {
				OPAQUE_FBGRA: new RenderPipelineDescriptor(
					{
						label: "[POINT.PHONG.OPAQUE_FBGRA]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.PHONG,
						primitive: PrimitiveState.CONFIGURATION.TPL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWET_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.PHONG_Tx1_O_FBGRA,
					}
				),
				TRANSPARENT_FBGRA: new RenderPipelineDescriptor(
					{
						label: "[POINT.PHONG.TRANSPARENT_FBGRA]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.PHONG,
						primitive: PrimitiveState.CONFIGURATION.TPL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWEF_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.PHONG_Tx1_T_FBGRA,
					}
				),
			},
			BLINN: {
				OPAQUE_FBGRA: new RenderPipelineDescriptor(
					{
						label: "[POINT.BLINN.OPAQUE_FBGRA]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.BLINN,
						primitive: PrimitiveState.CONFIGURATION.TPL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWET_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.BLINN_Tx1_O_FBGRA,
					}
				),
				TRANSPARENT_FBGRA: new RenderPipelineDescriptor(
					{
						label: "[POINT.BLINN.TRANSPARENT_FBGRA]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.BLINN,
						primitive: PrimitiveState.CONFIGURATION.TPL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWEF_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.BLINN_Tx1_T_FBGRA,
					}
				),
			}
		},
		LINE: {
			BASIC: {
				OPAQUE: new RenderPipelineDescriptor(
					{
						label: "[LINE.BASIC.OPAQUE]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.BASIC,
						primitive: PrimitiveState.CONFIGURATION.TLL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWET_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.BASIC_Tx1_O,
					}
				),
				OPAQUE_FBGRA: new RenderPipelineDescriptor(
					{
						label: "[LINE.BASIC.OPAQUE_FBGRA]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.BASIC,
						primitive: PrimitiveState.CONFIGURATION.TLL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWET_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.BASIC_Tx1_O_FBGRA,
					}
				),
				TRANSPARENT: new RenderPipelineDescriptor(
					{
						label: "[LINE.BASIC.TRANSPARENT]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.BASIC,
						primitive: PrimitiveState.CONFIGURATION.TLL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWEF_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.BASIC_Tx1_T,
					}
				),
				TRANSPARENT_FBGRA: new RenderPipelineDescriptor(
					{
						label: "[LINE.BASIC.TRANSPARENT_FBGRA]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.BASIC,
						primitive: PrimitiveState.CONFIGURATION.TLL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWEF_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.BASIC_Tx1_T_FBGRA,
					}
				)
			},
			LAMBERT: {
				OPAQUE: new RenderPipelineDescriptor(
					{
						label: "[LINE.LAMBERT.OPAQUE]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.LAMBERT,
						primitive: PrimitiveState.CONFIGURATION.TLL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWET_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.LAMBERT_Tx1_O,
					}
				),
				OPAQUE_FBGRA: new RenderPipelineDescriptor(
					{
						label: "[LINE.LAMBERT.OPAQUE_FBGRA]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.LAMBERT,
						primitive: PrimitiveState.CONFIGURATION.TLL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWET_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.LAMBERT_Tx1_O_FBGRA,
					}
				),
				TRANSPARENT: new RenderPipelineDescriptor(
					{
						label: "[LINE.LAMBERT.TRANSPARENT]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.LAMBERT,
						primitive: PrimitiveState.CONFIGURATION.TLL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWEF_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.LAMBERT_Tx1_T,
					}
				),
				TRANSPARENT_FBGRA: new RenderPipelineDescriptor(
					{
						label: "[LINE.LAMBERT.TRANSPARENT_FBGRA]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.LAMBERT,
						primitive: PrimitiveState.CONFIGURATION.TLL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWEF_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.LAMBERT_Tx1_T_FBGRA,
					}
				),
			},
			PHONG: {
				OPAQUE_FBGRA: new RenderPipelineDescriptor(
					{
						label: "[LINE.PHONG.OPAQUE_FBGRA]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.PHONG,
						primitive: PrimitiveState.CONFIGURATION.TLL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWET_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.PHONG_Tx1_O_FBGRA,
					}
				),
				TRANSPARENT_FBGRA: new RenderPipelineDescriptor(
					{
						label: "[LINE.PHONG.TRANSPARENT_FBGRA]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.PHONG,
						primitive: PrimitiveState.CONFIGURATION.TLL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWEF_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.PHONG_Tx1_T_FBGRA,
					}
				),
			},
			BLINN: {
				OPAQUE_FBGRA: new RenderPipelineDescriptor(
					{
						label: "[LINE.BLINN.OPAQUE_FBGRA]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.BLINN,
						primitive: PrimitiveState.CONFIGURATION.TLL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWET_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.BLINN_Tx1_O_FBGRA,
					}
				),
				TRANSPARENT_FBGRA: new RenderPipelineDescriptor(
					{
						label: "[LINE.BLINN.TRANSPARENT_FBGRA]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.BLINN,
						primitive: PrimitiveState.CONFIGURATION.TLL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWEF_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.BLINN_Tx1_T_FBGRA,
					}
				),
			}
		},
		TRIANGLE: {
			BASIC: {
				OPAQUE: new RenderPipelineDescriptor(
					{
						label: "[TRIANGLE.BASIC.OPAQUE]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.BASIC,
						primitive: PrimitiveState.CONFIGURATION.TTL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWET_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.BASIC_Tx1_O,
					}
				),
				OPAQUE_FBGRA: new RenderPipelineDescriptor(
					{
						label: "[TRIANGLE.BASIC.OPAQUE_FBGRA]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.BASIC,
						primitive: PrimitiveState.CONFIGURATION.TTL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWET_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.BASIC_Tx1_O_FBGRA,
					}
				),
				TRANSPARENT: new RenderPipelineDescriptor(
					{
						label: "[TRIANGLE.BASIC.TRANSPARENT]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.BASIC,
						primitive: PrimitiveState.CONFIGURATION.TTL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWEF_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.BASIC_Tx1_T,
					}
				),
				TRANSPARENT_FBGRA: new RenderPipelineDescriptor(
					{
						label: "[TRIANGLE.BASIC.TRANSPARENT_FBGRA]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.BASIC,
						primitive: PrimitiveState.CONFIGURATION.TTL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWEF_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.BASIC_Tx1_T_FBGRA,
					}
				)
			},
			LAMBERT: {
				OPAQUE: new RenderPipelineDescriptor(
					{
						label: "[TRIANGLE.LAMBERT.OPAQUE]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.LAMBERT,
						primitive: PrimitiveState.CONFIGURATION.TTL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWET_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.LAMBERT_Tx1_O,
					}
				),
				OPAQUE_FBGRA: new RenderPipelineDescriptor(
					{
						label: "[TRIANGLE.LAMBERT.OPAQUE_FBGRA]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.LAMBERT,
						primitive: PrimitiveState.CONFIGURATION.TTL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWET_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.LAMBERT_Tx1_O_FBGRA,
					}
				),
				TRANSPARENT: new RenderPipelineDescriptor(
					{
						label: "[TRIANGLE.LAMBERT.TRANSPARENT]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.LAMBERT,
						primitive: PrimitiveState.CONFIGURATION.TTL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWEF_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.LAMBERT_Tx1_T,
					}
				),
				TRANSPARENT_FBGRA: new RenderPipelineDescriptor(
					{
						label: "[TRIANGLE.LAMBERT.TRANSPARENT_FBGRA]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.LAMBERT,
						primitive: PrimitiveState.CONFIGURATION.TTL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWEF_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.LAMBERT_Tx1_T_FBGRA,
					}
				),
			},
			PHONG: {
				OPAQUE_FBGRA: new RenderPipelineDescriptor(
					{
						label: "[TRIANGLE.PHONG.OPAQUE_FBGRA]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.PHONG,
						primitive: PrimitiveState.CONFIGURATION.TTL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWET_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.PHONG_Tx1_O_FBGRA,
					}
				),
				TRANSPARENT_FBGRA: new RenderPipelineDescriptor(
					{
						label: "[TRIANGLE.PHONG.TRANSPARENT_FBGRA]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.PHONG,
						primitive: PrimitiveState.CONFIGURATION.TTL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWEF_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.PHONG_Tx1_T_FBGRA,
					}
				),
			},
			BLINN: {
				OPAQUE_FBGRA: new RenderPipelineDescriptor(
					{
						label: "[TRIANGLE.BLINN.OPAQUE_FBGRA]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.BLINN,
						primitive: PrimitiveState.CONFIGURATION.TTL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWET_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.BLINN_Tx1_O_FBGRA,
					}
				),
				TRANSPARENT_FBGRA: new RenderPipelineDescriptor(
					{
						label: "[TRIANGLE.BLINN.TRANSPARENT_FBGRA]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.BLINN,
						primitive: PrimitiveState.CONFIGURATION.TTL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWEF_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.BLINN_Tx1_T_FBGRA,
					}
				),
			}
		},
		SPRITE: {
			BASIC: {
				TRANSPARENT: new RenderPipelineDescriptor(
					{
						label: "[SPRITE.BASIC.TRANSPARENT]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.SPRITE_BASIC,
						primitive: PrimitiveState.CONFIGURATION.TTL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWEF_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.SPRITE_BASIC_Tx1_T,
					}
				),
				TRANSPARENT_FBGRA: new RenderPipelineDescriptor(
					{
						label: "[SPRITE.BASIC.TRANSPARENT_FBGRA]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.SPRITE_BASIC,
						primitive: PrimitiveState.CONFIGURATION.TTL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWEF_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.SPRITE_BASIC_Tx1_T_FBGRA,
					}
				)
			}
		},
		VN: {
			BASIC: {
				OPAQUE_FBGRA: new RenderPipelineDescriptor(
					{
						label: "[VN.BASIC.OPAQUE_FBGRA]",
						layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
						layout: null,
						vertex: VertexState.CONFIGURATION.VN,
						primitive: PrimitiveState.CONFIGURATION.TLL_FCCW_CN,
						depthStencil: DepthStencilState.CONFIGURATION.FP_DWET_DCLE,
						multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
						fragment: FragmentState.CONFIGURATION.VN_BASIC_Tx1_O_FBGRA,
					}
				),
			}
		},

		POSTPROCESS: {
			TONE_MAPPING: new RenderPipelineDescriptor(
				{
					label: "[POSTPROCESS.TONE_MAPPING]",
					layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.POSTPROCESS.UNFILTERABLE,
					layout: null,
					vertex: VertexState.CONFIGURATION.TONE_MAPPING,
					primitive: PrimitiveState.CONFIGURATION.TTL_FCCW_CN,
					depthStencil: DepthStencilState.CONFIGURATION.FP_DWET_DCLE,
					multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
					fragment: FragmentState.CONFIGURATION.TONE_MAPPING_Tx1_O_FBGRA,
				}
			),
			DILATION: new RenderPipelineDescriptor(
				{
					label: "[POSTPROCESS.DILATION]",
					layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.POSTPROCESS.UNFILTERABLE,
					layout: null,
					vertex: VertexState.CONFIGURATION.DILATION,
					primitive: PrimitiveState.CONFIGURATION.TTL_FCCW_CN,
					depthStencil: DepthStencilState.CONFIGURATION.FP_DWET_DCLE,
					multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
					fragment: FragmentState.CONFIGURATION.DILATION_Tx1_O_FBGRA,
				}
			),
			PIXELIZATION: new RenderPipelineDescriptor(
				{
					label: "[POSTPROCESS.PIXELIZATION]",
					layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.POSTPROCESS.UNFILTERABLE,
					layout: null,
					vertex: VertexState.CONFIGURATION.PIXELIZATION,
					primitive: PrimitiveState.CONFIGURATION.TTL_FCCW_CN,
					depthStencil: DepthStencilState.CONFIGURATION.FP_DWET_DCLE,
					multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
					fragment: FragmentState.CONFIGURATION.PIXELIZATION_Tx1_O_FBGRA,
				}
			),
			COPY_TEXTURE: new RenderPipelineDescriptor(
				{
					label: "[POSTPROCESS.COPY_TEXTURE]",
					layoutDescriptor: PipelineLayoutDescriptor.CONFIGURATION.RENDER.POSTPROCESS.UNFILTERABLE,
					layout: null,
					vertex: VertexState.CONFIGURATION.COPY_TEXTURE,
					primitive: PrimitiveState.CONFIGURATION.TTL_FCCW_CN,
					depthStencil: DepthStencilState.CONFIGURATION.FP_DWET_DCLE,
					multisample: MultisampleState.CONFIGURATION.C1_M0xFFFFFFFF,
					fragment: FragmentState.CONFIGURATION.COPY_TEXTURE_Tx1_O_FBGRA,
				}
			),
		},
	};


	#vertex;
	#primitive;
	#depthStencil;
	#multisample;
	#fragment;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : RenderPipelineDescriptor.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : RenderPipelineDescriptor.DEFAULT.NAME,
				label: (args.label !== undefined) ? args.label : RenderPipelineDescriptor.DEFAULT.LABEL,
				division: (args.division !== undefined) ? args.division : RenderPipelineDescriptor.DEFAULT.DIVISION,

				dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : RenderPipelineDescriptor.DEFAULT.DIRTY_CACHE.clone(true),

				layout: (args.layout !== undefined) ? args.layout : RenderPipelineDescriptor.DEFAULT.LAYOUT,
			}
		);

		this.vertex = (args.vertex !== undefined) ? args.vertex : RenderPipelineDescriptor.DEFAULT.VERTEX;
		this.primitive = (args.primitive !== undefined) ? args.primitive : RenderPipelineDescriptor.DEFAULT.PRIMITIVE;
		this.depthStencil = (args.depthStencil !== undefined) ? args.depthStencil : RenderPipelineDescriptor.DEFAULT.DEPTH_STENCIL;
		this.multisample = (args.multisample !== undefined) ? args.multisample : RenderPipelineDescriptor.DEFAULT.MULTISAMPLE;
		this.fragment = (args.fragment !== undefined) ? args.fragment : RenderPipelineDescriptor.DEFAULT.FRAGMENT;
	}


	get vertex() { return this.#vertex; }
	set vertex(vertex) { this.#vertex = vertex; }
	get primitive() { return this.#primitive; }
	set primitive(primitive) { this.#primitive = primitive; }
	get depthStencil() { return this.#depthStencil; }
	set depthStencil(depthStencil) { this.#depthStencil = depthStencil; }
	get multisample() { return this.#multisample; }
	set multisample(multisample) { this.#multisample = multisample; }
	get fragment() { return this.#fragment; }
	set fragment(fragment) { this.#fragment = fragment; }
};
