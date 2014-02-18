(function () { "use strict";
var $estr = function() { return js.Boot.__string_rec(this,''); };
var HxOverrides = function() { }
HxOverrides.__name__ = true;
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var Lambda = function() { }
Lambda.__name__ = true;
Lambda.map = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(x));
	}
	return l;
}
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	return l;
}
Lambda.fold = function(it,f,first) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	return first;
}
var List = function() {
	this.length = 0;
};
List.__name__ = true;
List.prototype = {
	iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,__class__: List
}
var _Map = {}
_Map.Map_Impl_ = function() { }
_Map.Map_Impl_.__name__ = true;
var IMap = function() { }
IMap.__name__ = true;
var Reflect = function() { }
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && v.__enum__ == null || t == "function" && (v.__name__ || v.__ename__) != null;
}
var Type = function() { }
Type.__name__ = true;
Type.getClass = function(o) {
	if(o == null) return null;
	return o.__class__;
}
Type.createInstance = function(cl,args) {
	switch(args.length) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
}
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
}
var haxe = {}
haxe.ds = {}
haxe.ds.IntMap = function() {
	this.h = { };
};
haxe.ds.IntMap.__name__ = true;
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,get: function(key) {
		return this.h[key];
	}
	,set: function(key,value) {
		this.h[key] = value;
	}
	,__class__: haxe.ds.IntMap
}
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = true;
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,__class__: haxe.ds.StringMap
}
var js = {}
js.Boot = function() { }
js.Boot.__name__ = true;
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					if(cl == Array) return o.__enum__ == null;
					return true;
				}
				if(js.Boot.__interfLoop(o.__class__,cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
}
var rpg = {}
rpg.Color = { __ename__ : true, __constructs__ : ["SUN","MOON","FIRE","WATER","TREE","GOLD","EARTH"] }
rpg.Color.SUN = ["SUN",0];
rpg.Color.SUN.toString = $estr;
rpg.Color.SUN.__enum__ = rpg.Color;
rpg.Color.MOON = ["MOON",1];
rpg.Color.MOON.toString = $estr;
rpg.Color.MOON.__enum__ = rpg.Color;
rpg.Color.FIRE = ["FIRE",2];
rpg.Color.FIRE.toString = $estr;
rpg.Color.FIRE.__enum__ = rpg.Color;
rpg.Color.WATER = ["WATER",3];
rpg.Color.WATER.toString = $estr;
rpg.Color.WATER.__enum__ = rpg.Color;
rpg.Color.TREE = ["TREE",4];
rpg.Color.TREE.toString = $estr;
rpg.Color.TREE.__enum__ = rpg.Color;
rpg.Color.GOLD = ["GOLD",5];
rpg.Color.GOLD.toString = $estr;
rpg.Color.GOLD.__enum__ = rpg.Color;
rpg.Color.EARTH = ["EARTH",6];
rpg.Color.EARTH.toString = $estr;
rpg.Color.EARTH.__enum__ = rpg.Color;
rpg.Dungeon = function() {
	this.name = "";
	this.depth = 1;
};
rpg.Dungeon.__name__ = true;
rpg.Dungeon.prototype = {
	spawnEnemies: function() {
		var zero = { attack : 0, block : 0, speed : 0, health : 0};
		return [rpg.Hero.create("hoge",zero,zero)];
	}
	,solveAuto: function(heros) {
		var result = { exp : { attack : 0, block : 0, speed : 0, health : 0}, battles : [], depth : 0};
		var id2hero = new haxe.ds.StringMap();
		var _g = 0;
		while(_g < heros.length) {
			var e = heros[_g];
			++_g;
			id2hero.set(e.getId(),e);
		}
		var _g1 = 0, _g = this.depth;
		while(_g1 < _g) {
			var i = _g1++;
			var enemies = this.spawnEnemies();
			var engine = new rpg.battle.Engine(heros,enemies);
			var friendAgent = new rpg.MonkeyAI(engine,0);
			var enemyAgent = new rpg.MonkeyAI(engine,1);
			while(!engine.isFinish()) {
				engine.execute(friendAgent);
				engine.execute(enemyAgent);
			}
			var $it0 = engine.getHeros();
			while( $it0.hasNext() ) {
				var e = $it0.next();
				var id = e.getHero().getId();
				if(id2hero.exists(id)) id2hero.get(id).setHp(e.getHp());
			}
			result.battles.push(engine.getResult());
		}
		return result;
	}
	,__class__: rpg.Dungeon
}
rpg.battle = {}
rpg.battle.Request = function() { }
rpg.battle.Request.__name__ = true;
rpg.battle.Request.prototype = {
	__class__: rpg.battle.Request
}
rpg.MonkeyAI = function(engine,friendTeam) {
	this.engine = engine;
	this.friendTeam = friendTeam;
};
rpg.MonkeyAI.__name__ = true;
rpg.MonkeyAI.__interfaces__ = [rpg.battle.Request];
rpg.MonkeyAI.prototype = {
	callback: function(turn,finish) {
	}
	,getCommands: function() {
		var friends = this.engine.getFriends(this.friendTeam);
		var enemies = this.engine.getEnemies(this.friendTeam);
		return Lambda.map(friends,function(friend) {
			var target = Lambda.fold(enemies,function(e,p) {
				return e.getHp() > 0?e.getId():p;
			},0);
			return { actor : friend.getId(), target : target, skill : 0};
		});
	}
	,__class__: rpg.MonkeyAI
}
rpg.Hero = function(id) {
	this.id = id;
	this.name = "";
	this.color = rpg.Color.SUN;
	this.plan = rpg.Plan.MONKEY;
	this.talent = { attack : 0, block : 0, speed : 0, health : 0};
	this.effort = { attack : 0, block : 0, speed : 0, health : 0};
	this.hp = 100;
	this.returnAt = new Date();
	this.skills = [new rpg.Skill()];
};
rpg.Hero.__name__ = true;
rpg.Hero.create = function(id,talent,effort) {
	var hero = new rpg.Hero(id);
	hero.talent = talent;
	hero.effort = effort;
	return hero;
}
rpg.Hero.calcParameter = function(talent,effort) {
	return Math.max(1,talent + effort / 4) | 0;
}
rpg.Hero.prototype = {
	getParameter: function() {
		return { attack : rpg.Hero.calcParameter(this.talent.attack,this.effort.attack), block : rpg.Hero.calcParameter(this.talent.block,this.effort.block), speed : rpg.Hero.calcParameter(this.talent.speed,this.effort.speed), health : rpg.Hero.calcParameter(this.talent.health,this.effort.health)};
	}
	,getSkill: function(idx) {
		return this.skills[idx];
	}
	,setHp: function(hp) {
		this.hp = hp;
	}
	,getHp: function() {
		return this.hp;
	}
	,getId: function() {
		return this.id;
	}
	,__class__: rpg.Hero
}
rpg.Plan = { __ename__ : true, __constructs__ : ["MONKEY"] }
rpg.Plan.MONKEY = ["MONKEY",0];
rpg.Plan.MONKEY.toString = $estr;
rpg.Plan.MONKEY.__enum__ = rpg.Plan;
rpg.Skill = function() {
	this.id = 0;
	this.name = "";
	this.color = rpg.Color.SUN;
	this.power = 100;
	this.hitRate = 100;
	this.target = rpg.Target.ENEMY;
	this.effect = rpg.Effect.ATTACK;
};
rpg.Skill.__name__ = true;
rpg.Skill.prototype = {
	getEffect: function() {
		return this.effect;
	}
	,__class__: rpg.Skill
}
rpg.Target = { __ename__ : true, __constructs__ : ["ENEMY"] }
rpg.Target.ENEMY = ["ENEMY",0];
rpg.Target.ENEMY.toString = $estr;
rpg.Target.ENEMY.__enum__ = rpg.Target;
rpg.Effect = { __ename__ : true, __constructs__ : ["ATTACK"] }
rpg.Effect.ATTACK = ["ATTACK",0];
rpg.Effect.ATTACK.toString = $estr;
rpg.Effect.ATTACK.__enum__ = rpg.Effect;
rpg.Util = function() { }
rpg.Util.__name__ = true;
rpg.Util.copy = function(v) {
	if(!Reflect.isObject(v)) return v; else if(js.Boot.__instanceof(v,String)) return v; else if(js.Boot.__instanceof(v,Array)) {
		var result = Type.createInstance(Type.getClass(v),[]);
		var _g1 = 0, _g = v.length;
		while(_g1 < _g) {
			var ii = _g1++;
			result.push(rpg.Util.copy(v[ii]));
		}
		return result;
	} else if(js.Boot.__instanceof(v,_Map.Map_Impl_)) {
		var result = Type.createInstance(Type.getClass(v),[]);
		var keys = v.keys();
		while( keys.hasNext() ) {
			var key = keys.next();
			result.set(key,rpg.Util.copy(v.get(key)));
		}
		return result;
	} else if(js.Boot.__instanceof(v,haxe.ds.IntMap)) {
		var result = Type.createInstance(Type.getClass(v),[]);
		var keys = v.keys();
		while( keys.hasNext() ) {
			var key = keys.next();
			result.set(key,rpg.Util.copy(v.get(key)));
		}
		return result;
	} else if(js.Boot.__instanceof(v,List)) {
		var result = Type.createInstance(Type.getClass(v),[]);
		var iter = v.iterator();
		while( iter.hasNext() ) {
			var ii = iter.next();
			result.add(ii);
		}
		return result;
	} else if(Type.getClass(v) == null) {
		var obj = { };
		var _g = 0, _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var ff = _g1[_g];
			++_g;
			obj[ff] = rpg.Util.copy(Reflect.field(v,ff));
		}
		return obj;
	} else {
		var obj = Type.createEmptyInstance(Type.getClass(v));
		var _g = 0, _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var ff = _g1[_g];
			++_g;
			obj[ff] = rpg.Util.copy(Reflect.field(v,ff));
		}
		return obj;
	}
	return null;
}
rpg.battle.Engine = function(teamRed,teamBlue) {
	this.heros = new haxe.ds.IntMap();
	this.requests = [];
	var id = 0;
	var team = 0;
	var _g = 0;
	while(_g < teamRed.length) {
		var hero = teamRed[_g];
		++_g;
		this.heros.set(id,new rpg.battle.HeroState(id,team,hero));
		id++;
	}
	team++;
	var _g = 0;
	while(_g < teamBlue.length) {
		var hero = teamBlue[_g];
		++_g;
		this.heros.set(id,new rpg.battle.HeroState(id,team,hero));
		id++;
	}
	this.result = { heros : rpg.Util.copy(this.heros), turns : []};
};
rpg.battle.Engine.__name__ = true;
rpg.battle.Engine.prototype = {
	isFinish: function() {
		var redHp = 0;
		var blueHp = 0;
		var $it0 = this.heros.iterator();
		while( $it0.hasNext() ) {
			var e = $it0.next();
			if(e.getTeam() == 0) redHp += e.getHp(); else blueHp += e.getHp();
		}
		return redHp <= 0 || blueHp <= 0;
	}
	,calcDamage: function(actor,target) {
		var attack = actor.getHero().getParameter().attack;
		var block = target.getHero().getParameter().block;
		return Math.max(1,attack - block) | 0;
	}
	,action: function(cmd) {
		var actor = this.heros.get(cmd.actor);
		var target = this.heros.get(cmd.target);
		var skill = actor.getHero().getSkill(cmd.skill);
		var result = { actor : cmd.actor, target : cmd.target, skill : cmd.skill, effect : 0};
		var _g = skill.getEffect();
		switch( (_g)[1] ) {
		case 0:
			result.effect = this.calcDamage(actor,target);
			target.damage(result.effect);
			break;
		}
		return result;
	}
	,solveOrder: function(requests) {
		var allHeros = [];
		var $it0 = this.heros.iterator();
		while( $it0.hasNext() ) {
			var e = $it0.next();
			allHeros.push(e);
		}
		allHeros.sort(function(a,b) {
			var aSpeed = a.getHero().getParameter().speed;
			var bSpeed = b.getHero().getParameter().speed;
			return bSpeed - aSpeed;
		});
		var order = [];
		var _g = 0;
		while(_g < allHeros.length) {
			var e = allHeros[_g];
			++_g;
			order.push(e.getId());
		}
		return order;
	}
	,execute: function(req) {
		this.requests.push(req);
		if(this.requests.length == 2) {
			var commands = new haxe.ds.IntMap();
			var _g = 0, _g1 = this.requests;
			while(_g < _g1.length) {
				var req1 = _g1[_g];
				++_g;
				var $it0 = $iterator(req1.getCommands())();
				while( $it0.hasNext() ) {
					var cmd = $it0.next();
					commands.set(cmd.actor,cmd);
				}
			}
			var events = [];
			var turn = [];
			var _g = 0, _g1 = this.solveOrder(this.requests);
			while(_g < _g1.length) {
				var id = _g1[_g];
				++_g;
				var event = this.action(commands.get(id));
				turn.push(event);
			}
			this.result.turns.push(turn);
			var _g = 0, _g1 = this.requests;
			while(_g < _g1.length) {
				var e = _g1[_g];
				++_g;
				e.callback(turn,this.isFinish());
			}
			this.requests = [];
		}
	}
	,getResult: function() {
		return this.result;
	}
	,getEnemies: function(team) {
		return Lambda.filter(this.heros,function(e) {
			return e.getTeam() != team;
		});
	}
	,getFriends: function(team) {
		return Lambda.filter(this.heros,function(e) {
			return e.getTeam() == team;
		});
	}
	,getHeros: function() {
		return this.heros.iterator();
	}
	,getHero: function(id) {
		return this.heros.get(id);
	}
	,__class__: rpg.battle.Engine
}
rpg.battle.HeroState = function(id,team,hero) {
	this.id = id;
	this.team = team;
	this.hero = hero;
	this.hp = hero.getHp();
	this.correction = { attack : 0, block : 0, speed : 0, health : 0};
};
rpg.battle.HeroState.__name__ = true;
rpg.battle.HeroState.prototype = {
	damage: function(value) {
		this.hp -= value;
		this.hp = this.hp < 0?0:this.hp;
	}
	,getHp: function() {
		return this.hp;
	}
	,getHero: function() {
		return this.hero;
	}
	,getTeam: function() {
		return this.team;
	}
	,getId: function() {
		return this.id;
	}
	,__class__: rpg.battle.HeroState
}
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.prototype.__class__ = Array;
Array.__name__ = true;
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
rpg.Hero.MAX_TALENT = 15;
window.rpg=rpg;})();
