$ ->
  heros = service.hero.getAll()
  now = Date.now()
  MSPR = rpg.service.HeroService.MSEC_PER_RECOVER / 1000
  vm =
    now: ko.observable(now),
    heros: _.values(heros).map (e) ->
      id: e.id
      name:e.name
      iconClasses: -> "hero-#{e.color[0].toLowerCase()}#{if @hp() < 1 then ' hero-dead' else ''}"
      hp: ko.observable service.hero.calcCurrentHp(e, now)
      maxHp: e.getParameter().health
      hpRate: -> 100 * @hp() / e.getParameter().health
    onHeroClick: (e) ->
      service.hero.setSelected e.id
      location.href = 'hero.html'
    scene: 'heros'
    footer: true
  ko.applyBindings vm
  setInterval ->
    now = Date.now()
    for e, i in vm.heros
      if e.hp() < e.maxHp
        e.hp service.hero.calcCurrentHp(heros[e.id], now)
    vm.now(now)
  , 1000
