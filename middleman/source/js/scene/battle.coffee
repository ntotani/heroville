enchant()
$ ->
  result = service.dungeon.getResult()
  area = service.dungeon.get(result.dungeonId).area

  hs2vm = (e) ->
    color: e.color[0].toLowerCase()
    name: e.name
    hp: e.hp
    maxHp: e.getParameter().health
  battleState = (idx) ->
    battle = result.battles[idx]
    friends = battle.teamRed
    enemies = battle.teamBlue
    (
      caption: "#{enemies.map((e) -> e.name).join(', ')}が現れた！"
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
    onStepClick: (->)
  ko.applyBindings vm

  currentBtl = 0
  currentAct = 0
  engine = new rpg.battle.Engine result.battles[0].teamRed, result.battles[0].teamBlue
  engine.applyNewTurn()
  logs = _.flatten result.battles[0].turns
  Prms = rpg.Parameters
  exp = Prms.zero()
  parseResult = ->
    if engine.isFinish()
      exp = Prms.sum(exp, enemy.calcExp()) for enemy in result.battles[currentBtl].teamBlue
      currentAct = 0
      currentBtl++
      if currentBtl >= result.battles.length or engine.isWin(1)
        messages = if engine.isWin(1)
          ['クエスト失敗...']
        else
          prmName = {attack:'攻撃', block:'防御', speed:'速度', health:'体力'}
          expMes = "#{v}の#{prmName[k]}経験値を得た" for k, v of exp when v > 0
          calcLevel = rpg.Hero.calcLevel
          friends = (hero for id, hero of engine.heros.h when hero.team is 0).reduce (p, e) ->
            p[e.hero.id] = e
            return p
          , {}
          lvUpMes = result.battles[0].teamRed.filter((e) ->
            calcLevel(Prms.sum(e.effort, exp)) > e.getLevel() and friends[e.id].alive()
          ).map((e) ->
              "#{e.name}はレベル#{calcLevel(Prms.sum(e.effort, exp))}になった！"
          )
          joinMes = (("#{enemy.name}が仲間になった" for enemy in battle.teamBlue when enemy.id is result.join) for battle in result.battles)
          joinMes = _.flatten joinMes
          ['クエスト成功！'].concat expMes, lvUpMes, joinMes
        lastLog = ko.observableArray()
        vm.battles.unshift lastLog
        vm.onStepClick = showResult lastLog, messages
        vm.onStepClick()
      else
        vm.battles.unshift(ko.observableArray([battleState currentBtl]))
        engine = new rpg.battle.Engine result.battles[currentBtl].teamRed, result.battles[currentBtl].teamBlue
        engine.applyNewTurn()
        logs = _.flatten result.battles[currentBtl].turns
        moveAvatar(hero for id, hero of engine.heros.h when hero.team isnt 0)
    else
      log = logs[currentAct]
      currentAct++
      engine.applyAction log
      actor = engine.getHero log.actor
      target = engine.getHero log.target
      skill = actor.hero.skills[log.skill]
      if not actor.alive() or log.effect is 0
        parseResult()
      else
        actAvatar actor, target, skill
        vm.battles()[0].unshift (txt:"#{actor.hero.name}の#{skill.name}！#{target.hero.name}に#{log.effect}ダメージ！", tpl:'action-tpl')
    scrollTo 0, 0
  showResult = (battleVm, messages) ->
    ->
      battleVm.unshift {txt:messages.shift(), tpl:'action-tpl'}
      if messages.length < 1
        vm.onStepClick = (-> location.href = "map.html?area=#{area}")
        vm.finish true
  vm.onStepClick = parseResult

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
        avatar.nextAction = if avatar.action is 'dead' then 'dead' else 'stop'
        avatar.action = 'run'
        avatar.tl.delay(15).then -> @action = @nextAction
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
    bgMap = {1:1, 2:3}
    avatarBg = new AvatarBG(bgMap[area])
    avatarBg.scrollPos = 0
    avatarBg.scrollTarget = 0
    avatarBg.onenterframe = -> @scroll ++@scrollPos if @scrollPos < @scrollTarget
    friendIdx = 0
    enemyIdx = 0
    for id, e of engine.heros.h
      avatar = new Avatar e.hero.color[0]
      if e.team is 0
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
  docElem = $ document.documentElement
  $('#enchant-stage').css(position:'fixed', top:0, left:(docElem.width() - 320) / 2, 'z-index': 1030)

