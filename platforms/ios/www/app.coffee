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
]

Avatar.prototype.loadImage = ->
  code = @getCode().replace /:/g, '_'
  surface = enchant.Surface.load 'img/' + code + '.gif', =>
    @image = surface

herosScene = ->
  hdr = new NavigationBar '勇者たち'
  ftr = footer()
  listView = new ListView WIDTH, HEIGHT - hdr.height - ftr.height, true
  listView.y = hdr.height
  item = new ListItem WIDTH, 48, 'ハルヒロ', new Avatar '1:2:1:2597:21270:0'
  item.ontouchend = -> Core.instance.pushScene new DetailScene
  listView.addChild item
  scene = new Scene
  scene.addChild hdr
  scene.addChild listView
  scene.addChild ftr
  return scene

heroExp = 0

class Detail extends EntityGroup
  constructor: (margin) ->
    EntityGroup.call this, WIDTH - margin, HEIGHT - margin
    np = new enchant.widget.Ninepatch @width, @height
    np.src = Core.instance.assets['dialog.png']
    avatar = new Avatar '1:2:1:2597:21270:0'
    exp = new Label('exp: ' + heroExp)
    exp.alignBottomOf(avatar).alignLeftIn(avatar, 10)
    @background = np
    @addChild avatar
    @addChild exp

class DetailScene extends Modal
  constructor: ->
    Modal.call this
    margin = 32
    detail = new Detail margin
    detail.alignHorizontalCenterIn(this).alignVerticalCenterIn this
    @addChild detail
    @ontouchend = -> Core.instance.popScene()

battleScene = ->
  bg = new AvatarBG 1
  boy = new Avatar '1:2:1:2597:21270:0'
  boy.y = 48
  enemy = new Avatar '1:2:1:2597:21270:0'
  enemy.x = WIDTH - 64
  enemy.y = 48
  enemy.scaleX = 1
  list = new ListView WIDTH, HEIGHT - 176, true
  list.y = 176
  index = 0
  applyLog = ->
    if index >= LOG.length
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
    Core.instance.replaceScene battleScene() if bg.hitTest e.x, e.y
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
