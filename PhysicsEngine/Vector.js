
var Vector = function(x,y) {
	var that = this;
	this.x = x;
	this.y = y;
	
	this.distanceTo = function(other) {
		return Math.sqrt(Math.pow(other.x-that.x,2)+Math.pow(other.y-that.y,2));
	}
	
	this.distanceToSqrt = function(other) {
		return Math.pow(other.x-that.x,2)+Math.pow(other.y-that.y,2);
	}
	
	this.add = function(other) {
		return new Vector(that.x + other.x, that.y + other.y);
	}
	
	this.sub = function(other) {
		return new Vector(that.x - other.x, that.y - other.y);
	}
	
	this.length = function() {
		return Math.sqrt(that.x * that.x + that.y * that.y);
	}
	
	this.normalized = function() {
		var l = that.length();
		return new Vector(that.x / l, that.y / l);
	}
	
	this.scaled = function(s) {
		return new Vector(x * s, y * s);
	}
	
	this.toString = function() {
		return "("+x+","+y+")";
	}
	
	this.dot = function(other) {
		return (that.x*other.x + that.y*other.y);
	}
}