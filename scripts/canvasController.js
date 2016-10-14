CanvasController = (function() {
    CanvasController.prototype.canvas;
    var canvas, isDrawing, world;

    function CanvasController(target) {
        isDrawing = false;

        canvas = Sketch.create(target);// Use Sketch.js to make life much easier
        world = new World();

        canvas.setup = setup;
        canvas.spawn = function(x, y ) {
            console.log("I WAS USED");
            world.spawn(x, y);
        };
        canvas.draw = draw;
        canvas.mousedown = mousedown;
        canvas.mouseup = mouseup;
        canvas.mousemove = mousemove;
    }

    function setup() {
        for ( var i = 0; i < 200; i++ ) {
            world.spawn(random( this.width ), random( this.height ) );
        }
        world.setup();
        canvas.fillStyle = '#ff00ff';
    }

    function draw() {
        // Step the simulation
        world.step();

        // Render particles
        var particles = world.particles();
        for (var i = 0, n = particles.length; i < n; i++) {
            particles[i].draw(canvas)
        }
    }

    function mousedown() {
        isDrawing=true;
    }

    function mouseup() {
        isDrawing=false;
    }

    function mousemove() {
        if(isDrawing){
            world.spawn(canvas.mouse.x, canvas.mouse.y);
        }
        world.moveMouse(canvas.mouse.x, canvas.mouse.y);
    }

    return CanvasController;

})();
