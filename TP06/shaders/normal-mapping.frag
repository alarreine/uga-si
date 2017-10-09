#version 330

in  vec3 normalView;
in  vec3 tangentView;
in  vec3 eyeView;
in  vec2 uvcoord;

out vec4 bufferColor;

uniform vec3      light;
uniform sampler2D colormap;
uniform sampler2D ambientmap;
uniform sampler2D normalmap;

void main() {
  float et      = 10.0;
  vec4 texColor = texture(colormap,uvcoord);
  vec4 aoColor = texture(ambientmap,uvcoord);
  vec4 normalColor = texture(normalmap,uvcoord);



  vec3 n = normalize(normalView);
  vec3 e = normalize(eyeView);
  vec3 l = normalize(light);
  vec3 t = normalize(tangentView);

  //calcular TangenteBinormalNormal TBN

  //Binormal is B=NxT
  vec3 B = cross(n,t);

  mat3 tbn = mat3(t,B,n);

  vec3 newNormalTbn = tbn*(normalColor.xyz - 0.5) * 2; // restamos para remapear la textura de -1 a 1. porque estaba de 0 a 1

  //Second computation with newNormalTbn
  float diff = max(dot(l,newNormalTbn),0.);
  float spec = pow(max(dot(reflect(l,newNormalTbn),e),0.0),et);

  //bufferColor = texColor*(diff + spec)*2.0;
  //exo1
   bufferColor = (texColor*(diff + spec)*2.0)*aoColor;
}
