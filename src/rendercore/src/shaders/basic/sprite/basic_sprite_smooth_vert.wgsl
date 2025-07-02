//////////////////////////////////////////////////////////////////////////////////
// DEF
//////////////////////////////////////////////////////////////////////////////////

struct _SPACE_ {
	VIEW: f32,
	SCREEN: f32,
};

const SPACE: _SPACE_ = _SPACE_(0.0, 1.0);


struct u_Object3DBlock {
	MMat: mat4x4<f32>,
	NMat: mat4x4<f32>,
};


struct ALight {
	position: vec4<f32>,
	direction: vec4<f32>,
	colorIntensity: vec4<f32>,
};
struct DLight {
	position: vec4<f32>,
	direction: vec4<f32>,
	colorIntensity: vec4<f32>,
};
struct PLight {
	position: vec4<f32>,
	direction: vec4<f32>,
	colorIntensity: vec4<f32>,

	constant: f32,
	linear: f32,
	quadratic: f32,
	distance: f32,
};
struct SLight {
	position: vec4<f32>,
	direction: vec4<f32>,
	colorIntensity: vec4<f32>,

	constant: f32,
	linear: f32,
	quadratic: f32,
	distance: f32,

	innerCutoff: f32,
	outerCutoff: f32,
};

struct u_ObjectBlock {
	MMat: mat4x4<f32>,
	NMat: mat4x4<f32>,
};
struct u_ObjectInstanceBlock {
	//MMats: array<mat4x4<f32>, 1000000>, //fixed sized
	MMats: array<mat4x4<f32>>,  //runtime sized
};

struct u_CameraBlock {
	MMat: mat4x4<f32>,

	VMat: mat4x4<f32>,
	PMat: mat4x4<f32>,
	PMatInv: mat4x4<f32>,
};
struct u_ViewportBlock {
	x: f32,
	y: f32,
	width: f32,
	height: f32,
	minDepth: f32,
	maxDepth: f32,
};
struct u_LightBlock {
	numALights: u32,
	numDLights: u32,
	numPLights: u32,
	numSLights: u32,

	ALights: array<ALight, ##MAX_LIGHTS>,
	DLights: array<DLight, ##MAX_LIGHTS>,
	PLights: array<PLight, ##MAX_LIGHTS>,
	SLights: array<SLight, ##MAX_LIGHTS>,
};
struct u_MaterialBlock {
	emissive: vec4<f32>,
	diffuse: vec4<f32>,

	num_maps: vec4<u32>,

	SPACE: f32,
	// null: f32,
	// null: f32,
	// null: f32,
};


//////////////////////////////////////////////////////////////////////////////////
// UIO
//////////////////////////////////////////////////////////////////////////////////

@group(0) @binding(0) var<uniform> u_Camera: u_CameraBlock;
@group(0) @binding(1) var<uniform> u_Viewport: u_ViewportBlock;

@group(1) @binding(10) var<uniform> u_Light: u_LightBlock;
@group(2) @binding(0) var<uniform> u_Object: u_ObjectBlock;
//@group(2) @binding(1) var<uniform> u_ObjectInstance: u_ObjectInstanceBlock;
@group(2) @binding(1) var<storage, read> u_ObjectInstance: u_ObjectInstanceBlock;

@group(3) @binding(0) var<uniform> u_Material: u_MaterialBlock;

@group(3) @binding(10) var u_MaterialTexture0: texture_2d<f32>;
@group(3) @binding(11) var u_MaterialTexture1: texture_2d<f32>;
@group(3) @binding(12) var u_MaterialTexture2: texture_2d<f32>;
@group(3) @binding(13) var u_MaterialTexture3: texture_2d<f32>;
@group(3) @binding(20) var u_MaterialSampler0: sampler;
@group(3) @binding(21) var u_MaterialSampler1: sampler;
@group(3) @binding(22) var u_MaterialSampler2: sampler;
@group(3) @binding(23) var u_MaterialSampler3: sampler;
@group(3) @binding(32) var u_MaterialTextureArray: texture_2d_array<f32>;


struct i_VertexInput {
	@builtin(vertex_index) a_vertexIndex: u32,
	@builtin(instance_index) a_instanceIndex : u32,

	@location(0) a_position_objectspace: vec3<f32>,
	@location(1) a_normal_objectspace: vec3<f32>,
	@location(2) a_uv_texturespace: vec2<f32>,

	@location(3) a_direction: vec2<f32>,
	@location(4) a_magnitude: f32,
};

struct v_VertexOutputFragmentInput {
	@builtin(position) position_clipspace: vec4<f32>,

