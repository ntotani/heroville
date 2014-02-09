enchant()

WIDTH  = 320
HEIGHT = 480

LOG = [
  (txt:'ナベリオン達があらわれた！')
  (txt:'ハルヒロのファイアソード！<br/>ナベリオンに100ダメージ！', actor:0, damage:(2:100))
  (txt:'ナベリオンのファイアソード！<br/>ハルヒロに100ダメージ！', actor:2, damage:(0:100))
  (txt:'ナベ助のファイアソード！<br/>スク水子に50ダメージ！', actor:3, damage:(1:50))
  (txt:'スク水子のマグロソード！<br/>ナベリオンに200ダメージ！<br/>ナベリオンは倒れた！', actor:1, damage:(2:200))
  (txt:'ハルヒロのファイアソード！<br/>ナベ助に100ダメージ！', actor:0, damage:(3:100))
  (txt:'ナベ助のファイアソード！<br/>スク水子に50ダメージ！', actor:3, damage:(1:50))
  (txt:'スク水子のマグロソード！<br/>ナベ助に200ダメージ！<br/>ナベ助は倒れた！', actor:1, damage:(3:200))
  (txt:'戦闘に勝利した！')
  (txt:'ハルヒロは1の攻撃expを手に入れた')
  (txt:'ナベリオンが仲間になった！')
]

Avatar.prototype.loadImage = ->
  code = @getCode().replace /:/g, '_'
  surface = enchant.Surface.load 'img/' + code + '.gif', =>
    @image = surface

itemHeight = 48
herosPerTeam = 4
dungeonHeros = []

dungeonScene = ->
  bg = new Sprite WIDTH, HEIGHT
  bg.backgroundColor = 'white'
  teamLabel = parseContent 'パーティ'
  teamLabel.alignLeftIn(bg, 10).alignTopIn(bg, 10)
  team = new ListView WIDTH, itemHeight * herosPerTeam
  team.alignBottomOf teamLabel
  refreshHeros = ->
    team.content = []
    for i in [0..herosPerTeam]
      name = if dungeonHeros[i] then dungeonHeros[i].name else ''
      listItem = new ListItem WIDTH, 48, name, null, '>'
      team.addChild listItem
  refreshHeros()
  team.ontouchstart = ->
    nextScene = teamSelectScene()
    nextScene.onexit = refreshHeros
    Core.instance.pushScene nextScene
  label = parseContent '目標地点'
  label.alignLeftIn(bg, 10).alignBottomOf(team, 10)
  depth = new InputSelectBox (1:'地下1階', 2:'地下2階', 3:'地下3階')
  depth.alignRightOf(label).alignBottomOf(team, 5)
  cancel = new Button '戻る'
  cancel.alignLeftIn(bg, 10).alignBottomIn(bg, 10)
  cancel.ontouchstart = -> Core.instance.popScene()
  commit = new Button '出発'
  commit.alignRightIn(bg, 10).alignBottomIn(bg, 10)
  commit.ontouchstart = ->
    return if dungeonHeros.length < 1
    Core.instance.popScene()
    Core.instance.replaceScene battleScene()
  scene = new Scene
  scene.addChild bg
  scene.addChild team
  scene.addChild teamLabel
  scene.addChild label
  scene.addChild depth
  scene.addChild cancel
  scene.addChild commit
  return scene

herosScene = ->
  hdr = new NavigationBar '勇者たち'
  ftr = footer()
  listView = new ListView WIDTH, HEIGHT - hdr.height - ftr.height
  listView.y = hdr.height
  heros.forEach (hero) ->
    item = new ListItem WIDTH, 48, hero.name, new Avatar '1:2:1:2597:21270:0'
    item.ontouchend = -> Core.instance.pushScene new DetailScene(hero)
    listView.addChild item
  scene = new Scene
  scene.addChild hdr
  scene.addChild listView
  scene.addChild ftr
  return scene

