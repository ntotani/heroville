dungeons =
  1:
    name:'仕事のなる木'
    desc:'すくすくと育っていく仕事'
    depth:1
    preDepth:'エリア'
    postDepth:''
    lotteryTable:[]
    nameTable: ['ドーリョ', 'ブーカ', 'ジョーシ']
    boss:[
      {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[2]}
    ]
  2:
    name:'仕事のなる木々'
    desc:'段々ヤバい気がしてくる'
    depth:2
    preDepth:'エリア'
    postDepth:''
    lotteryTable:[
      {
        enemies:[
          {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[2]}
        ]
        rate:100
      }
    ]
    nameTable: ['ドーリョ', 'ブーカ', 'ジョーシ']
    boss:[
      {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[2]}
    ]
  3:
    name:'無職の大樹'
    desc:'もう取り返しがつかない'
    depth:3
    preDepth:'エリア'
    postDepth:''
    lotteryTable:[
      {
        enemies:[
          {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[2]}
        ]
        rate:100
      }
    ]
    nameTable: ['ドーリョ', 'ブーカ', 'ジョーシ']
    boss:[
      {name: '前のボス', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[2]}
      {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[2]}
    ]

service.dungeon.master = dungeons
