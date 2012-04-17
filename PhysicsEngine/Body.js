 
var Body = function(id) {
	var that = this;
	this.id = id;
	var _position = new Vector(0,0);
	var _velocity = new Vector(0,0);
	var _acceleration  = new Vector(0,0);
	var _mass = 0;
	var _forces = new Vector(0,0);
	var _userdata;
	var _radius = 5;
	var _nextVelocity = false;
	
	this.setPosition = function(p) { _position = p; console.log(p.toString());}
	this.setVelocity = function(v) { _velocity = v; }
	this.setAcceleration = function(a) { _acceleration = a; }
	this.setMass = function(m) { _mass = m; }
	this.setForces = function(f) { _forces = f; }
	this.setUserdata = function(ud) { _userdata = ud; }
	this.setRadius = function(r) { _radius = r; }
	
	
	this.getPosition = function() { return _position; }
	this.getVelocity = function() { return _velocity; }
	this.getAcceleration = function() { return _acceleration; }
	this.getMass = function() { return _mass; }
	this.getForces = function() { return _forces; }
	this.getUserdata = function() { return _userdata; }
	this.getRadius = function() { return _radius; }
	
	
	this.applyForces = function(f) { _forces = _forces.add(f); }
	this.setNextVelocity = function(v) { 
		_nextVelocity = v;
	}
	this.getNextVelocity = function(v) { return _nextVelocity; }
	
	
	this.toString = function() {
		return "body :" + id + " - pos:" + _position.toString() + " - forces:" + _forces.toString();
	}
}