teamSelectScene = ->
  bg = new Sprite WIDTH, HEIGHT
  bg.backgroundColor = 'white'
  back = new Button '戻る'
  back.ontouchstart = -> Core.instance.popScene()
  commit = new Button '決定'
  commit.ontouchstart = ->
    dungeonHeros = (e.hero for e in teamList.content)
    Core.instance.popScene()
  header = new NavigationBar 'パーティ選択', back, commit
  teamList = new ListView WIDTH, itemHeight * herosPerTeam
  teamList.alignBottomOf header
  herosList = new ListView WIDTH, HEIGHT - header.height - teamList.height
  herosList.alignBottomOf teamList
  selectedItem = null
  button = new Button 'パーティに入れる'
  button.ontouchstart = ->
    if selectedItem.inTeam
      teamList.removeChild selectedItem
      herosList.addChild selectedItem
    else
      herosList.removeChild selectedItem
      teamList.addChild selectedItem
    selectedItem.inTeam = not selectedItem.inTeam
    Core.instance.popScene()
  heros.forEach (hero) ->
    inTeam = dungeonHeros.reduce ((e, p) -> p + (if e.id is hero.id then 1 else 0)), 0
    item = new ListItem WIDTH, itemHeight, hero.name, new Avatar '1:2:1:2597:21270:0'
    item.inTeam = not not inTeam
    item.hero = hero
    item.ontouchend = ->
      button.content = if item.inTeam then 'パーティから外す' else 'パーティに入れる'
      selectedItem = item
      if teamList.content.length >= herosPerTeam and not item.inTeam
        Core.instance.pushScene new DetailScene(hero)
      else
        Core.instance.pushScene new DetailScene(hero, button)
    (if inTeam then teamList else herosList).addChild item
  scene = new Scene
  scene.addChild bg
  scene.addChild header
  scene.addChild teamList
  scene.addChild herosList
  return scene

heros = [
  (id: 0, name: 'ハルヒロ', exp: 0)
]

class Detail extends EntityGroup
  constructor: (margin, hero, button) ->
    EntityGroup.call this, WIDTH - margin, HEIGHT - margin
    np = new enchant.widget.Ninepatch @width, @height
    np.src = Core.instance.assets['dialog.png']
    avatar = new Avatar '1:2:1:2597:21270:0'
    exp = new Label('exp: ' + hero.exp)
    exp.alignBottomOf(avatar).alignLeftIn(avatar, 10)
    close = new Button 'X'
    close.alignRightIn(this, -10).alignTopIn(this, -10)
    close.ontouchstart = -> Core.instance.popScene()
    margin = 10
    button.alignHorizontalCenterIn(this).alignBottomIn(this, margin) if button
    @background = np
    @addChild avatar
    @addChild exp
    @addChild close
    @addChild button if button

class DetailScene extends Modal
  constructor: (hero, button) ->
    Modal.call this
    margin = 32
    detail = new Detail margin, hero, button
    detail.alignHorizontalCenterIn(this).alignVerticalCenterIn this
    @addChild detail

battleScene = ->
  bg = new AvatarBG 1
  boy = new Avatar '1:2:1:2597:21270:0'
  boy.y = 48
  enemy = new Avatar '1:2:1:2597:21270:0'
  enemy.x = WIDTH - 64
  enemy.y = 48
  enemy.scaleX = 1
  list = new ListView WIDTH, HEIGHT - 176
  list.y = 176
  index = 0
  applyLog = ->
    if index >= LOG.length
      hero.exp++ for hero in heros
      heros.push (id: heros.length, exp: 0, name: 'ナベリオン')
      Core.instance.replaceScene mapScene()
      return
    item = new ListItem WIDTH, 48, LOG[index].txt
    list.addChild item
    index++
  applyLog()
  scene = new Scene
  scene.addChild bg
  scene.addChild boy
  scene.addChild enemy
  scene.addChild list
  scene.ontouchend = applyLog
  return scene

mapScene = ->
  mapData = ((164 for j in [0...20]) for i in [0...30])
  mapData[i][j] = 1 for i in [13..16] for j in [8..11]
  treeData = ((-1 for j in [0...20]) for i in [0...30])
  treeData[14][9]  = 60
  treeData[14][10] = 61
  treeData[15][9]  = 76
  treeData[15][10] = 77
  collision = ((0 for j in [0...20]) for i in [0...30])
  collision[14][9]  = 1
  collision[14][10] = 1
  collision[15][9]  = 1
  collision[15][10] = 1
  bg = new Map 16, 16
  bg.image = Core.instance.assets['img/map1.png']
  bg.loadData mapData, treeData
  bg.collisionData = collision
  scene = new Scene
  scene.ontouchend = (e) ->
    Core.instance.pushScene dungeonScene() if bg.hitTest e.x, e.y
  scene.addChild bg
  scene.addChild footer()
  return scene

footer = ->
  core = Core.instance
  flag = new Sprite 32, 32
  flag.backgroundColor = 'red'
  flagIcon = new Icon flag, '冒険'
  flagIcon.ontouchend = -> core.replaceScene mapScene()
  team = new Sprite 32, 32
  team.backgroundColor = 'green'
  teamIcon = new Icon team, 'パーティ'
  teamIcon.ontouchend = -> core.replaceScene herosScene()
  iconMenu = new IconMenu [flagIcon, teamIcon]
  iconMenu.y = HEIGHT - iconMenu.height
  return iconMenu

window.onload = ->
  core = new Core WIDTH, HEIGHT
  core.preload('img/map1.png', 'avatarBg1.png', 'avatarBg2.png', 'avatarBg3.png').start().next ->
    core.pushScene mapScene()
