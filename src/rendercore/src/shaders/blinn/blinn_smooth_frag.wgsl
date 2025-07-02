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
	specular: vec4<f32>,

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

	@location(0) @interpolate(perspective, center) v_position_viewspace: vec4<f32>,
	@location(1) @interpolate(perspective, center) v_normal_viewspace: vec4<f32>,
	@location(2) @interpolate(perspective, center) v_viewDirection_viewspace: vec4<f32>,
	@location(15) @interpolate(perspective, center) v_uv_texturespace: vec2<f32>,
};

struct o_FragmentOutput {
	@location(0) o_color: vec4<f32>,
};


//////////////////////////////////////////////////////////////////////////////////
// FUNC
//////////////////////////////////////////////////////////////////////////////////

fn DL_WS_TO_VS(light_ws: DLight) -> DLight {
	var light_vs: DLight;
	light_vs.position = u_Camera.VMat * vec4<f32>(light_ws.position.xyz, 1.0);
	light_vs.direction = u_Camera.VMat * vec4<f32>(light_ws.direction.xyz, 0.0);
	light_vs.colorIntensity = light_ws.colorIntensity;


	return light_vs;
}
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
fn SL_WS_TO_VS(light_ws: SLight) -> SLight {
	var light_vs: SLight;
	light_vs.position = u_Camera.VMat * vec4<f32>(light_ws.position.xyz, 1.0);
	light_vs.direction = u_Camera.VMat * vec4<f32>(light_ws.direction.xyz, 0.0);
	light_vs.colorIntensity = light_ws.colorIntensity;

	light_vs.constant = light_ws.constant;
	light_vs.linear = light_ws.linear;
	light_vs.quadratic = light_ws.quadratic;
	light_vs.distance = light_ws.distance;

	light_vs.innerCutoff = light_ws.innerCutoff;
	light_vs.outerCutoff = light_ws.outerCutoff;


	return light_vs;
}

fn calculateAttenuation(constant: f32, linear: f32, quadratic: f32, distance: f32) -> f32 {
	return 1.0 / (constant + linear * distance + quadratic * (distance * distance));
}

fn calculateAmbientLight(light: ALight) -> vec3<f32> {
	// return light.colorIntensity.rgb * light.colorIntensity.a;
	return light.colorIntensity.rgb * light.colorIntensity.a * (u_Material.diffuse.rgb);
}
fn calculateDirectionalLight(light: DLight, normal: vec3<f32>, viewDirection: vec3<f32>) -> vec3<f32> {
	//vec3 lightDirection = normalize(light.position);
	var lightDirection: vec3<f32> = normalize(-light.direction.xyz);
	var halfwayDirection: vec3<f32> = normalize(lightDirection + viewDirection);

	// Diffuse
	var diffuseF: f32 = max(dot(normal, lightDirection), 0.0f);

	// Specular
	var specularF: f32 = pow(max(dot(normal, halfwayDirection), 0.0), u_Material.specular.a) * diffuseF;

	// Combine results
	var color: vec3<f32> = light.colorIntensity.rgb * light.colorIntensity.a;
	// var ambient: vec3<f32> = color * ambientF * u_Material.ambient.rgb;
	var diffuse: vec3<f32> = color * diffuseF * u_Material.diffuse.rgb;
	var specular: vec3<f32> = color * specularF * u_Material.specular.rgb;


	return diffuse + specular;
}
fn calculatePointLight(light: PLight, position: vec4<f32>, normal: vec3<f32>, viewDirection: vec3<f32>) -> vec3<f32> {

	var distance: f32 = length(light.position.xyz - position.xyz);
	if (light.distance > 0.0 && distance > light.distance) {
		return vec3<f32>(0.0, 0.0, 0.0);
	}

	var lightDirection: vec3<f32> = normalize(light.position.xyz - position.xyz);
	var halfwayDirection: vec3<f32> = normalize(lightDirection + viewDirection);

	// Diffuse
	var diffuseF: f32 = max(dot(normal, lightDirection), 0.0f);

	// Specular
	var specularF: f32 = pow(max(dot(normal, halfwayDirection), 0.0), u_Material.specular.a) * diffuseF;

	// Attenuation
	var attenuation: f32 = calculateAttenuation(light.constant, light.linear, light.quadratic, distance);

	// Combine results
	var color: vec3<f32> = light.colorIntensity.rgb * light.colorIntensity.a;
	// var ambient: vec3<f32> = color * ambientF * u_Material.ambient.rgb;
	var diffuse: vec3<f32> = color * diffuseF * u_Material.diffuse.rgb;
	var specular: vec3<f32> = color * specularF * u_Material.specular.rgb;


	return (diffuse + specular) * attenuation;
}
fn calculateSpotLight(light: SLight, position: vec4<f32>, normal: vec3<f32>, viewDirection: vec3<f32>) -> vec3<f32> {

	var distance: f32 = length(light.position.xyz - position.xyz);
	if (light.distance > 0.0 && distance > light.distance) {
		return vec3<f32>(0.0, 0.0, 0.0);
	}

	var lightDirection: vec3<f32> = normalize(light.position.xyz - position.xyz);
	var halfwayDirection: vec3<f32> = normalize(lightDirection + viewDirection);

	// Diffuse
	var diffuseF: f32 = max(dot(normal, lightDirection), 0.0f);

	// Specular
	var specularF: f32 = pow(max(dot(normal, halfwayDirection), 0.0), u_Material.specular.a) * diffuseF;

	// Attenuation
	var attenuation: f32 = calculateAttenuation(light.constant, light.linear, light.quadratic, distance);

	// intensity
	var theta: f32 = dot(lightDirection, normalize(-light.direction.xyz));
	var epsilon: f32 = light.innerCutoff - light.outerCutoff;
	var intensity: f32 = clamp((theta - light.outerCutoff) / epsilon, 0.0, 1.0);
	//if(theta <= light.innerCutoff) return vec3<f32>(0.0, 0.0, 0.0);

	// Combine results
	var color: vec3<f32> = light.colorIntensity.rgb * light.colorIntensity.a;
	// var ambient: vec3<f32> = color * ambientF * u_Material.ambient.rgb;
	var diffuse: vec3<f32> = color * diffuseF * u_Material.diffuse.rgb;
	var specular: vec3<f32> = color * specularF * u_Material.specular.rgb;


	return (diffuse + specular) * attenuation * intensity;
}


