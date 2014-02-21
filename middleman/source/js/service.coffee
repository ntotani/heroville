service =
  user:
    getId: -> 'player'

  hero:
    MSEC_PER_RECOVER: 60000
    get: (id) -> @getAll()[id]
    setSelected: (id) -> localStorage['selectedHero'] = id
    getSelected: -> @get localStorage['selectedHero']

    getTeam: ->
      heros = @getAll()
      storedTeam = if localStorage['team']
        JSON.parse localStorage['team']
      else
        team = _.keys heros
        localStorage['team'] = JSON.stringify team
        team
      [0...4].map (i) -> if storedTeam[i] then heros[storedTeam[i]] else null

    getAll: ->
      if localStorage['allHeros']
        storedHeros = JSON.parse localStorage['allHeros']
      else
        id = "#{Math.random()}"
        talent = {attack:7, block:7, speed:16, health:7}
        effort = rpg.Parameters.ZERO
        skill = service.skill.get 1
        storedHeros = {}
        storedHeros[id] = @toStored new rpg.Hero(id, 'ハルヒロ', rpg.Color.FIRE, rpg.Plan.MONKEY, talent, effort, [service.skill.get(1)])
        storedHeros[id].returnAt = Date.now()
        localStorage['allHeros'] = JSON.stringify storedHeros
      heros = {}
      heros[id] = @fromStored(e) for id, e of storedHeros
      return heros

    updateHero: (param, now) ->
      heros = @getAll()
      for id, e of param
        heros[id].setHp e.hp
        heros[id].applyExp e.exp
        heros[id].returnAt = now
      storedHeros = {}
      storedHeros[id] = @toStored e for id, e of heros
      localStorage['allHeros'] = JSON.stringify storedHeros

     toStored: (hero) ->
       _.defaults({
         color  : hero.color[0]
         plan   : hero.plan[0]
         skills : hero.skills.map((e)->e.id)
       }, hero)

     fromStored: (e) ->
       hero = new rpg.Hero e.id, e.name, rpg.Colors.valueOf(e.color), rpg.Plans.valueOf(e.plan), e.talent, e.effort, e.skills.map((skill)->service.skill.get(skill))
       hero.setHp e.hp
       hero.returnAt = e.returnAt
       return hero

     calcCurrentHp: (hero, now) ->
       hp = (hero.hp + (now - hero.returnAt) / @MSEC_PER_RECOVER) | 0
       return Math.min(hp, hero.getParameter().health)

  skill:
    get: (id) ->
      id:id
      color:rpg.Color.FIRE
      type:rpg.SkillType.ATTACK
      effect:rpg.SkillEffect.ATTACK
      target:rpg.SkillTarget.ENEMY
      power:40
      hitRate:100
      name:'sun attack'

  dungeon:
    master:{}
    get: (id) ->
      parseEnemy = (e) ->
        {name: e.name, color:eval("rpg.Color.#{e.color}"), plan:eval("rpg.Plan.#{e.plan}"), effort:e.effort, skills:e.skills.map((e)->service.skill.get e)}
      master = @master[id]
      lotteryTable = master.lotteryTable.map (e) ->
        enemies:e.enemies.map parseEnemy
        rate:e.rate
      boss = master.boss.map parseEnemy
      d = new rpg.Dungeon master.depth, lotteryTable, master.nameTable, boss
      d.name = master.name
      d.desc = master.desc
      d.preDepth = master.preDepth
      d.postDepth = master.postDepth
      return d
    getResult: ->
      result = JSON.parse localStorage['lastDungeonResult']
      @convert result, service.hero.fromStored
    setSelected: (e) -> localStorage['selectedDungeon'] = e
    getSelected: -> @get localStorage['selectedDungeon']
    commit: ->
      now = Date.now()
      team = _.compact service.hero.getTeam()
      hero.hp = service.hero.calcCurrentHp hero, now for hero in team
      result = @getSelected().solveAuto team
      exp = rpg.Parameters.ZERO
      for battle in result.battles
        engine = new rpg.battle.Engine battle.teamRed, battle.teamBlue
        for turn in battle.turns
          engine.applyNewTurn()
          for action in turn
            engine.applyAction action
        if engine.isWin 0
          for enemy in battle.teamBlue
            enemyExp = enemy.calcExp()
            exp[e] += enemyExp[e] for e in _.keys(exp)
      param = team.reduce((p, e) ->
        p[e.id] =
          hp:e.hp
          exp:if e.hp > 0 then exp else rpg.Parameters.ZERO
        return p
      , {})
      service.hero.updateHero param, now
      result = @convert result, service.hero.toStored
      localStorage['lastDungeonResult'] = JSON.stringify result
      # store result
      # store result id to selected

    convert: (result, heroMap) ->
      battles: result.battles.map (battle) ->
        teamRed: battle.teamRed.map heroMap
        teamBlue: battle.teamBlue.map heroMap
        turns: battle.turns

  battle:
    getResult: ->
      result =
        teamRed:[
          service.hero.get 'friend1'
          service.hero.get 'friend2'
          service.hero.get 'friend3'
          service.hero.get 'friend4'
        ]
        teamBlue:[
          service.hero.get 'enemy1'
          service.hero.get 'enemy2'
        ]
        turns: [
          [
            (actor:0, target:4, skill:0, effect:5)
            (actor:5, target:3, skill:0, effect:5)
          ]
        ]

  area:
    master:{}

window.service = service
