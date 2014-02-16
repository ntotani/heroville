enchant()
$ ->
  result = service.dungeon.getResult()
  userid = service.user.getId()

  hs2vm = (e) ->
    color: e.hero.color[0].toLowerCase()
    name: e.hero.name
    hp: e.hp
    maxHp: e.hero.getParameter().health
  battleState = (idx) ->
    battle = result.battles[idx]
    friends = _.values(battle.heros).filter (e) -> e.team is userid
    enemies = _.values(battle.heros).filter (e) -> e.team isnt userid
    (
      caption: "#{enemies.map((e) -> e.hero.name).join(', ')}が現れた！"
      heros: [0...Math.max(friends.length, enemies.length)].map (i) ->
        red: if friends[i] then hs2vm friends[i] else null
        blue: if enemies[i] then hs2vm enemies[i] else null
      tpl:'state-tpl'
    )
  vm =
    battles: ko.observableArray([
      ko.observableArray([battleState 0])
    ])
    log2tpl: (log) -> log.tpl
    finish:ko.observable false
  ko.applyBindings vm

  logs = _.flatten result.battles[0].turns
  currentBtl = 0
  currentAct = 0
  docElem = $ document.documentElement
  showNextLog = ->
    if currentAct >= logs.length
      currentAct = 0
      currentBtl++
      if currentBtl >= result.battles.length
        vm.finish true
        $('#step').unbind 'click', showNextLog
        $('#step').click -> location.href = 'map.html'
      else
        vm.battles.push(ko.observableArray([battleState currentBtl]))
        logs = _.flatten result.battles[currentBtl].turns
        moveAvatar(hero for id, hero of result.battles[currentBtl].heros when hero.team isnt userid)
    else
      log = logs[currentAct]
      actor = result.battles[currentBtl].heros[log.actor]
      target = result.battles[currentBtl].heros[log.target]
      skill = actor.hero.skills[log.skill]
      actAvatar actor, target, skill
      vm.battles()[currentBtl].push (txt:"#{actor.hero.name}の#{skill.name}！#{target.hero.name}に#{log.effect}ダメージ！", tpl:'action-tpl')
      currentAct++
    docElem.animate (scrollTop:document.body.scrollHeight), 'fast'
  $('#step').click showNextLog

  avatars = {}
  avatarBg = null
  leftX = (i) -> ((i + 1) % 2) * 64
  rightX = (i) -> 320 - 64 - leftX(i)
  heroY = (i) -> (i / 2 | 0) * 64 + 48
  actAvatar = (actorState, targetState, skill) ->
    avatar.tl.skip 1000 for id, avatar of avatars
    # switch by skill type
    actor = avatars[actorState.id]
    target = avatars[targetState.id]
    from = (x:actor.x, y:actor.y)
    to = (x:target.x + 32 * actor.scaleX, y:target.y)
    time = Math.sqrt(Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2)) / 15
    parentNode = actor.parentNode
    parentNode.removeChild actor
    parentNode.addChild actor
    actor.action = 'run'
    actor.tl.moveTo(to.x, to.y, time).then(->
      @action = 'attack'
    ).delay(10).then(->
      target.action = if targetState.hp > 0 then 'damage' else 'dead'
    ).delay(20).then(->
      @scaleX *= -1
      @action = 'run'
    ).moveTo(from.x, from.y, time).then ->
      @scaleX *= -1
      @action = 'stop'
  moveAvatar = (enemies) ->
    avatar.tl.skip 1000 for id, avatar of avatars
    for id, avatar of avatars
      if avatar.scaleX is 1
        avatar.remove()
      else
        avatar.action = 'run'
        avatar.tl.delay(15).then -> @action = 'stop'
    avatarBg.scrollTarget = 15
    for e, i in enemies
      avatar = new Avatar e.hero.color[0]
      dx = rightX i
      avatar.y = heroY i
      avatar.scaleX *= -1
      avatar.x = dx + 128 * avatar.scaleX
      avatar.action = 'run'
      avatar.tl.moveTo(dx, avatar.y, 15).then -> @action = 'stop'
      avatars[e.id] = avatar
      core.rootScene.addChild avatar
  core = new Core 320, 176
  core.preload("img/avatarBg#{e}.png" for e in [1,2,3]).start().next ->
    avatarBg = new AvatarBG 1
    avatarBg.scrollPos = 0
    avatarBg.scrollTarget = 0
    avatarBg.onenterframe = -> @scroll ++@scrollPos if @scrollPos < @scrollTarget
    friendIdx = 0
    enemyIdx = 0
    for id, e of result.battles[0].heros
      avatar = new Avatar e.hero.color[0]
      if e.team is userid
        dx = leftX friendIdx
        avatar.y = heroY friendIdx
        friendIdx++
      else
        dx = rightX enemyIdx
        avatar.y = heroY enemyIdx
        enemyIdx++
        avatar.scaleX *= -1
      avatar.x = dx + 128 * avatar.scaleX
      avatar.action = 'run'
      avatar.tl.moveTo(dx, avatar.y, 15).then -> @action = 'stop'
      avatars[id] = avatar
    core.rootScene.addChild avatarBg
    core.rootScene.addChild hero for id, hero of avatars
  $('#enchant-stage').css(position:'fixed', top:0, left:(docElem.width() - 320) / 2, 'z-index': 1030)

