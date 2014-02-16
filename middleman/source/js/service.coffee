service =
  user:
    getId: -> 'player'

  hero:
    getHero: (id) ->
      hero = new rpg.Hero id
      hero.name = id
      e.name = "skill#{i}" for e, i in hero.skills
      return hero
    getTeam: ->
      [@getHero('ハルヒロ'), null, null, null]

  skill:
    getSkill: (id) -> new rpg.Skill

  dungeon:
    getResult: ->
      exp:0
      battles:[
        service.battle.getResult()
        service.battle.getResult()
      ]
      depth:1
    get: (id) ->
      (id:id, name:'トキワの森', desc:'薄暗い森。ピカチュウとか出てくる。', depth:3, preDepth:'エリア', postDepth:'')
    getSelected: -> service.dungeon.get 1

  battle:
    getResult: ->
      friend = new rpg.battle.HeroState 0, 'player', service.hero.getHero('friend')
      friend.hero.color = rpg.Color.FIRE
      friend1 = new rpg.battle.HeroState 1, 'player', service.hero.getHero('friend2')
      friend2 = new rpg.battle.HeroState 2, 'player', service.hero.getHero('friend3')
      friend3 = new rpg.battle.HeroState 3, 'player', service.hero.getHero('friend4')
      enemy = new rpg.battle.HeroState 4, 'enemy', service.hero.getHero('enemy')
      enemy2 = new rpg.battle.HeroState 5, 'enemy', service.hero.getHero('enemy2')
      result =
        heros: (0: friend, 1:friend1, 2:friend2, 3:friend3, 4:enemy, 5:enemy2)
        turns: [
          [
            (actor:0, target:4, skill:0, effect:30)
            (actor:5, target:3, skill:0, effect:30)
          ]
        ]

window.service = service
