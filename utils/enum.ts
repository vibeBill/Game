enum SkillType {
  physical = "physical", // 物理攻击
  magical = "magical", // 魔法攻击
  buff = "buff", // 增益技能
}

enum AttributeType {
  fire = "fire", // 火
  water = "water", // 水
  grass = "grass", // 草
  electric = "electric", // 电
  ice = "ice", // 冰
  poison = "poison", // 毒
  wind = "wind", // 风
  earth = "earth", // 土
  rock = "rock", // 石
}

enum SpecialEffectType {
  poison = "poison", // 中毒
  burn = "burn", // 燃烧
  freeze = "freeze", // 冻结
  sleep = "sleep", // 睡眠
  paralysis = "paralysis", // 瘫痪
  confusion = "confusion", // 混乱
  fear = "fear", // 恐惧
  charm = "charm", // 魅惑
  curse = "curse", // 诅咒
}

export { SkillType, AttributeType, SpecialEffectType };
