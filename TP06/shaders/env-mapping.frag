#version 330

in  vec3 normalView;
in  vec3 tangentView;
in  vec3 eyeView;
in  vec2 uvcoord;

out vec4 bufferColor;

uniform vec3      light;

uniform sampler2D envmap;


float PI =3.1415926535897932384626433832795;


vec2 convert3dto2d(vec3 v){
    vec2 retorno;

    retorno.x=(atan(v.x,v.z)+PI)/(PI*2);
    retorno.y=acos(-v.y)/PI;

    return retorno;
}

void main() {
  float et      = 10.0;

  vec4 envColor = texture2D(envmap,uvcoord);



  vec3 n = normalize(normalView);
  vec3 e = normalize(eyeView);
  vec3 l = normalize(light);
  vec3 t = normalize(tangentView);

  //Convertir la normal en coordenadas
  vec2 newCoords = convert3dto2d(n);
  //calcular textura

  vec4 envTex = texture2D(envmap,newCoords);


   bufferColor = envTex;
}
