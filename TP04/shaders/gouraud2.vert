#version 330

// input attributes 
layout(location = 0) in vec3 position;
layout(location = 1) in vec3 normal;
layout(location = 2) in vec3 face;

uniform mat4 mdvMat; // modelview matrix (constant for all the vertices)
uniform mat4 projMat; // projection matrix (constant for all the vertices)

uniform vec3 light;

// special matrix for transforming a normal in the view space
// normal matrix = transpose(inverse(upperleft3x3(mdvMat))
// removes the (bad) scale effects contained in the mdv matrix
uniform mat3 normalMat; // normal matrix (constant for all the vertices)

// output variables that will be interpolated during rasterization (equivalent to varying)
out vec4 fragmentColor;

void main() {
  gl_Position = projMat*mdvMat*vec4(position,1.0);

  //the Phong model is given by:  ambientColor + surfaceColorDifuse(dot(normal,light)) + surfaceColorSpectular(dot(reflec,e)^ec)
  //normalView = vec3(mdv*vec4(normalWorld,0));

  vec3 ambientColor = vec3(0.0,0.0,0.0);
  vec3 surfaceColorDifuse = vec3(0.95f,0.90f,0.95f); //silver
  vec3 surfaceColorSpectular = vec3(0.95,0.90,0.95);

  float ec = 2.5f;

  vec3 normalView = normal*normalMat;

  float normalLight=max(dot(normalView,light),0);

 fragmentColor = vec4((ambientColor+ surfaceColorDifuse*normalLight + surfaceColorSpectular*pow(max(dot(reflect(normalView,light),vec3(0.0,0.0,1)),0),ec)),1.0);


}
