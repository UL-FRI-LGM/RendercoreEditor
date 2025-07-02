//////////////////////////////////////////////////////////////////////////////////
// DEF
//////////////////////////////////////////////////////////////////////////////////

struct TextureData {
    textureSize: vec2<f32>,
    texelSize: vec2<f32>,
};

struct u_MaterialBlock {
	pixelSize: u32,
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

	var output: o_FragmentOutput;


	var pixelSize: u32 = u_Material.pixelSize;	// 5

	var position_viewportspace = input.position_viewportspace;


	// var textureSize: vec2<f32> = textureDimensions(u_MaterialTexture0, 0).xy;
	// var fragCoord: vec2<f32> = position_viewportspace.xy;
	var textureData: TextureData = TextureData(
		vec2<f32>(textureDimensions(u_MaterialTexture0, 0)),
		1.0 / vec2<f32>(textureDimensions(u_MaterialTexture0, 0)),
	);


	var x: f32 = f32(u32(position_viewportspace.x) % pixelSize);
	var y: f32 = f32(u32(position_viewportspace.y) % pixelSize);

	x = floor(f32(pixelSize) / 2.0) - x;
	y = floor(f32(pixelSize) / 2.0) - y;

	x = position_viewportspace.x + x;
	y = position_viewportspace.y + y;


	output.color = textureSample(u_MaterialTexture0, u_MaterialSampler0, vec2<f32>(x, y) / textureData.textureSize);


	return output;
}
