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
rpg.Dungeon = function(depth,lotteryTable,boss) {
	this.depth = depth;
	this.lotteryTable = lotteryTable;
	this.boss = boss;
};
rpg.Dungeon.__name__ = true;
rpg.Dungeon.prototype = {
	spawnEnemies: function() {
		var rateSum = Lambda.fold(this.lotteryTable,function(e,p) {
			return p + e.rate;
		},0);
		var pivot = rpg.Rand.next() % rateSum;
		var _g = 0, _g1 = this.lotteryTable;
		while(_g < _g1.length) {
			var lot = _g1[_g];
			++_g;
			if(lot.rate > pivot) return Lambda.array(Lambda.mapi(lot.enemies,function(i,e) {
				return new rpg.Hero("enemy" + i,e.color,e.plan,rpg.Hero.generateTalent(),e.effort,e.skills);
			}));
		}
		throw "invalid table";
	}
	,solveAuto: function(heros) {
		var result = { battles : []};
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
			if(!engine.isWin(0)) break;
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
rpg.Hero = function(id,color,plan,talent,effort,skills) {
	if(rpg.Hero.validateTalent(talent)) throw rpg.HeroError.INVALID_TALENT;
	if(rpg.Hero.validateEffort(effort)) throw rpg.HeroError.INVALID_EFFORT;
	this.id = id;
	this.color = color;
	this.plan = plan;
	this.talent = talent;
	this.effort = effort;
	this.hp = this.getParameter().health;
	this.skills = skills;
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
	,getEffort: function() {
		return this.effort;
	}
	,getSkillNum: function() {
		return this.skills.length;
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
rpg.HeroError = { __ename__ : true, __constructs__ : ["INVALID_TALENT","INVALID_EFFORT"] }
rpg.HeroError.INVALID_TALENT = ["INVALID_TALENT",0];
rpg.HeroError.INVALID_TALENT.toString = $estr;
rpg.HeroError.INVALID_TALENT.__enum__ = rpg.HeroError;
rpg.HeroError.INVALID_EFFORT = ["INVALID_EFFORT",1];
rpg.HeroError.INVALID_EFFORT.toString = $estr;
rpg.HeroError.INVALID_EFFORT.__enum__ = rpg.HeroError;
rpg.Plan = { __ename__ : true, __constructs__ : ["MONKEY"] }
rpg.Plan.MONKEY = ["MONKEY",0];
rpg.Plan.MONKEY.toString = $estr;
rpg.Plan.MONKEY.__enum__ = rpg.Plan;
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
	return skill.power * actor.getHero().getLevel() / 10 * attack / block + 1 | 0;
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
				var event = this.action(commands.get(id));
				this.applyAction(event);
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
rpg._Rand.RandImpl.MPM = 2147483647.0;
rpg.Rand.gen = new rpg._Rand.RandImpl();
window.rpg=rpg;})();
