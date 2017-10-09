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


  //normalView = vec3(mdv*vec4(normalWorld,0));
  vec3 normalView = normal*normalMat;


  //lambertian model p(normalView*light) // produitscaler
  //p is the surface's color

  vec3 color = vec3(0.98f,0.89f,0.90f);
  float produitScaler=max(dot(normalView,light),0);

 fragmentColor = vec4(color*produitScaler,1.0);

}
