$ ->
  heros = service.hero.getAll()
  vm =
    heros: _.values(heros).map (e) ->
      id: e.id
      name:e.name
      color:e.color[0].toLowerCase()
      hp: e.hp
      maxHp: e.getParameter().health
      hpRate: 100 * e.hp / e.getParameter().health
    onHeroClick: (e) ->
      service.hero.setSelected e.id
      location.href = 'hero.html'
    scene: 'heros'
  ko.applyBindings vm
