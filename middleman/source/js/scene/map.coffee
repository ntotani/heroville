enchant()

params = location.search.substr(1).split('&').reduce (p, e) ->
  e = e.split('=')
  p[e[0]] = e[1]
  return p
, {}
selectedArea = parseInt(params.area || '1')
area = service.area.master[selectedArea]

$ ->
  vm =
    scene: 'map'
    footer: service.user.getProgress() > 1
    area: area.name
  ko.applyBindings vm
  $('#area').modal('show')
  setTimeout ->
    $('#area').modal('hide')
  , 2000

window.onload = ->
  progress = service.user.getProgress()
  wid = window.innerWidth
  hei = window.innerHeight - (if progress > 1 then 55 else 0)
  core = new Core(wid, hei)
  core.preload('img/map1.png', 'img/icon0.png').start().next ->
    map = new Map(16, 16)
    map.image = core.assets['img/map1.png']
    col = Math.ceil(wid / 16)
    row = Math.ceil(hei / 16)
    colDiff = (col - area.road[0].length) / 2 | 0
    rowDiff = ((row - 3 - area.road.length) / 2 | 0) + 3

    fill = (base, cells) ->
      bg = ((base for j in [0...col]) for i in [0...row])
      for line, i in cells
        for cell, j in line
          bg[i + rowDiff][j + colDiff] = cell if cell isnt -1
      return bg
    bg = fill area.bg, area.road
    obj = fill -1, area.obj
    collision = fill -1, area.dungeons

    trimTile = area.road[area.enter.i][area.enter.j]
    trimPos = {i:area.enter.i + rowDiff, j:area.enter.j + colDiff}
    while trimPos.j >= 0
      bg[trimPos.i][trimPos.j] = trimTile
      trimPos.j--
    trimPos = {i:area.exit.i + rowDiff, j:area.exit.j + colDiff}
    while trimPos.j < col
      bg[trimPos.i][trimPos.j] = trimTile
      trimPos.j++

    calcRoad = (fi, fj, ti, tj) ->
      memo = (({dist:100000} for j in [0...col]) for i in [0...row])
      next = [{i:fi, j:fj, dist:0, si:-1, sj:-1}]
      round = [{i:-1,j:0,d:1},{i:-1,j:1,d:1.4},{i:0,j:1,d:1},{i:1,j:1,d:1.4},{i:1,j:0,d:1},{i:1,j:-1,d:1.4},{i:0,j:-1,d:1},{i:-1,j:-1,d:1.4}]
      while next.length > 0
        prm = next.shift()
        continue if prm.i < 0 or prm.i >= memo.length or prm.j < 0 or prm.j >= memo[0].length or memo[prm.i][prm.j].dist <= prm.dist
        memo[prm.i][prm.j] = {dist:prm.dist, si:prm.si, sj:prm.sj}
        break if prm.i is ti and prm.j is tj
        next.push({i:prm.i+e.i, j:prm.j+e.j, dist:prm.dist + e.d, si:prm.i, sj:prm.j}) for e in round
        next.sort (a, b) -> a.dist - b.dist
      road = [{i:ti, j:tj}]
      while memo[ti][tj].si isnt -1
        i = memo[ti][tj].si
        j = memo[ti][tj].sj
        road.push {i:i, j:j}
        ti = i
        tj = j
      return road

    dungeonCenter = _.chain((({i:i, j:j, d:d} for d, j in dd when d isnt -1) for dd, i in area.dungeons))
      .flatten()
      .groupBy((e) -> e.d)
      .mapValues (points) ->
        edge = points.reduce (p, e) ->
          p.mini = Math.min p.mini, e.i
          p.minj = Math.min p.minj, e.j
          p.maxi = Math.max p.maxi, e.i
          p.maxj = Math.max p.maxj, e.j
          return p
        , {mini:10000, minj:10000, maxi:-1, maxj:-1}
        {i:edge.mini + (edge.maxi - edge.mini) / 2 | 0, j:edge.minj + (edge.maxj - edge.minj) / 2 | 0}
      .value()
    point = {i:area.enter.i, j:area.enter.j}
    dungeons = _.sortBy(_.keys(dungeonCenter).filter((e) -> parseInt(e)), (a, b) -> a - b)
    roads = []
    for dungeon in dungeons when dungeon <= progress
      center = dungeonCenter[dungeon]
      roads.push calcRoad(point.i + rowDiff, point.j + colDiff, center.i + rowDiff, center.j + colDiff)
      point = {i:center.i, j:center.j}
    areaCleared = progress > _.last(dungeons)
    roads.push calcRoad(point.i + rowDiff, point.j + colDiff, area.exit.i + rowDiff, area.exit.j + colDiff) if areaCleared
    currentRoad = roads.shift()
    pointsLayer = new Group
    parseRoad = ->
      if currentRoad.length > 0
        e = currentRoad.pop()
        point = new Sprite 16, 16
        point.image = core.assets['img/icon0.png']
        point.frame = 47
        if currentRoad.length <= 0 and (roads.length > 0 || not areaCleared)
          point.frame = 45
          point.tl.scaleTo(2,2,20).scaleTo(1,1,20).loop()
        point.x = e.j * 16 + map.x
        point.y = e.i * 16 + map.y
        pointsLayer.addChild point
      else if roads.length > 0
        currentRoad = roads.shift()
        currentRoad.pop()
        parseRoad()
      else
        core.rootScene.onenterframe = (->)
    core.rootScene.onenterframe = parseRoad

    map.x = (wid - col * 16) / 2
    map.y = (hei - row * 16) / 2
    map.loadData bg, obj
    map.collisionData = collision
    core.rootScene.ontouchend = (e) ->
      x = e.x - colDiff * 16
      y = e.y - rowDiff * 16
      dungeonID = map.hitTest(e.x - map.x, e.y - map.y)
      if dungeonID > 0 and dungeonID <= progress
        service.dungeon.setSelected dungeonID
        location.href = 'dungeon.html'
    core.rootScene.addChild map
    core.rootScene.addChild pointsLayer
    if areaCleared and service.area.master[selectedArea + 1]
      arrow = new Sprite 16, 16
      arrow.image = core.assets['img/icon0.png']
      arrow.frame = 42
      arrow.x = (area.exit.j + colDiff) * 16 + map.x
      arrow.y = (area.exit.i + rowDiff) * 16 + map.x
      arrow.tl.moveBy(5, 0, 5).moveBy(-5, 0, 10).loop()
      arrow.ontouchend = ->
        location.href = "map.html?area=#{selectedArea + 1}"
      core.rootScene.addChild arrow
    if selectedArea > 1
      arrow = new Sprite 16, 16
      arrow.image = core.assets['img/icon0.png']
      arrow.frame = 42
      arrow.scaleX = -1
      arrow.x = (area.enter.j + colDiff) * 16 + map.x
      arrow.y = (area.enter.i + rowDiff) * 16 + map.x
      arrow.tl.moveBy(-5, 0, 5).moveBy(5, 0, 10).loop()
      arrow.ontouchend = ->
        location.href = "map.html?area=#{selectedArea - 1}"
      core.rootScene.addChild arrow
