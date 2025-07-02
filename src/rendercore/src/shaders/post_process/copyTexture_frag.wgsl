//////////////////////////////////////////////////////////////////////////////////
// DEF
//////////////////////////////////////////////////////////////////////////////////

struct TextureData {
    textureSize: vec2<f32>,
    texelSize: vec2<f32>,
};

struct u_MaterialBlock {
	data: vec4<f32>,
};


//////////////////////////////////////////////////////////////////////////////////
// UIO
//////////////////////////////////////////////////////////////////////////////////

@group(0) @binding(0) var<uniform> u_Material: u_MaterialBlock;
@group(0) @binding(10) var u_MaterialTexture0: texture_2d<f32>;
@group(0) @binding(20) var u_MaterialSampler0: sampler;


struct v_VertexOutputFragmentInput {
	@builtin(position) position_viewportspace: vec4<f32>,

	@location(0) v_uv_texturespace: vec2<f32>,
};

struct o_FragmentOutput {
	@location(0) color: vec4<f32>
}


//////////////////////////////////////////////////////////////////////////////////
// FUNC
//////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////
// MAIN
//////////////////////////////////////////////////////////////////////////////////

@fragment
fn main(input: v_VertexOutputFragmentInput) -> o_FragmentOutput {

	var output: o_FragmentOutput = o_FragmentOutput(vec4<f32>(0.0, 0.0, 0.0, 0.0));


	let position_viewportspace: vec4<f32> = input.position_viewportspace;

	let uv: vec2<f32> = input.v_uv_texturespace;


	let textureData: TextureData = TextureData(
		vec2<f32>(textureDimensions(u_MaterialTexture0, 0)),
		1.0 / vec2<f32>(textureDimensions(u_MaterialTexture0, 0)),
	);


	// output.color = textureSample(u_MaterialTexture0, u_MaterialSampler0, position_viewportspace.xy / textureData.textureSize);
	output.color = textureSample(u_MaterialTexture0, u_MaterialSampler0, uv);


	return output;
}
