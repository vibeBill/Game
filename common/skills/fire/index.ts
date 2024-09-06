import { AttributeType, SkillType, SpecialEffectType } from "@/utils/enum";
import { ISkill } from "@/utils/interface";

const spark: ISkill = {
  name: "火花",
  type: SkillType.magical,
  description: "对目标造成伤害,有一定几率使目标灼烧",
  attribute: AttributeType.fire,
  power: 40,
  pp: 20,
  accuracy: 100,
  priority: 8,
  specialEffect: {
    [SpecialEffectType.burn]: 0.3, // 30%几率使目标灼烧
  },
};

export { spark };
