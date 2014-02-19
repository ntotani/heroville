dungeons =
  1:
    name:'トキワの森'
    desc:'薄暗い森。ピカチュウとかいる。'
    depth:1
    preDepth:'エリア'
    postDepth:''
    lotteryTable:[]
    nameTable: []
    boss:[
      {name: '前職の上司', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[1]}
    ]
  2:
    name:'トキワの森'
    desc:'薄暗い森。ピカチュウとかいる。'
    depth:2
    preDepth:'エリア'
    postDepth:''
    lotteryTable:[
      {
        enemies:[
          {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[1]}
        ]
        rate:100
      }
    ]
    nameTable: ['キャタピー', 'ビードル', 'ピカチュウ']
    boss:[
      {name: 'boss', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[1]}
    ]

service.dungeon.master = dungeons
