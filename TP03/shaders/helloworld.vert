#version 330

// starting from OpenGL 3.3 it is possible to use this syntax to make the relations with arrays
layout(location = 0) in vec3 position;
layout(location = 1) in vec3 normal;
layout(location = 2) in vec3 face;

uniform mat4 mvp; // modelview projection matrix (constant for all the vertices)
uniform float myVariable;

out vec3 rasterizedNormal; // normal (will be rasterized from vertex to fragment shader)

void main() {

    vec3 pos = position;


            //pos.y = pos.y + sin(myVariable*myVariable*0.05) * pos.x/6;
             pos.y = pos.y -  pow(pos.y,myVariable/50);
             pos.x = pos.x -  pow(pos.x,myVariable/50);
             pos.z = pos.z -  pow(pos.z,myVariable/50);




  gl_Position = mvp*vec4(pos,1.0);



  rasterizedNormal =normal*face;
}
