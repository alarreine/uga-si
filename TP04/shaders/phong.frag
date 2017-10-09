#version 330

in  vec4 fragmentColor;
out vec4 bufferColor;

uniform vec3 light;

//uniform mat3 normalMat;

in vec3 eyeView;

void main() {

    //the Phong model is given by:  ambientColor + surfaceColorDifuse(dot(normal,light)) + surfaceColorSpectular(dot(reflec,e)^ec)
    //normalView = vec3(mdv*vec4(normalWorld,0));

    vec3 fragmentColorN = normalize(fragmentColor.xyz);

    vec3 ambientColor = vec3(0.0,0.0,0.0);
    vec3 surfaceColorDifuse = vec3(0.95f,0.90f,0.95f); //silver
    vec3 surfaceColorSpectular = vec3(0.95,0.90,0.95);

    float ec = 50.0f;

    vec3 e = normalize(eyeView);

    //vec3 normalView = normal*normalMat;

    //float normalLight=max(dot(normalView,light),0);
     float normalLight=max(dot(fragmentColorN,light),0);

  bufferColor = vec4((ambientColor+ surfaceColorDifuse*normalLight + surfaceColorSpectular*pow(max(dot(reflect(fragmentColorN,light),e),0),ec)),1.0);
}
