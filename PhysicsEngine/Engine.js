
var Engine = function() {
	var that = this;
	var _dt = 10;
	var _bodies = [];
	this.G = 6.67300;
	var _timer;
	var _updateCallback = function(b) {};
	var _updateBodyCallback = function(b) {};
	
	this.addBody = function(body) { _bodies.push(body); }

	var update = function() {
		_updateCallback(body);
	
		for(var i = 0; i < _bodies.length; i++) {
			var body = _bodies[i];
			for(var j = 0; j < _bodies.length; j++) {
				if(i == j) continue;
				
				var other = _bodies[j];
				var dist = body.getPosition().distanceTo(other.getPosition());
				
				var dir = other.getPosition().sub(body.getPosition());
				if(dist > body.getRadius() + other.getRadius()) {
					var f = (that.G  * body.getMass() * other.getMass()) / Math.pow(dist,2);
					dir = dir.normalized();
					var forces = dir.scaled(f);
					
					body.applyForces(forces);
				} else {
					var n = dir.normalized();
					var a1 = body.getVelocity().dot(n);
					var a2 = other.getVelocity().dot(n);
					var p = (2.0*(a1-a2)) / ((body.getMass() + other.getMass()));
					var s1 = n.scaled(other.getMass() * p);
					var s2 = n.scaled(body.getMass() * -p);
					var v1p = body.getVelocity().sub(s1);
					var v2p = other.getVelocity().sub(s2);
					body.setNextVelocity(v1p);
					other.setNextVelocity(v2p);
				}
				
			}
		}
		
		for(var i = 0; i < _bodies.length; i++) {
			var body = _bodies[i];
			// f = ma <=> a = f/m;
			var a = body.getForces().scaled(1/body.getMass());
			
			
			var v = (body.getNextVelocity()) 
				? body.getNextVelocity().add(a)
				: body.getVelocity().add(a);
			
			var x = v.scaled(Math.pow((_dt/100),2)/2).add(body.getPosition());
			
			body.setAcceleration(a);
			body.setVelocity(v);
			body.setPosition(x);
			
			body.setNextVelocity(false);
			body.setForces(new Vector(0,0));
			
			_updateBodyCallback(body);
		}

	}
	
	this.start = function() {
		_timer = setInterval(function() { update(); }, _dt);
	}
	
	this.stop = function() {
		clearInterval(_timer);
	}
	
	this.setUpdateCallback = function(cb) {
		_updateCallback = cb;
	}
	
	this.setUpdateBodyCallback = function(cb) {
		_updateBodyCallback = cb;
	}	
}