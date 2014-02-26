$ ->
  all = service.hero.getAll()
  team = service.hero.getTeam()
  now = Date.now()
  hero2vm = (e) ->
    if e
      id:e.id
      name:e.name
      iconClasses: -> "hero-#{e.color[0].toLowerCase()}#{if @hp() < 1 then ' hero-dead' else ''}"
      hp: ko.observable service.hero.calcCurrentHp(e, now)
      maxHp: e.getParameter().health
      hpRate: -> 100 * @hp() / e.getParameter().health
      inTeam: -> not not _.find(vm.team(), (e) => e?.id is @id)
    else
      null
  vm =
    team: ko.observableArray(team.map hero2vm)
    others: ko.observableArray((hero2vm(e) for id, e of all when not _.find(team, (e) -> e?.id is id)))
    teamTpl: (hero) -> if hero then 'hero' else 'empty'
    onHeroClick: ->
      if @inTeam()
        vm.team.remove this
        vm.team.push null
        vm.others.unshift this
      else if vm.team()[3] is null
        vm.others.remove this
        vm.team.pop()
        vm.team.unshift this
    validate: -> (e for e in vm.team() when e isnt null).length > 0
  ko.applyBindings vm

  setInterval ->
    now = Date.now()
    for e, i in vm.team when e
      if e.hp() < e.maxHp
        e.hp service.hero.calcCurrentHp(team[i], now)
  , 1000

  $('#commit').click ->
    return unless vm.validate()
    service.hero.setTeam (e.id for e in vm.team() when e isnt null)
    history.back()
