enchant()

window.onload = ->
  wid = window.innerWidth
  hei = window.innerHeight - 55
  core = new Core(wid, hei)
  core.preload('img/map1.png').start().next ->
    area = service.area.master[1]
    map = new Map(16, 16)
    map.image = core.assets['img/map1.png']
    col = Math.ceil(wid / 16)
    row = Math.ceil(hei / 16)
    colDiff = (col - area.load[0].length) / 2 | 0
    rowDiff = (row - area.load.length) / 2 | 0

    fill = (base, cells) ->
      bg = ((base for j in [0...col]) for i in [0...row])
      for line, i in cells
        for cell, j in line
          bg[i + rowDiff][j + colDiff] = cell if cell isnt -1
      return bg
    bg = fill area.bg, area.load
    obj = fill -1, area.obj
    collision = fill -1, area.dungeons

    map.x = (wid - col * 16) / 2
    map.y = (hei - row * 16) / 2
    map.loadData bg, obj
    map.collisionData = collision
    core.rootScene.ontouchend = (e) ->
      x = e.x - colDiff * 16
      y = e.y - rowDiff * 16
      dungeonID = map.hitTest(e.x - map.x, e.y - map.y)
      if dungeonID > 0
        service.dungeon.setSelected dungeonID
        location.href = 'dungeon.html'
    core.rootScene.addChild map
