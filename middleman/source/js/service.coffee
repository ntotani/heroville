storage =
  getHeros: -> JSON.parse(localStorage['allHeros'] || 'false') || []
  setHeros: (heros) -> localStorage['allHeros'] = JSON.stringify heros
  getTeam: -> JSON.parse(localStorage['team'] || 'false') || []
  setTeam: (team) -> localStorage['team'] = JSON.stringify team
  getLatestDungeonResult: -> JSON.parse(localStorage['lastDungeonResult'] || 'false') || {}
  setDungeonResult: (now, result) -> localStorage['lastDungeonResult'] = JSON.stringify result
  getProgress: -> JSON.parse(localStorage['progress'] || 'false') || 1
  setProgress: (progress) -> localStorage['progress'] = JSON.stringify progress

service =
  user:
    getProgress: storage.getProgress

  hero:
    get: (id) -> @getAll()[id]
    setSelected: (id) -> localStorage['selectedHero'] = id
    getSelected: -> @get localStorage['selectedHero']
    getAll: ->
      all = {}
      all[v.id] = v for k, v of rpg.service.HeroService.getAll(storage).h
      return all
    getTeam: ->
      team = rpg.service.HeroService.getTeam storage
      team.push null while team.lenght < rpg.service.HeroService.HERO_PER_TEAM
      [0...4].map (i) -> if team[i] then team[i] else null
    calcCurrentHp: (hero, now) -> rpg.service.HeroService.calcCurrentHp hero, now

  dungeon:
    get: (id) -> rpg.service.DungeonService.get id
    getResult: -> rpg.service.DungeonService.getLatestResult storage
    setSelected: (e) -> localStorage['selectedDungeon'] = e
    getSelected: -> @get localStorage['selectedDungeon']
    commit: (depth) ->
      now = Date.now()
      rpg.service.DungeonService.commit storage, now, @getSelected(), depth

  area:
    master:{}

window.service = service