//////////////////////////////////////////////////////////////////////////////////
// MAIN
//////////////////////////////////////////////////////////////////////////////////

@fragment
fn main(input: v_VertexOutputFragmentInput) -> o_FragmentOutput {
	let normal_viewspace: vec3<f32> = normalize(mix(-input.v_normal_viewspace.xyz, input.v_normal_viewspace.xyz, f32(input.front_facing)));
	let viewDirection_viewspace: vec3<f32> = normalize(input.v_viewDirection_viewspace.xyz);
	// let viewDirection_viewspace: vec3<f32> = normalize(-input.v_position_viewspace.xyz);


	var output: o_FragmentOutput;


	var color: vec3<f32> = u_Material.emissive.rgb * u_Material.emissive.a;
	var alpha: f32 = u_Material.diffuse.a;


	for (var i_ALight: u32 = u32(0); i_ALight < u_Light.numALights; i_ALight++) {
		let AL: ALight = u_Light.ALights[i_ALight];
		color += calculateAmbientLight(AL);
	}

	for (var i_DLight: u32 = u32(0); i_DLight < u_Light.numDLights; i_DLight++) {
		let DL: DLight = DL_WS_TO_VS(u_Light.DLights[i_DLight]);
		color += calculateDirectionalLight(DL, normal_viewspace, viewDirection_viewspace);
	}

	for (var i_PLight: u32 = u32(0); i_PLight < u_Light.numPLights; i_PLight++) {
		let PL: PLight = PL_WS_TO_VS(u_Light.PLights[i_PLight]);
		color += calculatePointLight(PL, input.v_position_viewspace, normal_viewspace, viewDirection_viewspace);
	}

	for (var i_SLight: u32 = u32(0); i_SLight < u_Light.numSLights; i_SLight++) {
		let SL: SLight = SL_WS_TO_VS(u_Light.SLights[i_SLight]);
		color += calculateSpotLight(SL, input.v_position_viewspace, normal_viewspace, viewDirection_viewspace);
	}


	color *= textureSample(u_MaterialTexture0, u_MaterialSampler0, input.v_uv_texturespace).rgb;
	alpha *= textureSample(u_MaterialTexture0, u_MaterialSampler0, input.v_uv_texturespace).a;
	color *= textureSample(u_MaterialTexture1, u_MaterialSampler1, input.v_uv_texturespace).rgb;
	alpha *= textureSample(u_MaterialTexture1, u_MaterialSampler1, input.v_uv_texturespace).a;
	color *= textureSample(u_MaterialTexture2, u_MaterialSampler2, input.v_uv_texturespace).rgb;
	alpha *= textureSample(u_MaterialTexture2, u_MaterialSampler2, input.v_uv_texturespace).a;
	color *= textureSample(u_MaterialTexture3, u_MaterialSampler3, input.v_uv_texturespace).rgb;
	alpha *= textureSample(u_MaterialTexture3, u_MaterialSampler3, input.v_uv_texturespace).a;


	output.o_color = vec4<f32>(color, alpha);


	return output;
}
