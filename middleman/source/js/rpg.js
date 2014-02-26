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
var IntIterator = function(min,max) {
	this.min = min;
	this.max = max;
};
IntIterator.__name__ = true;
IntIterator.prototype = {
	__class__: IntIterator
}
var Lambda = function() { }
Lambda.__name__ = true;
Lambda.array = function(it) {
	var a = new Array();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
}
Lambda.map = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(x));
	}
	return l;
}
Lambda.mapi = function(it,f) {
	var l = new List();
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(i++,x));
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
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
}
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && v.__enum__ == null || t == "function" && (v.__name__ || v.__ename__) != null;
}
var Std = function() { }
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
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
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
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
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
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
	iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,exists: function(key) {
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
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
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
rpg.Colors = function() { }
rpg.Colors.__name__ = true;
rpg.Colors.rate = function(from,to) {
	return (function($this) {
		var $r;
		switch( (from)[1] ) {
		case 2:
			$r = (function($this) {
				var $r;
				switch( (to)[1] ) {
				case 4:
				case 5:
					$r = 2.0;
					break;
				case 2:
				case 3:
				case 6:
					$r = 0.5;
					break;
				default:
					$r = 1.0;
				}
				return $r;
			}($this));
			break;
		case 3:
			$r = (function($this) {
				var $r;
				switch( (to)[1] ) {
				case 2:
				case 1:
					$r = 2.0;
					break;
				case 3:
				case 4:
				case 6:
					$r = 0.5;
					break;
				default:
					$r = 1.0;
				}
				return $r;
			}($this));
			break;
		case 4:
			$r = (function($this) {
				var $r;
				switch( (to)[1] ) {
				case 3:
				case 0:
					$r = 2.0;
					break;
				case 4:
				case 2:
				case 6:
					$r = 0.5;
					break;
				default:
					$r = 1.0;
				}
				return $r;
			}($this));
			break;
		default:
			$r = 1.0;
		}
		return $r;
	}(this));
}
rpg.Colors.valueOf = function(str) {
	return Type.createEnum(rpg.Color,str);
}
rpg.Dungeon = function(id,area,name,desc,depth,preDepth,postDepth,lotteryTable,nameTable,boss) {
	this.id = id;
	this.area = area;
	this.name = name;
	this.desc = desc;
	this.depth = depth;
	this.preDepth = preDepth;
	this.postDepth = postDepth;
	this.lotteryTable = lotteryTable;
	this.nameTable = nameTable;
	this.boss = boss;
};
rpg.Dungeon.__name__ = true;
rpg.Dungeon.prototype = {
	toHeros: function(enemies,depth) {
		var _g = this;
		return Lambda.array(Lambda.mapi(enemies,function(i,e) {
			var name = e.name == "_RAND_"?_g.nameTable[rpg.Rand.next() % _g.nameTable.length]:e.name;
			return new rpg.Hero("enemy_" + depth + "_" + i,name,e.color,e.plan,rpg.Hero.generateTalent(),e.effort,e.skills,0);
		}));
	}
	,spawnEnemies: function() {
		var rateSum = Lambda.fold(this.lotteryTable,function(e,p) {
			return p + e.rate;
		},0);
		var pivot = rpg.Rand.next() % rateSum;
		var _g = 0, _g1 = this.lotteryTable;
		while(_g < _g1.length) {
			var lot = _g1[_g];
			++_g;
			if(lot.rate > pivot) return lot.enemies;
		}
		throw "invalid table";
	}
	,solveAuto: function(heros,targetDepth,onBattle) {
		var result = { battles : [], join : ""};
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
			var enemies = this.toHeros(i + 1 == this.depth?this.boss:this.spawnEnemies(),i + 1);
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
			if(onBattle != null) onBattle(engine);
			result.battles.push(engine.getResult());
			if(!engine.isWin(0) || result.battles.length >= targetDepth) break;
		}
		return result;
	}
	,getDepth: function() {
		return this.depth;
	}
	,getArea: function() {
		return this.area;
	}
	,getId: function() {
		return this.id;
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
		var friends = Lambda.filter(this.engine.getFriends(this.friendTeam),function(e) {
			return e.alive();
		});
		var enemies = Lambda.array(Lambda.filter(this.engine.getEnemies(this.friendTeam),function(e) {
			return e.alive();
		}));
		return Lambda.map(friends,function(friend) {
			return { actor : friend.getId(), target : enemies[rpg.Rand.next() % enemies.length].getId(), skill : rpg.Rand.next() % friend.getHero().getSkillNum()};
		});
	}
	,__class__: rpg.MonkeyAI
}
rpg.Hero = function(id,name,color,plan,talent,effort,skills,returnAt) {
	if(rpg.Hero.validateTalent(talent)) throw rpg.HeroError.INVALID_TALENT;
	if(rpg.Hero.validateEffort(effort)) throw rpg.HeroError.INVALID_EFFORT;
	this.id = id;
	this.name = name;
	this.color = color;
	this.plan = plan;
	this.talent = talent;
	this.effort = effort;
	this.hp = this.getParameter().health;
	this.skills = skills;
	this.returnAt = returnAt;
};
rpg.Hero.__name__ = true;
rpg.Hero.validateTalent = function(talent) {
	return talent.attack < 1 || talent.attack > rpg.Hero.MAX_TALENT || talent.block < 1 || talent.block > rpg.Hero.MAX_TALENT || talent.speed < 1 || talent.speed > rpg.Hero.MAX_TALENT || talent.health < 1 || talent.health > rpg.Hero.MAX_TALENT;
}
rpg.Hero.validateEffort = function(effort) {
	return effort.attack < 0 || effort.attack > rpg.Hero.EFFORT_LIMIT || effort.block < 0 || effort.block > rpg.Hero.EFFORT_LIMIT || effort.speed < 0 || effort.speed > rpg.Hero.EFFORT_LIMIT || effort.health < 0 || effort.health > rpg.Hero.EFFORT_LIMIT || effort.attack + effort.block + effort.speed + effort.health > rpg.Hero.EFFORT_SUM_LIMIT;
}
rpg.Hero.calcParameter = function(talent,effort,level) {
	return (60 + talent + effort / 4) * level / 10 | 0;
}
rpg.Hero.calcHealthParameter = function(talent,effort,level) {
	return rpg.Hero.calcParameter(talent,effort,level) + level * 5;
}
rpg.Hero.calcLevel = function(effort) {
	var sum = effort.attack + effort.block + effort.speed + effort.health;
	return (Math.sqrt(sum) * 9 / 16 | 0) + 1;
}
rpg.Hero.generateTalent = function() {
	return { attack : rpg.Rand.next() % rpg.Hero.MAX_TALENT + 1, block : rpg.Rand.next() % rpg.Hero.MAX_TALENT + 1, speed : rpg.Rand.next() % rpg.Hero.MAX_TALENT + 1, health : rpg.Rand.next() % rpg.Hero.MAX_TALENT + 1};
}
rpg.Hero.prototype = {
	calcExp: function() {
		var exp = { attack : 0, block : 0, speed : 0, health : 0};
		var val = this.getLevel();
		var _g = this;
		switch( (_g.color)[1] ) {
		case 2:
			break;
		case 3:
			break;
		case 4:
			exp.attack = val;
			break;
		case 6:
			exp.block = val;
			break;
		case 1:
			break;
		case 5:
			exp.speed = val;
			break;
		case 0:
			exp.health = val;
			break;
		}
		return exp;
	}
	,trimEffort: function(base,gain) {
		var ret = Math.min(rpg.Hero.EFFORT_LIMIT - base,gain) | 0;
		var sum = this.effort.attack + this.effort.block + this.effort.speed + this.effort.health;
		return Math.min(rpg.Hero.EFFORT_SUM_LIMIT - sum,ret) | 0;
	}
	,applyExp: function(effort) {
		this.effort.attack += this.trimEffort(this.effort.attack,effort.attack);
		this.effort.block += this.trimEffort(this.effort.block,effort.block);
		this.effort.speed += this.trimEffort(this.effort.speed,effort.speed);
		this.effort.health += this.trimEffort(this.effort.health,effort.health);
	}
	,recoverAllHp: function() {
		this.hp = this.getParameter().health;
	}
	,getLevel: function() {
		return rpg.Hero.calcLevel(this.effort);
	}
	,getParameter: function() {
		var level = this.getLevel();
		return { attack : rpg.Hero.calcParameter(this.talent.attack,this.effort.attack,level), block : rpg.Hero.calcParameter(this.talent.block,this.effort.block,level), speed : rpg.Hero.calcParameter(this.talent.speed,this.effort.speed,level), health : rpg.Hero.calcHealthParameter(this.talent.health,this.effort.health,level)};
	}
	,setReturnAt: function(returnAt) {
		this.returnAt = returnAt;
	}
	,getReturnAt: function() {
		return this.returnAt;
	}
	,getPlan: function() {
		return this.plan;
	}
	,getColor: function() {
		return this.color;
	}
	,getEffort: function() {
		return this.effort;
	}
	,getTalent: function() {
		return this.talent;
	}
	,getSkillNum: function() {
		return this.skills.length;
	}
	,getSkill: function(idx) {
		return this.skills[idx];
	}
	,getSkills: function() {
		return this.skills;
	}
	,setHp: function(hp) {
		this.hp = hp;
	}
	,getHp: function() {
		return this.hp;
	}
	,getName: function() {
		return this.name;
	}
	,setId: function(id) {
		this.id = id;
	}
	,getId: function() {
		return this.id;
	}
	,__class__: rpg.Hero
}
rpg.HeroError = { __ename__ : true, __constructs__ : ["INVALID_TALENT","INVALID_EFFORT"] }
rpg.HeroError.INVALID_TALENT = ["INVALID_TALENT",0];
rpg.HeroError.INVALID_TALENT.toString = $estr;
rpg.HeroError.INVALID_TALENT.__enum__ = rpg.HeroError;
rpg.HeroError.INVALID_EFFORT = ["INVALID_EFFORT",1];
rpg.HeroError.INVALID_EFFORT.toString = $estr;
rpg.HeroError.INVALID_EFFORT.__enum__ = rpg.HeroError;
rpg.Parameters = function() { }
rpg.Parameters.__name__ = true;
rpg.Parameters.sum = function(a,b) {
	return { attack : a.attack + b.attack, block : a.block + b.block, speed : a.speed + b.speed, health : a.health + b.health};
}
rpg.Plan = { __ename__ : true, __constructs__ : ["MONKEY"] }
rpg.Plan.MONKEY = ["MONKEY",0];
rpg.Plan.MONKEY.toString = $estr;
rpg.Plan.MONKEY.__enum__ = rpg.Plan;
rpg.Plans = function() { }
rpg.Plans.__name__ = true;
rpg.Plans.valueOf = function(str) {
	return Type.createEnum(rpg.Plan,str);
}
rpg._Rand = {}
rpg._Rand.IRand = function() { }
rpg._Rand.IRand.__name__ = true;
rpg._Rand.IRand.prototype = {
	__class__: rpg._Rand.IRand
}
rpg._Rand.RandImpl = function() {
};
rpg._Rand.RandImpl.__name__ = true;
rpg._Rand.RandImpl.__interfaces__ = [rpg._Rand.IRand];
rpg._Rand.RandImpl.prototype = {
	next: function() {
		return Math.floor(Math.random() * 2147483647.0);
	}
	,__class__: rpg._Rand.RandImpl
}
rpg.Rand = function() { }
rpg.Rand.__name__ = true;
rpg.Rand.next = function() {
	return rpg.Rand.gen.next();
}
rpg.Rand.startDebug = function(nums) {
	rpg.Rand.gen = new rpg._Rand.RandDebug(nums);
}
rpg.Rand.endDebug = function() {
	rpg.Rand.gen = new rpg._Rand.RandImpl();
}
rpg._Rand.RandDebug = function(nums) {
	this.nums = nums;
	this.currentIdx = 0;
};
rpg._Rand.RandDebug.__name__ = true;
rpg._Rand.RandDebug.__interfaces__ = [rpg._Rand.IRand];
rpg._Rand.RandDebug.prototype = {
	next: function() {
		var ret = this.nums[this.currentIdx];
		this.currentIdx = (this.currentIdx + 1) % this.nums.length;
		return ret;
	}
	,__class__: rpg._Rand.RandDebug
}
rpg.SkillTarget = { __ename__ : true, __constructs__ : ["ENEMY"] }
rpg.SkillTarget.ENEMY = ["ENEMY",0];
rpg.SkillTarget.ENEMY.toString = $estr;
rpg.SkillTarget.ENEMY.__enum__ = rpg.SkillTarget;
rpg.SkillType = { __ename__ : true, __constructs__ : ["ATTACK","BLOCK","ENHANCE","JAM","HEAL"] }
rpg.SkillType.ATTACK = ["ATTACK",0];
rpg.SkillType.ATTACK.toString = $estr;
rpg.SkillType.ATTACK.__enum__ = rpg.SkillType;
rpg.SkillType.BLOCK = ["BLOCK",1];
rpg.SkillType.BLOCK.toString = $estr;
rpg.SkillType.BLOCK.__enum__ = rpg.SkillType;
rpg.SkillType.ENHANCE = ["ENHANCE",2];
rpg.SkillType.ENHANCE.toString = $estr;
rpg.SkillType.ENHANCE.__enum__ = rpg.SkillType;
rpg.SkillType.JAM = ["JAM",3];
rpg.SkillType.JAM.toString = $estr;
rpg.SkillType.JAM.__enum__ = rpg.SkillType;
rpg.SkillType.HEAL = ["HEAL",4];
rpg.SkillType.HEAL.toString = $estr;
rpg.SkillType.HEAL.__enum__ = rpg.SkillType;
rpg.SkillEffect = { __ename__ : true, __constructs__ : ["ATTACK"] }
rpg.SkillEffect.ATTACK = ["ATTACK",0];
rpg.SkillEffect.ATTACK.toString = $estr;
rpg.SkillEffect.ATTACK.__enum__ = rpg.SkillEffect;
rpg.Skills = function() { }
rpg.Skills.__name__ = true;
rpg.Skills.targetValueOf = function(str) {
	return Type.createEnum(rpg.SkillTarget,str);
}
rpg.Skills.typeValueOf = function(str) {
	return Type.createEnum(rpg.SkillType,str);
}
rpg.Skills.effectValueOf = function(str) {
	return Type.createEnum(rpg.SkillEffect,str);
}
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
rpg.battle.BattleHero = function(id,team,hero) {
	this.id = id;
	this.team = team;
	this.hero = hero;
	this.hp = hero.getHp();
	this.correction = { attack : 0, block : 0, speed : 0, health : 0};
};
rpg.battle.BattleHero.__name__ = true;
rpg.battle.BattleHero.prototype = {
	alive: function() {
		return this.hp > 0;
	}
	,damage: function(value) {
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
	,__class__: rpg.battle.BattleHero
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
		this.heros.set(id,new rpg.battle.BattleHero(id,team,hero));
		id++;
	}
	team++;
	var _g = 0;
	while(_g < teamBlue.length) {
		var hero = teamBlue[_g];
		++_g;
		this.heros.set(id,new rpg.battle.BattleHero(id,team,hero));
		id++;
	}
	this.result = { teamRed : rpg.Util.copy(teamRed), teamBlue : rpg.Util.copy(teamBlue), turns : []};
};
rpg.battle.Engine.__name__ = true;
rpg.battle.Engine.calcDamage = function(actor,target,skill) {
	var attack = actor.getHero().getParameter().attack;
	var block = target.getHero().getParameter().block;
	var damage = skill.power * attack / block;
	damage *= actor.getHero().getLevel() / 10;
	damage *= (85 + rpg.Rand.next() % 16) / 100;
	damage *= rpg.Colors.rate(skill.color,target.getHero().getColor());
	return (damage | 0) + 1;
}
rpg.battle.Engine.prototype = {
	isWin: function(team) {
		return Lambda.fold(this.heros,function(e,p) {
			if(e.getTeam() == team) return p;
			return p + e.getHp();
		},0) <= 0;
	}
	,isFinish: function() {
		return this.isWin(0) || this.isWin(1);
	}
	,applyAction: function(act) {
		var actor = this.heros.get(act.actor);
		var target = this.heros.get(act.target);
		var skill = actor.getHero().getSkill(act.skill);
		switch( (skill.type)[1] ) {
		case 0:
			target.damage(act.effect);
			break;
		default:
		}
		var turn = this.result.turns[this.result.turns.length - 1];
		turn.push(act);
	}
	,applyNewTurn: function() {
		var turn = [];
		this.result.turns.push(turn);
		return turn;
	}
	,action: function(cmd) {
		var actor = this.heros.get(cmd.actor);
		var target = this.heros.get(cmd.target);
		var skill = actor.getHero().getSkill(cmd.skill);
		var result = { actor : cmd.actor, target : cmd.target, skill : cmd.skill, effect : 0};
		switch( (skill.type)[1] ) {
		case 0:
			result.effect = actor.alive() && target.alive() && actor.getTeam() != target.getTeam()?rpg.battle.Engine.calcDamage(actor,target,skill):0;
			break;
		default:
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
			if(aSpeed == bSpeed) return rpg.Rand.next() % 2 == 0?1:-1;
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
			var turn = this.applyNewTurn();
			var _g = 0, _g1 = this.solveOrder(this.requests);
			while(_g < _g1.length) {
				var id = _g1[_g];
				++_g;
				if(commands.exists(id)) {
					var event = this.action(commands.get(id));
					this.applyAction(event);
				}
			}
			var requests = this.requests;
			this.requests = [];
			var _g = 0;
			while(_g < requests.length) {
				var e = requests[_g];
				++_g;
				e.callback(turn,this.isFinish());
			}
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
rpg.service = {}
rpg.service.DungeonService = function() { }
rpg.service.DungeonService.__name__ = true;
rpg.service.DungeonService.get = function(id) {
	var dungeon = rpg.service.DungeonService.master.get(id);
	return new rpg.Dungeon(dungeon.id,dungeon.area,dungeon.name,dungeon.desc,dungeon.depth,dungeon.preDepth,dungeon.postDepth,Lambda.array(Lambda.map(dungeon.lotteryTable,function(e) {
		return { enemies : Lambda.array(Lambda.map(e.enemies,rpg.service.DungeonService.fromStored)), rate : e.rate};
	})),dungeon.nameTable,Lambda.array(Lambda.map(dungeon.boss,rpg.service.DungeonService.fromStored)));
}
rpg.service.DungeonService.set = function(id,dungeon) {
	rpg.service.DungeonService.master.set(id,dungeon);
}
rpg.service.DungeonService.commit = function(storage,now,dungeon,depth) {
	var progress = storage.getProgress();
	if(progress < dungeon.getId()) throw rpg.service.DungeonError.INVALID_PROGRESS;
	var team = rpg.service.HeroService.getTeam(storage);
	var _g = 0;
	while(_g < team.length) {
		var hero = team[_g];
		++_g;
		var hp = rpg.service.HeroService.calcCurrentHp(hero,now);
		if(hp < 1) throw rpg.service.DungeonError.INVALID_TEAM;
		hero.setHp(hp);
	}
	var exp = rpg.Parameters.ZERO;
	var clearDepth = 0;
	var result = dungeon.solveAuto(team,depth,function(engine) {
		if(!engine.isWin(0)) return;
		clearDepth++;
		var battleResult = engine.getResult();
		var _g = 0, _g1 = battleResult.teamBlue;
		while(_g < _g1.length) {
			var enemy = _g1[_g];
			++_g;
			exp = rpg.Parameters.sum(exp,enemy.calcExp());
		}
	});
	var storedResult = { battles : Lambda.array(Lambda.map(result.battles,function(e) {
		return { teamRed : Lambda.array(Lambda.map(e.teamRed,rpg.service.HeroService.toStored)), teamBlue : Lambda.array(Lambda.map(e.teamBlue,rpg.service.HeroService.toStored)), turns : e.turns};
	})), join : result.join};
	if(clearDepth >= Math.min(depth,dungeon.getDepth())) {
		var _g = 0;
		while(_g < team.length) {
			var hero = team[_g];
			++_g;
			if(hero.getHp() > 0) hero.applyExp(exp);
		}
		if(clearDepth >= dungeon.getDepth()) {
			if(dungeon.getId() >= progress) {
				storage.setProgress(dungeon.getId() + 1);
				if(rpg.service.DungeonService.isAreaGoal(dungeon)) {
					var bossTeam = result.battles[result.battles.length - 1].teamBlue;
					var boss = bossTeam[0];
					storedResult.join = boss.getId();
					boss.setId(rpg.service.HeroService.generateId());
					boss.recoverAllHp();
					team.push(boss);
				}
			} else {
			}
		}
	}
	var _g = 0;
	while(_g < team.length) {
		var hero = team[_g];
		++_g;
		hero.setReturnAt(now);
	}
	rpg.service.HeroService.update(storage,team);
	storage.setDungeonResult(now,storedResult);
}
rpg.service.DungeonService.getLatestResult = function(storage) {
	var storedResult = storage.getLatestDungeonResult();
	return { battles : Lambda.array(Lambda.map(storedResult.battles,function(e) {
		return { teamRed : Lambda.array(Lambda.map(e.teamRed,rpg.service.HeroService.fromStored)), teamBlue : Lambda.array(Lambda.map(e.teamBlue,rpg.service.HeroService.fromStored)), turns : e.turns};
	})), join : storedResult.join};
}
rpg.service.DungeonService.fromStored = function(stored) {
	return { name : stored.name, color : rpg.Colors.valueOf(stored.color), plan : rpg.Plans.valueOf(stored.plan), effort : stored.effort, skills : Lambda.array(Lambda.map(stored.skills,function(e) {
		return rpg.service.SkillService.get(e);
	}))};
}
rpg.service.DungeonService.isAreaGoal = function(dungeon) {
	var $it0 = rpg.service.DungeonService.master.iterator();
	while( $it0.hasNext() ) {
		var e = $it0.next();
		if(e.area == dungeon.getArea() && e.id > dungeon.getId()) return false;
	}
	return true;
}
rpg.service.DungeonError = { __ename__ : true, __constructs__ : ["INVALID_PROGRESS","INVALID_TEAM"] }
rpg.service.DungeonError.INVALID_PROGRESS = ["INVALID_PROGRESS",0];
rpg.service.DungeonError.INVALID_PROGRESS.toString = $estr;
rpg.service.DungeonError.INVALID_PROGRESS.__enum__ = rpg.service.DungeonError;
rpg.service.DungeonError.INVALID_TEAM = ["INVALID_TEAM",1];
rpg.service.DungeonError.INVALID_TEAM.toString = $estr;
rpg.service.DungeonError.INVALID_TEAM.__enum__ = rpg.service.DungeonError;
rpg.service.HeroService = function() { }
rpg.service.HeroService.__name__ = true;
rpg.service.HeroService.createInit = function() {
	var id = rpg.service.HeroService.generateId();
	var talent = { attack : 7, block : 7, speed : 16, health : 7};
	var effort = rpg.Parameters.ZERO;
	var skill = rpg.service.SkillService.get(1);
	return new rpg.Hero(id,"ハルヒロ",rpg.Color.FIRE,rpg.Plan.MONKEY,talent,effort,[skill],0);
}
rpg.service.HeroService.getAll = function(storage) {
	var storedHeros = storage.getHeros();
	if(storedHeros.length == 0) {
		var hero = rpg.service.HeroService.createInit();
		storedHeros = [rpg.service.HeroService.toStored(hero)];
		storage.setHeros(storedHeros);
	}
	var heros = new haxe.ds.StringMap();
	var _g = 0;
	while(_g < storedHeros.length) {
		var stored = storedHeros[_g];
		++_g;
		heros.set(stored.id,rpg.service.HeroService.fromStored(stored));
	}
	return heros;
}
rpg.service.HeroService.getTeam = function(storage) {
	var heros = rpg.service.HeroService.getAll(storage);
	var team = storage.getTeam();
	if(team.length < 1) team = Lambda.array(Lambda.map(heros,function(e) {
		return e.getId();
	}));
	return Lambda.array(Lambda.mapi([new IntIterator(0,rpg.service.HeroService.HERO_PER_TEAM)],function(i,e) {
		if(team.length <= i) return null;
		return heros.get(team[i]);
	}));
}
rpg.service.HeroService.update = function(storage,heros) {
	var heroMap = new haxe.ds.StringMap();
	var _g = 0, _g1 = storage.getHeros();
	while(_g < _g1.length) {
		var hero = _g1[_g];
		++_g;
		heroMap.set(hero.id,hero);
	}
	var _g = 0;
	while(_g < heros.length) {
		var hero = heros[_g];
		++_g;
		heroMap.set(hero.getId(),rpg.service.HeroService.toStored(hero));
	}
	storage.setHeros(Lambda.array(heroMap));
}
rpg.service.HeroService.toStored = function(hero) {
	return { id : hero.getId(), name : hero.getName(), color : Std.string(hero.getColor()), plan : Std.string(hero.getPlan()), talent : hero.getTalent(), effort : hero.getEffort(), hp : hero.getHp(), skills : Lambda.array(Lambda.map(hero.getSkills(),function(e) {
		return e.id;
	})), returnAt : hero.getReturnAt()};
}
rpg.service.HeroService.fromStored = function(stored) {
	var hero = new rpg.Hero(stored.id,stored.name,rpg.Colors.valueOf(stored.color),rpg.Plans.valueOf(stored.plan),stored.talent,stored.effort,Lambda.array(Lambda.map(stored.skills,function(e) {
		return rpg.service.SkillService.get(e);
	})),stored.returnAt);
	hero.setHp(stored.hp);
	return hero;
}
rpg.service.HeroService.generateId = function() {
	return Std.string(rpg.Rand.next());
}
rpg.service.HeroService.calcCurrentHp = function(hero,now) {
	var hp = hero.getHp() + (now - hero.getReturnAt()) / rpg.service.HeroService.MSEC_PER_RECOVER;
	return Math.min(hp,hero.getParameter().health) | 0;
}
rpg.service.SkillService = function() { }
rpg.service.SkillService.__name__ = true;
rpg.service.SkillService.get = function(id) {
	return rpg.service.SkillService.master.get(id);
}
rpg.service.SkillService.set = function(id,skill) {
	rpg.service.SkillService.master.set(id,skill);
}
rpg.service.Storage = function() { }
rpg.service.Storage.__name__ = true;
rpg.service.Storage.prototype = {
	__class__: rpg.service.Storage
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
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
rpg.Hero.MAX_TALENT = 16;
rpg.Hero.EFFORT_LIMIT = 128;
rpg.Hero.EFFORT_SUM_LIMIT = 256;
rpg.Parameters.ZERO = { attack : 0, block : 0, speed : 0, health : 0};
rpg.Parameters.ONE = { attack : 1, block : 1, speed : 1, health : 1};
rpg._Rand.RandImpl.MPM = 2147483647.0;
rpg.Rand.gen = new rpg._Rand.RandImpl();
rpg.service.DungeonService.master = new haxe.ds.IntMap();
rpg.service.HeroService.HERO_PER_TEAM = 4;
rpg.service.HeroService.MSEC_PER_RECOVER = 60000;
rpg.service.SkillService.master = new haxe.ds.IntMap();
window.rpg=rpg;})();
