//////////////////////////////////////////////////////////////////////////////////
// DEF
//////////////////////////////////////////////////////////////////////////////////

struct _MODE_ {
	REINHARD: f32,
	EXPOSURE: f32,
};

const MODE: _MODE_ = _MODE_(0.0, 1.0);


struct u_MaterialBlock {
	MODE: f32,
	gamma: f32,
	exposure: f32,
	// null: f32,
};


//////////////////////////////////////////////////////////////////////////////////
// UIO
//////////////////////////////////////////////////////////////////////////////////

@group(0) @binding(0) var<uniform> u_Material: u_MaterialBlock;
@group(0) @binding(10) var u_MaterialTexture0: texture_2d<f32>;
@group(0) @binding(20) var u_MaterialSampler0: sampler;


struct v_VertexOutputFragmentInput {
	@builtin(position) position_clipspace: vec4<f32>,

	@location(0) v_uv_texturespace: vec2<f32>,
};

struct o_FragmentOutput {
	@location(0) ldrColor: vec4<f32>
}


//////////////////////////////////////////////////////////////////////////////////
// FUNC
//////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////
// MAIN
//////////////////////////////////////////////////////////////////////////////////

@fragment
fn main(input: v_VertexOutputFragmentInput) -> o_FragmentOutput {

	var output: o_FragmentOutput;


	//FINAL SHADER
	//const float gamma = 2.2;
	//const float exposure = 1.0;
	var hdrColor: vec4<f32> = textureSample(u_MaterialTexture0, u_MaterialSampler0, input.v_uv_texturespace).rgba; //input color

	var mapped: vec3<f32>;
	if (u_Material.MODE == MODE.REINHARD) {
		// Reinhard tone mapping
		mapped = hdrColor.rgb / (hdrColor.rgb + vec3<f32>(1.0));
	} else if (u_Material.MODE == MODE.EXPOSURE) {
		// exposure tone mapping
		mapped = vec3<f32>(1.0) - exp(-hdrColor.rgb * u_Material.exposure);
	}
	
	// gamma correction 
	mapped = pow(mapped, vec3<f32>(1.0 / u_Material.gamma));


	output.ldrColor = vec4<f32>(mapped, 1.0);


	return output;
}
