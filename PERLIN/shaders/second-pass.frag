#version 330

out vec4 bufferColor;

uniform vec3      light;
uniform sampler2D normalmap;
uniform sampler2D colormap;
uniform float time;

in vec2 texcoord;



vec4 shade(in vec2 coord) {
  vec4  nd = texture(normalmap,coord,0);
  vec4  c  = texture(colormap ,coord,0);

  vec3  n = nd.xyz;
  float d = nd.w;

  vec3 e = vec3(0,0,-1);
  vec3 l = normalize(light);
vec3 li = l*vec3(0,0,time/10);

  float diff = max(dot(li,n),0.0);
  float spec = pow(max(dot(reflect(li,n),e),0.0),d*10.0);

  return vec4(c.xyz*(diff + spec),1);
}

void main() {
  vec4 color = shade(texcoord);
  
  bufferColor = vec4(color);
}
