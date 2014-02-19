service =
  user:
    getId: -> 'player'

  hero:
    get: (id) ->
      one = {attack:7, block:7, speed:7, health:7}
      zero = rpg.Parameters.ZERO
      skill = service.skill.get(1)
      hero = new rpg.Hero id, id, rpg.Color.FIRE, rpg.Plan.MONKEY, one, zero, [skill]
      return hero
    getTeam: ->
      [@get('ハルヒロ'), null, null, null]
    getSelected: ->
      @get 'ハルヒロ'

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
      ###
      battles:[
        service.battle.getResult()
        service.battle.getResult()
        service.battle.getResult()
      ]
      ###
      @getSelected().solveAuto _.compact(service.hero.getTeam())
    getSelected: -> @get 2
    commit: ->
      result = @getSelected().solveAuto _.compact(service.hero.getTeam())
      # store result
      # store result id to selected

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

window.service = service
