skills =
  1:
    id      : 1
    name    : '火攻撃'
    desc    : '火の攻撃'
    color   : 'FIRE'
    type    : 'ATTACK'
    target  : 'ENEMY'
    effect  : 'ATTACK'
    power   : 40
    hitRate : 100
  2:
    id      : 2
    name    : '木攻撃'
    desc    : '木の攻撃'
    color   : 'TREE'
    type    : 'ATTACK'
    target  : 'ENEMY'
    effect  : 'ATTACK'
    power   : 40
    hitRate : 100

setter = rpg.service.SkillService.set
colors = rpg.Colors.valueOf
types = rpg.Skills.typeValueOf
targets = rpg.Skills.targetValueOf
effects = rpg.Skills.effectValueOf
for k, e of skills
  setter e.id, {
    id      : e.id
    name    : e.name
    desc    : e.desc
    color   : colors e.color
    type    : types e.type
    target  : targets e.target
    effect  : effects e.effect
    power   : e.power
    hitRate : e.hitRate
  }