	@location(0) @interpolate(perspective, center) v_position_viewspace: vec4<f32>,
	// @location(1) @interpolate(perspective, center) v_normal_viewspace: vec4<f32>,
	// @location(2) @interpolate(perspective, center) v_viewDirection_viewspace: vec4<f32>,
	@location(15) @interpolate(perspective, center) v_uv_texturespace: vec2<f32>,
};


//////////////////////////////////////////////////////////////////////////////////
// FUNC
//////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////
// MAIN
//////////////////////////////////////////////////////////////////////////////////

@vertex
fn main(input: i_VertexInput) -> v_VertexOutputFragmentInput {

	var output: v_VertexOutputFragmentInput;


	if (u_Material.SPACE == SPACE.VIEW) {
		let positionOffset_viewspace: vec4<f32> = vec4<f32>(input.a_magnitude * input.a_direction, 0.0, 0.0);


		// elementspace -> objectspace
		var position_objectspace: vec4<f32> = u_ObjectInstance.MMats[input.a_instanceIndex] * vec4<f32>(input.a_position_objectspace.xyz, 1.0);
		// var normal_objectspace: vec4<f32> = u_ObjectInstance.MMats[input.a_instanceIndex] * vec4<f32>(input.a_normal_objectspace.xyz, 0.0); //TODO change this to NMats

		// objectspace -> worldspace
		var position_worldspace: vec4<f32> = u_Object.MMat * position_objectspace;
		// var normal_worldspace: vec4<f32> = u_Object.NMat * normal_objectspace;

		// worldspace -> viewspace + offset
		var position_viewspace: vec4<f32> = (u_Camera.VMat * position_worldspace) + positionOffset_viewspace;
		// var normal_viewspace: vec4<f32> = transpose(u_Camera.MMat) * normal_worldspace;
		// var viewDirection_viewspace: vec4<f32> = vec4<f32>(-position_viewspace.xyz, 0.0); // vec4<f32>(0.0, 0.0, 0.0, 1.0) - position_viewspace

		// viewspace -> clipspace
		var position_clipspace: vec4<f32> = u_Camera.PMat * position_viewspace;


		output.position_clipspace = position_clipspace;

		output.v_position_viewspace = position_viewspace;
		// output.v_normal_viewspace = normal_viewspace;
		// output.v_viewDirection_viewspace = viewDirection_viewspace;
		output.v_uv_texturespace = input.a_uv_texturespace;
	} else if (u_Material.SPACE == SPACE.SCREEN) {
		let positionOffset_screenspace: vec3<f32> = vec3<f32>(input.a_magnitude * input.a_direction, 0.0);


		// elementspace -> objectspace
		var position_objectspace: vec4<f32> = u_ObjectInstance.MMats[input.a_instanceIndex] * vec4<f32>(input.a_position_objectspace.xyz, 1.0);

		// objectspace -> worldspace
		var position_worldspace: vec4<f32> = u_Object.MMat * position_objectspace;

		// worldspace -> viewspace
		var position_viewspace: vec4<f32> = u_Camera.VMat * position_worldspace;

		// viewspace -> clipspace
		var position_clipspace: vec4<f32> = u_Camera.PMat * position_viewspace;

		// clipspace -> normspace (NDC + divisor)
		var position_normspace: vec4<f32> = vec4<f32>(position_clipspace.xyz / position_clipspace.w, 1.0 / position_clipspace.w);

		// normspace -> screenspace (framebuffer coords + depth) + offset
		var position_screenspace: vec3<f32> = vec3<f32>(
			u_Viewport.x + (position_normspace.x * 0.5 + 0.5) * u_Viewport.width,
			u_Viewport.y + (0.5 - position_normspace.y * 0.5) * u_Viewport.height,
			u_Viewport.minDepth + position_normspace.z * (u_Viewport.maxDepth - u_Viewport.minDepth)
		) + positionOffset_screenspace;

		// screenspace -> normspace
		position_normspace = vec4<f32>(
			((position_screenspace.x - u_Viewport.x) / u_Viewport.width - 0.5) / 0.5,
			((u_Viewport.y - position_screenspace.y) / u_Viewport.height + 0.5) / 0.5,
			(position_screenspace.z - u_Viewport.minDepth) / (u_Viewport.maxDepth - u_Viewport.minDepth),
			position_normspace.w
		);

		// normspace -> clipspace
		position_clipspace = vec4<f32>(position_normspace.xyz * position_clipspace.w, position_clipspace.w);

		// clipspace -> viewspace
		position_viewspace = u_Camera.PMatInv * position_clipspace;


		output.position_clipspace = position_clipspace;

		output.v_position_viewspace = position_viewspace;
		// output.v_normal_viewspace = normal_viewspace;
		// output.v_viewDirection_viewspace = viewDirection_viewspace;
		output.v_uv_texturespace = input.a_uv_texturespace;
	}


	return output;
}
