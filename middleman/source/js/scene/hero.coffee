$ ->
  hero = service.hero.getSelected()
  now = Date.now()
  vm =
    name: hero.name
    lv: hero.getLevel()
    color: hero.color[0].toLowerCase()
    iconClasses: -> "hero-#{hero.color[0].toLowerCase()}#{if @hp() < 1 then ' hero-dead' else ''}"
    #plan: '攻撃的な性格'
    hp: ko.observable service.hero.calcCurrentHp(hero, now)
    maxHp: hero.getParameter().health
    hpRate: -> 100 * @hp() / hero.getParameter().health
    skills:hero.skills.map (e) -> (name:e.name, color:e.color[0].toLowerCase())
    footer:'back'
  ko.applyBindings vm

  setInterval ->
    now = Date.now()
    if vm.hp() < vm.maxHp
      vm.hp service.hero.calcCurrentHp(hero, now)
  , 1000

  radarChartData =
    labels : ['攻撃', '防御', '速度', '体力']
    datasets : [
      {
          fillColor : "rgba(220, 220, 220, 0.5)",
          strokeColor : "rgba(220, 220, 220, 1)",
          pointColor : "rgba(220, 220, 220, 1)",
          pointStrokeColor : "#fff",
          data : (hero.talent[e] for e in ['attack', 'block', 'speed', 'health'])
      },
      {
          fillColor : "rgba(151, 187, 205, 0.5)",
          strokeColor : "rgba(151, 187, 205, 1)",
          pointColor : "rgba(151, 187, 205, 1)",
          pointStrokeColor : "#fff",
          data : (hero.effort[e] / 4 for e in ['attack', 'block', 'speed', 'health'])
      }
    ]
  # オプション
  options =
    # 値のラインが棒グラフの値の上にかぶさるようにするか
    scaleOverlay : false,
    # 値の開始値などを自分で設定するか
    scaleOverride : false,
    
    # 以下の 3 オプションは scaleOverride: true の時に使用
    # 値のステップ数
    scaleSteps : 10,
    # 値のステップする大きさ
    scaleStepWidth : 10,
    # 値の始まりの値
    scaleStartValue : 0,
    # 値の円ラインの表示
    scaleShowLine : true,
    # 円ラインの色
    scaleLineColor : "rgba(0, 0, 0, .1)",
    # 円ラインの幅
    scaleLineWidth : 1,
    # ラベルの表示
    scaleShowLabels : false,
    # ラベルの表示フォーマット
    scaleLabel : "<%=value%>%",
    # ラベルのフォント
    scaleFontFamily : "'Arial'",
    # ラベルのフォントサイズ
    scaleFontSize : 12,
    # ラベルのフォントスタイル, normal, italic など
    scaleFontStyle : "italic",
    # ラベルの文字色
    scaleFontColor : "#666",
    # ラベルの背景色を塗りつぶすか
    scaleShowLabelBackdrop : true,
    # ラベルの背景色
    scaleBackdropColor : "rgba(255, 255, 255, 0.8)",
    # ラベルの Padding 上下
    scaleBackdropPaddingY : 5,
    # ラベルの Padding 左右
    scaleBackdropPaddingX : 5,
    # 中央からポイントラベルに向かう線の表示
    angleShowLineOut : true,
    # 中央からポイントラベルに向かう線の色
    angleLineColor : "rgba(0, 0, 0, .1)",
    # 中央からポイントラベルに向かう線の幅
    angleLineWidth : 1,
    # ポイントラベルのフォント
    pointLabelFontFamily : "'Arial'",
    # ポイントラベルのフォントスタイル
    pointLabelFontStyle : "normal",
    # ポイントラベルのサイズ
    pointLabelFontSize : 12,
    # ポイントラベルの色
    pointLabelFontColor : "#999",
    # 値の点の表示
    pointDot : true,
    # 値の点の大きさ
    pointDotRadius : 2,
    # 値の点の線の幅
    pointDotStrokeWidth : 1,
    # データ部分の枠線の表示？変化がなかった
    datasetStroke : true,
    # データ部分の枠線の幅
    datasetStrokeWidth : 1,
    # データ部分の塗りつぶし？変化がなかった
    datasetFill : true,
    # 表示の時のアニメーション
    animation : false,
    # アニメーションの速度 ( ステップ数 )
    animationSteps : 60,
    # アニメーションの種類, 以下が用意されている
    # linear, easeInQuad, easeOutQuad, easeInOutQuad, easeInCubic, easeOutCubic,
    # easeInOutCubic, easeInQuart, easeOutQuart, easeInOutQuart, easeInQuint,
    # easeOutQuint, easeInOutQuint, easeInSine, easeOutSine, easeInOutSine,
    # easeInExpo, easeOutExpo, easeInOutExpo, easeInCirc, easeOutCirc, easeInOutCirc,
    # easeInElastic, easeOutElastic, easeInOutElastic, easeInBack, easeOutBack,
    # easeInOutBack, easeInBounce, easeOutBounce, easeInOutBounce
    animationEasing : "easeOutQuad",
    # アニメーション終了後に実行する処理
    # animation: false の時にも実行されるようです
    # e.g. onAnimationComplete : function() {alert('complete');}
    onAnimationComplete : null
  new Chart(document.getElementById("chart").getContext("2d")).Radar(radarChartData, options)
