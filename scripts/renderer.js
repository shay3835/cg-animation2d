import {Matrix} from "matrix.js";
import * as matrixGeneration from "./transforms";
export class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // limit_fps_flag:      bool 
    // fps:                 int
    constructor(canvas, limit_fps_flag, fps) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.slide_idx = 0;
        this.limit_fps = limit_fps_flag;
        this.fps = fps;
        this.start_time = null;
        this.prev_time = null;
        this.ballCenter = Matrix.Vector3(100, 300, 1);
        this.ballRadius = 50;
        this.ball = this.getCircleVerts({x:100,y:300},50,20);
        this.ballSpeed = {x:0, y:-1}
    }

    // flag:  bool
    limitFps(flag) {
        this.limit_fps = flag;
    }

    // n:  int
    setFps(n) {
        this.fps = n;
    }

    // idx: int
    setSlideIndex(idx) {
        this.slide_idx = idx;
    }

    animate(timestamp) {
        // Get time and delta time for animation
        if (this.start_time === null) {
            this.start_time = timestamp;
            this.prev_time = timestamp;
        }
        let time = timestamp - this.start_time;
        let delta_time = timestamp - this.prev_time;
        //console.log('animate(): t = ' + time.toFixed(1) + ', dt = ' + delta_time.toFixed(1));

        // Update transforms for animation
        this.updateTransforms(time, delta_time);

        // Draw slide
        this.drawSlide();

        // Invoke call for next frame in animation
        if (this.limit_fps) {
            setTimeout(() => {
                window.requestAnimationFrame((ts) => {
                    this.animate(ts);
                });
            }, Math.floor(1000.0 / this.fps));
        }
        else {
            window.requestAnimationFrame((ts) => {
                this.animate(ts);
            });
        }

        // Update previous time to current one for next calculation of delta time
        this.prev_time = timestamp;
    }

    //
    updateTransforms(time, delta_time) {
        //console.log("running");
        // TODO: update any transformations needed for animation
        console.log(this.ballCenter.values[1][0])
        if(this.ballCenter.values[1][0] < 0 || this.ballCenter.values[1][0] > this.height){
            this.ballSpeed = this.ballSpeed * -1;
        }
        let ballTransform = new Matrix(3,3);
        matrixGeneration.mat3x3Translate(ballTransform, this.ballSpeed.x * delta_time * 0.1, this.ballSpeed.y * delta_time * 0.1);
        for (let index = 0; index < this.ball.length; index++) {
            this.ballCenter = ballTransform.mult(this.ballCenter);
            this.ball[index] = ballTransform.mult(this.ball[index]);
        }
    }
    
    //
    drawSlide() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0();
                break;
            case 1:
                this.drawSlide1();
                break;
            case 2:
                this.drawSlide2();
                break;
            case 3:
                this.drawSlide3();
                break;
        }
    }

    //
    drawSlide0() {
        // TODO: draw bouncing ball (circle that changes direction whenever it hits an edge)
        
        let teal = [0, 128, 128, 255];
        //console.log(this.ball);
        this.drawConvexPolygon(this.ball, teal);
    }

        // center:       object {x: __, y: __}
    // radius:       int
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    getCircleVerts(center, radius, num_edges) {
        let vertices = []
        let oldX = center.x + radius;
        let oldY = center.y;
        // TODO: draw a sequence of straight lines to approximate a circle
        for (let i = 0; i < num_edges; i++) {
            let t = i / parseFloat(num_edges-1);
            let x = Math.cos(t * Math.PI * 2) * radius + center.x;
            let y = Math.sin(t * Math.PI * 2) * radius + center.y;
            x = parseInt(x);
            y = parseInt(y);
            vertices.push(matrixGeneration.Vector3(x,y,1));
            oldX = x;
            oldY = y;
        }
        return vertices;
    }

    //
    drawSlide1() {
        // TODO: draw at least 3 polygons that spin about their own centers
        //   - have each polygon spin at a different speed / direction
        
        
    }

    //
    drawSlide2() {
        // TODO: draw at least 2 polygons grow and shrink about their own centers
        //   - have each polygon grow / shrink different sizes
        //   - try at least 1 polygon that grows / shrinks non-uniformly in the x and y directions


    }

    //
    drawSlide3() {
        // TODO: get creative!
        //   - animation should involve all three basic transformation types
        //     (translation, scaling, and rotation)
        
        
    }
    
    // vertex_list:  array of object [Matrix(3, 1), Matrix(3, 1), ..., Matrix(3, 1)]
    // color:        array of int [R, G, B, A]
    drawConvexPolygon(vertex_list, color) {
        this.ctx.fillStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (color[3] / 255) + ')';
        this.ctx.beginPath();
        let x = vertex_list[0].values[0][0] / vertex_list[0].values[2][0];
        let y = vertex_list[0].values[1][0] / vertex_list[0].values[2][0];
        this.ctx.moveTo(x, y);
        for (let i = 1; i < vertex_list.length; i++) {
            x = vertex_list[i].values[0][0] / vertex_list[i].values[2][0];
            y = vertex_list[i].values[1][0] / vertex_list[i].values[2][0];
            this.ctx.lineTo(x, y);
        }
        this.ctx.closePath();
        this.ctx.fill();
    }
}
