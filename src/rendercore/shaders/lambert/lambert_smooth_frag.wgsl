//////////////////////////////////////////////////////////////////////////////////
// DEF
//////////////////////////////////////////////////////////////////////////////////

struct u_Object3DBlock {
	MMat: mat4x4<f32>,
	NMat: mat4x4<f32>,
};


struct ALight {
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


struct u_ObjectBlock {
	MMat: mat4x4<f32>,
	NMat: mat4x4<f32>,
};
struct u_ObjectInstanceBlock {
	//MMats: array<mat4x4<f32>, 1000000>, //fixed size
	MMats: array<mat4x4<f32>>,  //runtime sized
};

struct u_CameraBlock {
	MMat: mat4x4<f32>,

	VMat: mat4x4<f32>,
	PMat: mat4x4<f32>,
};
struct u_ViewportBlock {
	x: f32,
	y: f32,
	width: f32,
	heigh: f32,
};
struct u_LightBlock {
	#if (ALIGHTS)
	aLights: array<ALight, ##NUM_ALIGHTS>,
	#fi
	#if (PLIGHTS)
	pLights: array<PLight, ##NUM_PLIGHTS>,
	#fi
};
struct u_MaterialBlock {
	emissive: vec4<f32>,
	diffuse: vec4<f32>,

	num_maps: vec4<u32>,
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


struct v_VertexOutputFragmentInput {
	@builtin(front_facing) front_facing: bool,

	@location(0) v_position_viewspace: vec4<f32>,
	@location(1) v_normal_viewspace: vec4<f32>,
	@location(2) v_viewDirection_viewspace: vec4<f32>,
	@location(15) v_uv : vec2<f32>,
};

struct o_FragmentOutput {
	@location(0) o_color: vec4<f32>,
};


//////////////////////////////////////////////////////////////////////////////////
// FUNC
//////////////////////////////////////////////////////////////////////////////////

fn PL_WS_TO_VS(light_ws: PLight) -> PLight {
	var light_vs: PLight;
	light_vs.position = u_Camera.VMat * vec4<f32>(light_ws.position.xyz, 1.0);
	light_vs.direction = u_Camera.VMat * vec4<f32>(light_ws.direction.xyz, 0.0);
	light_vs.colorIntensity = light_ws.colorIntensity;

	light_vs.constant = light_ws.constant;
	light_vs.linear = light_ws.linear;
	light_vs.quadratic = light_ws.quadratic;
	light_vs.distance = light_ws.distance;


	return light_vs;
}

fn calculateAttenuation(constant: f32, linear: f32, quadratic: f32, distance: f32) -> f32 {
	return 1.0 / (constant + linear * distance + quadratic * (distance * distance));
}

fn calculateAmbientLight(light: ALight) -> vec3<f32> {
	// return light.colorIntensity.rgb * light.colorIntensity.a;
	return light.colorIntensity.rgb * light.colorIntensity.a * (u_Material.diffuse.rgb);
}
fn calculatePointLight(light: PLight, position: vec4<f32>, normal: vec3<f32>, viewDir: vec3<f32>) -> vec3<f32> {

	var distance: f32 = length(light.position.xyz - position.xyz);
	if (light.distance > 0.0 && distance > light.distance) {
		return vec3<f32>(0.0, 0.0, 0.0);
	}

	var lightDirection: vec3<f32> = normalize(light.position.xyz - position.xyz);

	// Difuse
	var diffuseF: f32 = max(dot(lightDirection, normal), 0.0f);

	// Attenuation
	var attenuation: f32 = calculateAttenuation(light.constant, light.linear, light.quadratic, distance);

	// Combine results
	var color: vec3<f32> = light.colorIntensity.rgb * light.colorIntensity.a;
	var diffuse: vec3<f32> = color * diffuseF * u_Material.diffuse.rgb * attenuation;


	return diffuse;
}


//////////////////////////////////////////////////////////////////////////////////
// MAIN
//////////////////////////////////////////////////////////////////////////////////

@fragment
fn main(input: v_VertexOutputFragmentInput) -> o_FragmentOutput {

	var output: o_FragmentOutput;


	var color: vec3<f32> = u_Material.emissive.rgb * u_Material.emissive.a;
	var alpha: f32 = u_Material.diffuse.a;

	var normal_viewspace: vec3<f32> = mix(-input.v_normal_viewspace.xyz, input.v_normal_viewspace.xyz, f32(input.front_facing));

	#if (ALIGHTS)
	var AL: ALight;
	#for lightIdx in 0 to NUM_ALIGHTS
	AL = u_Light.aLights[##lightIdx];
	color += calculateAmbientLight(AL);
	#end
	#fi

	#if (PLIGHTS)
	var PL: PLight;
	#for lightIdx in 0 to NUM_PLIGHTS
	PL = PL_WS_TO_VS(u_Light.pLights[##lightIdx]);
	color += calculatePointLight(PL, input.v_position_viewspace, normal_viewspace, input.v_viewDirection_viewspace.xyz);
	#end
	#fi

	color *= textureSample(u_MaterialTexture0, u_MaterialSampler0, input.v_uv).rgb;
	alpha *= textureSample(u_MaterialTexture0, u_MaterialSampler0, input.v_uv).a;
	color *= textureSample(u_MaterialTexture1, u_MaterialSampler1, input.v_uv).rgb;
	alpha *= textureSample(u_MaterialTexture1, u_MaterialSampler1, input.v_uv).a;
	color *= textureSample(u_MaterialTexture2, u_MaterialSampler2, input.v_uv).rgb;
	alpha *= textureSample(u_MaterialTexture2, u_MaterialSampler2, input.v_uv).a;
	color *= textureSample(u_MaterialTexture3, u_MaterialSampler3, input.v_uv).rgb;
	alpha *= textureSample(u_MaterialTexture3, u_MaterialSampler3, input.v_uv).a;

	output.o_color = vec4<f32>(color, alpha);


	return output;
}
