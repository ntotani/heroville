enchant();
window.onload = function() {
    var core = new Core(320, 480);
    core.preload('img/map1.png').start().next(function() {
            bg = new Map(16, 16);
            bg.image = core.assets['img/map1.png']
            var tree = [];
            for (var i=0; i<30; i++) {
            var row = [];
            for (var j=0; j<20; j++) {
            row.push(164);
            }
            tree.push(row);
            }
            bg.loadData(tree);
            core.rootScene.addChild(bg);
            });
}