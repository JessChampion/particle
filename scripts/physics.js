// Create a physics instance which uses the Verlet integration method
var physics = new Physics();
physics.integrator = new Verlet();

// Design some behaviours for particles
var avoidMouse = new Attraction();
var pullToCenter = new Attraction();

// Allow particle collisions to make things interesting
var collision = new Collision();

var COLOURS = [ '#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423' ];

var isDrawing = false;

// Use Sketch.js to make life much easier
var example = Sketch.create({ container: document.body });

example.setup = function() {

    for ( var i = 0; i < 200; i++ ) {

        example.spawn(random( this.width ), random( this.height ) );
    }

    pullToCenter.target.x = this.width / 2;
    pullToCenter.target.y = this.height / 2;
    pullToCenter.strength = 120;

    avoidMouse.setRadius( 60 );
    avoidMouse.strength = -1000;

    example.fillStyle = '#ff00ff';
};

example.spawn = function( x, y ) {
    // Create a particle
    var particle = new Particle( Math.random() );
    var position = new Vector( x, y);
    particle.setRadius( particle.mass * 10 );
    particle.moveTo( position );
    particle.color =
        COLOURS[Math.floor(random( 0, COLOURS.length-1 ))];
    particle.wander = random( 0.5, 2.0 );
    particle.drag = random( 0.9, 0.99 );


    // Make it collidable
    collision.pool.push( particle );

    // Apply behaviours
    particle.behaviours.push( avoidMouse, collision );

    // Add to the simulation
    physics.particles.push( particle );
};

example.draw = function() {

    // Step the simulation
    physics.step();

    // Render particles
    for ( var i = 0, n = physics.particles.length; i < n; i++ ) {

        var particle = physics.particles[i];
        example.beginPath();
        example.arc( particle.pos.x, particle.pos.y, particle.radius, 0, Math.PI * 2 );
        example.fillStyle = particle.color;
        example.fill();
    }
};

example.mousedown = function () {
    isDrawing=true;
};

example.mouseup = function () {
    isDrawing=false;
}

example.mousemove = function() {
    if(isDrawing){
        example.spawn(example.mouse.x, example.mouse.y);
    }
    avoidMouse.target.x = example.mouse.x;
    avoidMouse.target.y = example.mouse.y;
};