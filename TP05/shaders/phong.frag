#version 330


// TODO: declare a uniform texture (uniform sampler2D) and make the link in the CPU side (exercice 3)
// TODO: use texture coordinates and texture to apply modify the shading (exercice 3)


in  vec3 normalView;
in  vec3 eyeView;
in  vec2 coordsSend;

out vec4 bufferColor;

uniform vec3 light;

uniform sampler2D tex;

void main() {
  // Phong parameters (colors and roughness)
  const vec3 ambient  = vec3(0.3,0.3,0.2);
  const vec3 diffuse  = vec3(0.3,0.5,0.8);
  const vec3 specular = vec3(0.8,0.2,0.2);
  const float et = 50.0;

  // normal / view and light directions (in camera space)
  vec3 n = normalize(normalView);
  vec3 e = normalize(eyeView);
  vec3 l = normalize(light);

  // diffuse and specular components of the phong shading model
  float diff = max(dot(l,n),0.0);
  float spec = pow(max(dot(reflect(l,n),e),0.0),et);

  // final color 
  vec3 color = ambient + diff*diffuse + spec*specular;
  //bufferColor = vec4(color,1.0);

  // TODO: displayed rasterized texture coordinates (exercice 1)
  //vec3 raste = color*vec3(coordsSend,1);
  //bufferColor = vec4(raste,1.0);

  //Exo 3
  vec4 textura = texture2D(tex,coordsSend);
  textura = textura*vec4(color,1);
  bufferColor = textura;
}

