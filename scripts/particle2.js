
// ----------------------------------------
// Particle Extention
// ----------------------------------------
Particle.prototype.draw = function( canvas ) {
    canvas.beginPath();
    canvas.arc( this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2 );
    canvas.fillStyle = this.color;
    canvas.fill();
};
