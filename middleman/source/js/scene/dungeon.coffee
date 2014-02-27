$ ->
  dungeon = service.dungeon.getSelected()
  heros = service.hero.getTeam()
  now = Date.now()
  vm =
    name: dungeon.name
    desc: dungeon.desc
    team: heros.map (e) ->
      if e
        name:e.name
        iconClasses: -> "hero-#{e.color[0].toLowerCase()}#{if @hp() < 1 then ' hero-dead' else ''}"
        hp: ko.observable service.hero.calcCurrentHp(e, now)
        maxHp: e.getParameter().health
        hpRate: -> 100 * @hp() / e.getParameter().health
      else
        null
    teamTpl: (hero) -> if hero then 'hero' else 'empty'
    depth: [1..dungeon.depth].map (e) -> (txt:"#{dungeon.preDepth}#{e}#{dungeon.postDepth}", value:e)
    selectedDepth: dungeon.depth
    validate: -> vm.team.filter((e)->e isnt null).every (e) -> e.hp() > 0
  ko.applyBindings vm

  setInterval ->
    now = Date.now()
    for e, i in vm.team when e
      if e.hp() < e.maxHp
        e.hp service.hero.calcCurrentHp(heros[i], now)
  , 1000

  $('#commit').click ->
    return unless vm.validate()
    service.dungeon.commit vm.selectedDepth
    location.href = 'battle.html'
