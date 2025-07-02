//////////////////////////////////////////////////////////////////////////////////
// DEF
//////////////////////////////////////////////////////////////////////////////////

struct TextureData {
    textureSize: vec2<u32>,
    texelSize: vec2<f32>,
};

struct u_MaterialBlock {
	size: u32,
	separation: f32,
	minThreshold: f32,
	maxThreshold: f32,
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


	var size: u32 = u_Material.size;					// 4
	var separation: f32 = u_Material.separation;		// 2.0
	var minThreshold: f32 = u_Material.minThreshold;	// 0.125
	var maxThreshold: f32 = u_Material.maxThreshold;	// 0.25


	// var textureSize: vec2<f32> = textureDimensions(u_MaterialTexture0, 0).xy;
	// var fragCoord: vec2<f32> = gl_FragCoord.xy;
	var textureData: TextureData = TextureData(
		textureDimensions(u_MaterialTexture0, 0),
		1.0 / vec2<f32>(textureDimensions(u_MaterialTexture0, 0)),
	);


	var color: vec4<f32> = textureSample(u_MaterialTexture0, u_MaterialSampler0, input.v_uv_texturespace).rgba; //input color
	var max_luma: f32 = 0.0;
	var max_color: vec4<f32> = color;

	for (var i: i32 = -i32(size); i <= i32(size); i++) {
		for (var j: i32 = -i32(size); j <= i32(size); j++) {
			// rectangular shape
			// if (false) { continue; };

			// diamond shape
			//if (!(abs(i) <= size - abs(j))) { continue; }

			// circular shape
			//if (!(distance(vec2<f32>(f32(i), f32(j)), vec2<f32>(f32(0), f32(0))) <= f32(size))) { continue; }
			if (!(length(vec2<f32>(f32(i), f32(j))) <= f32(size))) { continue; }


			//var current_color: vec4<f32> = textureSample(u_MaterialTexture0, u_MaterialSampler0, (gl_FragCoord.xy + (vec2<f32>(f32(i), f32(j)) * separation)) / textureData.textureSize);
			var current_color: vec4<f32> = textureSample(u_MaterialTexture0, u_MaterialSampler0, (input.v_uv_texturespace + vec2<f32>(f32(i), f32(j)) * separation * textureData.texelSize)).rgba;


			var current_luma: f32 = dot(current_color.rgb, vec3(0.21, 0.72, 0.07));


			if (current_luma > max_luma) {
				max_luma  = current_luma;
				max_color = current_color;
			}
		}
	}


	output.color = mix(color.rgba, max_color.rgba, smoothstep(minThreshold, maxThreshold, max_luma));


	return output;
}
