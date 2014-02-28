writers = [
  'ウセキソ'
  'ユウノスケリ'
  'キシ'
  'ウガイオ'
  'キオユ'
  'スナリヤ'
  'ポラン'
  'ジスマ'
  'サムオ'
  'ニオク'
  'ジンケ'
  'キチュ'
  'キコア'
]

philo = [
  'トカン'
  'テレス'
  'ラプトン'
  'ヘルーゲ'
  'マルスク'
  'イデガーハ'
  'ゲウィトン'
  'カルトデ'
  'エニーチ'
  'トルサル'
  'ツライプ'
  'パポ'
  'ロイトフ'
  'ソラクステ'
  'ソルル'
  'ニュート'
]

dungeons =
  1:
    id:1
    area:1
    name:'仕事のなる木'
    desc:'すくすくと大きくなっていく'
    depth:1
    preDepth:'欠勤'
    postDepth:'日'
    lotteryTable:[]
    nameTable: writers
    boss:[
      {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[3]}
      {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[3]}
    ]
  2:
    id:2
    area:1
    name:'仕事のなる木々'
    desc:'まだ大丈夫なレベル'
    depth:2
    preDepth:'欠勤'
    postDepth:'日'
    lotteryTable:[
      {
        enemies:[
          {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[3]}
          {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[3]}
        ]
        rate:1
      }
    ]
    nameTable: writers
    boss:[
      {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[3]}
      {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[3]}
      {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[3]}
    ]
  3:
    id:3
    area:1
    name:'無職の森'
    desc:'もう取り返しがつかない'
    depth:3
    preDepth:'欠勤'
    postDepth:'日'
    lotteryTable:[
      {
        enemies:[
          {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:4, speed:0, health:0}, skills:[3]}
          {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:4, speed:0, health:0}, skills:[3]}
        ]
        rate:1
      }
    ]
    nameTable: writers
    boss:[
      {name: 'グリーン勤怠', color:'TREE', plan:'MONKEY', effort:{attack:0, block:4, speed:0, health:0}, skills:[3]}
      {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:4, speed:0, health:0}, skills:[3]}
      {name: '_RAND_', color:'TREE', plan:'MONKEY', effort:{attack:0, block:4, speed:0, health:0}, skills:[3]}
    ]
  4:
    id:4
    area:2
    name:'小さなツボ'
    desc:'顧客が説明した要件'
    depth:3
    preDepth:'残業'
    postDepth:'時間'
    lotteryTable:[
      {
        enemies:[
          {name: '_RAND_', color:'WATER', plan:'MONKEY', effort:{attack:2, block:2, speed:2, health:2}, skills:[2]}
          {name: '_RAND_', color:'WATER', plan:'MONKEY', effort:{attack:2, block:2, speed:2, health:2}, skills:[2]}
          {name: '_RAND_', color:'WATER', plan:'MONKEY', effort:{attack:0, block:0, speed:3, health:0}, skills:[2]}
        ]
        rate:1
      }
      {
        enemies:[
          {name: '_RAND_', color:'WATER', plan:'MONKEY', effort:{attack:3, block:3, speed:3, health:3}, skills:[2]}
          {name: '_RAND_', color:'TREE',  plan:'MONKEY', effort:{attack:2, block:2, speed:2, health:2}, skills:[3]}
        ]
        rate:1
      }
    ]
    nameTable: philo
    boss:[
      {name: '_RAND_', color:'WATER', plan:'MONKEY', effort:{attack:4, block:3, speed:3, health:3}, skills:[2]}
      {name: '_RAND_', color:'WATER', plan:'MONKEY', effort:{attack:0, block:1, speed:1, health:1}, skills:[2]}
      {name: '_RAND_', color:'TREE',  plan:'MONKEY', effort:{attack:2, block:2, speed:2, health:2}, skills:[3]}
    ]
  5:
    id:5
    area:2
    name:'とても便利なツボ'
    desc:'プロジェクトリーダーの理解'
    depth:4
    preDepth:'残業'
    postDepth:'時間'
    lotteryTable:[
      {
        enemies:[
          {name: '_RAND_', color:'WATER', plan:'MONKEY', effort:{attack:4, block:3, speed:3, health:3}, skills:[2]}
          {name: '_RAND_', color:'WATER', plan:'MONKEY', effort:{attack:2, block:2, speed:2, health:2}, skills:[2]}
          {name: '_RAND_', color:'WATER', plan:'MONKEY', effort:{attack:2, block:2, speed:2, health:2}, skills:[2]}
        ]
        rate:1
      }
      {
        enemies:[
          {name: '_RAND_', color:'WATER', plan:'MONKEY', effort:{attack:4, block:3, speed:3, health:3}, skills:[2]}
          {name: '_RAND_', color:'TREE',  plan:'MONKEY', effort:{attack:2, block:2, speed:2, health:2}, skills:[3]}
        ]
        rate:1
      }
    ]
    nameTable: philo
    boss:[
      {name: '_RAND_', color:'WATER', plan:'MONKEY', effort:{attack:4, block:3, speed:3, health:3}, skills:[2]}
      {name: '_RAND_', color:'WATER', plan:'MONKEY', effort:{attack:3, block:3, speed:3, health:3}, skills:[2]}
      {name: '_RAND_', color:'TREE',  plan:'MONKEY', effort:{attack:3, block:3, speed:3, health:3}, skills:[3]}
    ]
  6:
    id:6
    area:2
    name:'絶対に便利なはずのツボ'
    desc:'営業の表現'
    depth:4
    preDepth:'残業'
    postDepth:'時間'
    lotteryTable:[
      {
        enemies:[
          {name: '_RAND_', color:'WATER', plan:'MONKEY', effort:{attack:4, block:3, speed:3, health:3}, skills:[2]}
          {name: '_RAND_', color:'WATER', plan:'MONKEY', effort:{attack:2, block:2, speed:2, health:2}, skills:[2]}
          {name: '_RAND_', color:'WATER', plan:'MONKEY', effort:{attack:2, block:2, speed:2, health:2}, skills:[2]}
        ]
        rate:1
      }
      {
        enemies:[
          {name: '_RAND_', color:'WATER', plan:'MONKEY', effort:{attack:4, block:3, speed:3, health:3}, skills:[2]}
          {name: '_RAND_', color:'WATER', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[2]}
          {name: '_RAND_', color:'TREE',  plan:'MONKEY', effort:{attack:2, block:2, speed:2, health:2}, skills:[3]}
        ]
        rate:1
      }
      {
        enemies:[
          {name: '_RAND_', color:'WATER', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[2]}
          {name: '_RAND_', color:'WATER', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[2]}
          {name: '_RAND_', color:'WATER', plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[2]}
          {name: '_RAND_', color:'TREE',  plan:'MONKEY', effort:{attack:8, block:7, speed:7, health:7}, skills:[3]}
        ]
        rate:1
      }
    ]
    nameTable: philo
    boss:[
      {name: '_RAND_', color:'WATER', plan:'MONKEY', effort:{attack:8, block:7, speed:7, health:7}, skills:[2]}
      {name: '_RAND_', color:'WATER', plan:'MONKEY', effort:{attack:3, block:3, speed:3, health:3}, skills:[2]}
      {name: '_RAND_', color:'TREE',  plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:13}, skills:[3]}
      {name: '_RAND_', color:'TREE',  plan:'MONKEY', effort:{attack:0, block:0, speed:0, health:0}, skills:[3]}
    ]
  7:
    id:7
    area:2
    name:'小さな箱'
    desc:'本当に必要だったもの'
    depth:5
    preDepth:'残業'
    postDepth:'時間'
    lotteryTable:[
      {
        enemies:[
          {name: '_RAND_', color:'WATER', plan:'MONKEY', effort:{attack:10, block:10, speed:10, health:10}, skills:[2]}
          {name: '_RAND_', color:'TREE',  plan:'MONKEY', effort:{attack:10, block:10, speed:10, health:10}, skills:[3]}
          {name: '_RAND_', color:'WATER', plan:'MONKEY', effort:{attack:2, block:2, speed:2, health:2}, skills:[2]}
          {name: '_RAND_', color:'TREE',  plan:'MONKEY', effort:{attack:2, block:2, speed:2, health:2}, skills:[3]}
        ]
        rate:1
      }
      {
        enemies:[
          {name: '_RAND_', color:'WATER', plan:'MONKEY', effort:{attack:4, block:3, speed:3, health:3}, skills:[2]}
          {name: '_RAND_', color:'WATER', plan:'MONKEY', effort:{attack:10, block:10, speed:10, health:10}, skills:[2]}
          {name: '_RAND_', color:'TREE',  plan:'MONKEY', effort:{attack:10, block:10, speed:10, health:10}, skills:[3]}
        ]
        rate:1
      }
      {
        enemies:[
          {name: '_RAND_', color:'WATER', plan:'MONKEY', effort:{attack:10, block:10, speed:10, health:10}, skills:[2]}
          {name: '_RAND_', color:'WATER', plan:'MONKEY', effort:{attack:4, block:3, speed:3, health:3}, skills:[2]}
          {name: '_RAND_', color:'WATER', plan:'MONKEY', effort:{attack:4, block:3, speed:3, health:3}, skills:[2]}
          {name: '_RAND_', color:'TREE',  plan:'MONKEY', effort:{attack:8, block:7, speed:7, health:7}, skills:[3]}
        ]
        rate:1
      }
    ]
    nameTable: philo
    boss:[
      {name: 'ラスボス', color:'WATER', plan:'MONKEY', effort:{attack:13, block:13, speed:13, health:12}, skills:[2]}
      {name: '_RAND_', color:'WATER', plan:'MONKEY', effort:{attack:8, block:7, speed:7, health:7}, skills:[2]}
      {name: '_RAND_', color:'WATER',  plan:'MONKEY', effort:{attack:8, block:7, speed:7, health:7}, skills:[2]}
      {name: '_RAND_', color:'WATER',  plan:'MONKEY', effort:{attack:8, block:7, speed:7, health:7}, skills:[2]}
    ]

rpg.service.DungeonService.set e.id, e for id, e of dungeons
