World = (function() {

    var COLOURS = ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423'];
    // Create a physics instance which uses the Verlet integration method

    function World() {
        this.physics = new Physics();
        this.physics.integrator = new Verlet();

        // Design some behaviours for particles
        this.avoidMouse = new Attraction();
        this.pullToCenter = new Attraction();

        // Allow particle collisions to make things interesting
        this.collision = new Collision();
    }

    World.prototype.setup = function (width, height) {
        this.pullToCenter.target.x = width / 2;
        this.pullToCenter.target.y = height / 2;
        this.pullToCenter.strength = 120;

        this.avoidMouse.setRadius(60);
        this.avoidMouse.strength = -1000;
    };

    World.prototype.spawn = function (x, y) {
        // Create a particle
        var particle = new Particle(Math.random());
        var position = new Vector(x, y);
        particle.setRadius(particle.mass * 10);
        particle.moveTo(position);
        particle.color =
            COLOURS[Math.floor(random(0, COLOURS.length - 1))];
        particle.wander = random(0.5, 2.0);
        particle.drag = random(0.9, 0.99);


        // Make it collidable
        this.collision.pool.push(particle);

        // Apply behaviours
        particle.behaviours.push(this.avoidMouse, this.collision);

        // Add to the simulation
        this.physics.particles.push(particle);
    };

    World.prototype.step = function () {
        // Step the simulation
        this.physics.step();
    };

    World.prototype.particles = function () {
        return this.physics.particles;
    };

    World.prototype.moveMouse = function (x, y) {
        this.avoidMouse.target.x = x;
        this.avoidMouse.target.y = y;
    };

    return World;

})();
