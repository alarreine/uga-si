#include "viewer.h"

#include <math.h>
#include <iostream>

using namespace std;

Viewer::Viewer(const QGLFormat &format,const QString &)
    : QGLWidget(format),
      _timer(this) {

    _timer.setInterval(10);
    connect(&_timer,SIGNAL(timeout()),this,SLOT(updateGL()));
}

void Viewer::generateRandomPoints() {

    for (int i =0 ; i<10;i++){

        Point p = {randv2(-1.0,1.0),
                   randv2(-1.0,1.0),
                   randv3(-1.0,1.0),
                   randf(10,30)};
        _points.push_back(p);
    }


}



void Viewer::updatePointPositions() {
    for(int i = 0; i < _points.size(); ++i){
        if (_points[i].pos.x <= -1 || _points[i].pos.x >= 1) {
            _points[i].dir.x = _points[i].dir.x * -1;
            _points[i].dir.y = _points[i].dir.y * randf(-1,1);
        }
        if (_points[i].pos.y <= -1 || _points[i].pos.y >= 1) {
            _points[i].dir.y = _points[i].dir.y * -1;
            _points[i].dir.x = _points[i].dir.x * randf(-1,1);

        }
        _points[i].pos.x += _points[i].dir.x;
        _points[i].pos.y += _points[i].dir.y;
    }


}

void Viewer::paintGL() {
    // clear color and depth buffers
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

    glBegin(GL_TRIANGLE_STRIP);
    glColor3f(1.0,0.0,0.0); // set the current color
    glVertex3f(-1.0,1.0,0.0); // draw a vertex
    glVertex3f(-0.5,1.0,0.0); // draw another vertex
    glVertex3f(-1.0,-1.0,0.0); // draw another vertex

    glColor3f(1.0,1.0,0.0); // set the current color

    glVertex3f(-0.5,1.0,0.0); // draw another vertex
    glVertex3f(0.5,-1.0,0.0); // draw another vertex

    glColor3f(0.0,1.0,0.0); // set the current color
    glVertex3f(1.0,1.0,0.0); // draw a vertex

    glVertex3f(0.5,-1.0,0.0); // draw another vertex
    glEnd();

    updatePointPositions();
    for (int i=0;i<_points.size();i++){
        glPointSize(_points[i].size);
        glBegin(GL_POINTS);
        glColor3f(_points[i].col.x,_points[i].col.y,_points[i].col.z);
        glVertex3f(_points[i].pos.x,_points[i].pos.y,0.0);
        glEnd();

    }




    // TODO
}

void Viewer::resizeGL(int width,int height) {
    // TODO

}

void Viewer::keyPressEvent(QKeyEvent *ke) {

    // key a: play/stop animation
    if(ke->key()==Qt::Key_A) {
        if(_timer.isActive())
            _timer.stop();
        else
            _timer.start();
    }


    updateGL();
}

void Viewer::initializeGL() {
    // make this window the current one
    makeCurrent();
glEnable(GL_POINT_SMOOTH);
    // init and chack glew
    if(glewInit()!=GLEW_OK) {
        cerr << "Warning: glewInit failed!" << endl;
    }

    if(!GLEW_ARB_vertex_program   ||
            !GLEW_ARB_fragment_program ||
            !GLEW_ARB_texture_float    ||
            !GLEW_ARB_draw_buffers     ||
            !GLEW_ARB_framebuffer_object) {
        cerr << "Warning: Shaders not supported!" << endl;
    }

    // init OpenGL settings
    glClearColor(0.0,0.0,1.0,1.0);
    glDisable(GL_DEPTH_TEST);
    glPolygonMode(GL_FRONT_AND_BACK,GL_FILL);



    // initialize points
    generateRandomPoints();

    // starts the timer
    _timer.start();
}

