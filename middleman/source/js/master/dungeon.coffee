dungeons =
  1:
    id:1
    area:1
    name:'仕事のなる木'
    desc:'すくすくと育っていく仕事'
    depth:1
    preDepth:'エリア'
    postDepth:''
    lotteryTable:[]
    nameTable: ['ドーリョ', 'ブーカ', 'ジョーシ']
    boss:[
      {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[3]}
      {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[3]}
    ]
  2:
    id:2
    area:1
    name:'仕事のなる木々'
    desc:'段々ヤバい気がしてくる'
    depth:2
    preDepth:'エリア'
    postDepth:''
    lotteryTable:[
      {
        enemies:[
          {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[3]}
          {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[3]}
        ]
        rate:100
      }
    ]
    nameTable: ['ドーリョ', 'ブーカ', 'ジョーシ']
    boss:[
      {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[3]}
      {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[3]}
      {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[3]}
    ]
  3:
    id:3
    area:1
    name:'無職の大樹'
    desc:'もう取り返しがつかない'
    depth:3
    preDepth:'エリア'
    postDepth:''
    lotteryTable:[
      {
        enemies:[
          {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[3]}
          {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[3]}
          {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[3]}
        ]
        rate:100
      }
    ]
    nameTable: ['ドーリョ', 'ブーカ', 'ジョーシ']
    boss:[
      {name: 'グリーン勤怠', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[3]}
      {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[3]}
      {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[3]}
      {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[3]}
    ]
  4:
    id:4
    area:2
    name:'つぼ'
    desc:'もう取り返しがつかない'
    depth:3
    preDepth:'エリア'
    postDepth:''
    lotteryTable:[
      {
        enemies:[
          {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[3]}
          {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[3]}
          {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[3]}
        ]
        rate:100
      }
    ]
    nameTable: ['ドーリョ', 'ブーカ', 'ジョーシ']
    boss:[
      {name: 'グリーン勤怠', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[3]}
      {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[3]}
      {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[3]}
      {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[3]}
    ]

rpg.service.DungeonService.set e.id, e for id, e of dungeons
