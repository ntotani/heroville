$ ->
  dungeon = service.dungeon.getSelected()
  heros = service.hero.getTeam()
  vm =
    name: dungeon.name
    desc: dungeon.desc
    team: heros.map (e) ->
      if e
        name:e.name
        color:e.color[0].toLowerCase()
        hp: e.hp
        maxHp: e.getParameter().health
        hpRate: 100 * e.hp / e.getParameter().health
      else
        null
    teamTpl: (hero) -> if hero then 'hero' else 'empty'
    depth: [1..dungeon.depth].map (e) -> (txt:"#{dungeon.preDepth}#{e}#{dungeon.postDepth}", value:e)
  ko.applyBindings vm
  $('#commit').click ->
    service.dungeon.commit()
    location.href = 'battle.html'
