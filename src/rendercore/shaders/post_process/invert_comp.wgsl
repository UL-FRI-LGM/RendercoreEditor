//////////////////////////////////////////////////////////////////////////////////
// DEF
//////////////////////////////////////////////////////////////////////////////////

struct Params {
	filterDim: i32,
	blockDim: u32,
};


struct u_MaterialBlock {
	MODE: f32,
	gamma: f32,
	exposure: f32,
	// null: f32,
};


// var<workgroup> tile : array<array<vec3<f32>, 128>, 4>;
const WorkgroupSize: vec3<u32> = vec3<u32>(16, 16, 1);


//////////////////////////////////////////////////////////////////////////////////
// UIO
//////////////////////////////////////////////////////////////////////////////////

// @group(0) @binding(0) var samp : sampler;
// @group(0) @binding(1) var<uniform> params : Params;
// @group(1) @binding(1) var inputTex : texture_2d<f32>;
// @group(1) @binding(2) var outputTex : texture_storage_2d<rgba8unorm, write>;
@group(0) @binding(0) var<uniform> u_Material: u_MaterialBlock;
@group(0) @binding(10) var u_MaterialTexture0: texture_2d<f32>;

@group(0) @binding(11) var outputTex : texture_storage_2d<rgba8unorm, write>;

@group(0) @binding(20) var u_MaterialSampler0: sampler;


//////////////////////////////////////////////////////////////////////////////////
// FUNC
//////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////
// MAIN
//////////////////////////////////////////////////////////////////////////////////

@compute @workgroup_size(WorkgroupSize.x, WorkgroupSize.y, WorkgroupSize.z)
fn main(
	@builtin(workgroup_id) WorkGroupID : vec3<u32>,
	@builtin(local_invocation_id) LocalID : vec3<u32>,
	@builtin(global_invocation_id) GlobalID: vec3<u32>,
	@builtin(num_workgroups) NumWorkgroups: vec3<u32>,
) {

	let dims_I: vec2<u32> = textureDimensions(u_MaterialTexture0, 0);
	let dims_O: vec2<u32> = textureDimensions(outputTex);
	

	for (var y: u32 = GlobalID.y; y < dims_O.y; y += NumWorkgroups.y * WorkgroupSize.y) {
		for (var x: u32 = GlobalID.x; x < dims_O.x; x += NumWorkgroups.x * WorkgroupSize.x) {

			var compute_id: vec3<u32> = vec3<u32>(x, y, 1);

			var uv_u: vec2<u32> = compute_id.xy;
			var uv_f: vec2<f32> = (vec2<f32>(uv_u) + vec2<f32>(0.5, 0.5)) / vec2<f32>(dims_O);

			// var input: vec4<f32> = textureLoad(u_MaterialTexture0, uv_u, 0).rgba;
			var input: vec4<f32> = textureSampleLevel(u_MaterialTexture0, u_MaterialSampler0, uv_f, 0).rgba;
			
			// textureStore(outputTex, uv_u, vec4<f32>(vec3<f32>(WorkGroupID.xyz)/10.0, 1.0));
			// textureStore(outputTex, uv_u, vec4<f32>(1.0 - input.rgb, 1.0));
			if ((WorkGroupID.x + WorkGroupID.y) % 2 == 0) {
				textureStore(outputTex, uv_u, vec4<f32>(1.0 - input.rgb, 1.0));
			} else {
				textureStore(outputTex, uv_u, vec4<f32>(input.rgb, 1.0));
			}
		}
	}

}
