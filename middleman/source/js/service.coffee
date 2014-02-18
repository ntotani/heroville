service =
  user:
    getId: -> 'player'

  hero:
    get: (id) ->
      one = {attack:1, block:1, speed:1, health:1}
      zero = {attack:0, block:0, speed:0, health:0}
      skill = service.skill.get(1)
      hero = new rpg.Hero id, rpg.Color.SUN, rpg.Plan.MONKEY, one, zero, [skill]
      hero.name = id
      return hero
    getTeam: ->
      [@get('ハルヒロ'), null, null, null]
    getSelected: ->
      @get 'ハルヒロ'

  skill:
    get: (id) ->
      id:id
      color:rpg.Color.SUN
      type:rpg.SkillType.ATTACK
      effect:rpg.SkillEffect.ATTACK
      target:rpg.SkillTarget.ENEMY
      power:40
      hitRate:100
      name:'sun attack'

  dungeon:
    get: (id) ->
      zero = {attack:0, block:0, speed:0, health:0}
      enemy = {color:rpg.Color.SUN, plan:rpg.Plan.MONKEY, effort:zero, skills:service.skill.get(1)}
      enemies = [enemy]
      d = new rpg.Dungeon 3, [{enemies:enemies, rate:100}], enemies
      d.name = 'トキワの森'
      d.desc = '薄暗い森。ピカチュウとか出てくる。'
      d.preDepth = 'エリア'
      d.postDepth = ''
      return d
    getResult: ->
      battles:[
        service.battle.getResult()
        service.battle.getResult()
        service.battle.getResult()
      ]
    getSelected: -> @get 1
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
