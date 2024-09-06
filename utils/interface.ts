import { AttributeType, SkillType, SpecialEffectType } from "./enum";

interface IRacialValue {
  // 种族值
  HP: number; // 血量
  PA: number; // 物攻
  PD: number; // 物防
  MA: number; // 魔攻
  MD: number; // 魔防
  SP: number; // 速度
}

interface ITalentValue {
  // 天赋值
  HP: number; // 血量
  PA: number; // 物攻
  PD: number; // 物防
  MA: number; // 魔攻
  MD: number; // 魔防
  SP: number; // 速度
}

type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

type SpecialEffect = AtLeastOne<{
  [K in SpecialEffectType]: number;
}>;

interface ISkill {
  name: string; // 技能名称
  description: string; // 技能描述
  type: SkillType; // 技能类型
  attribute: AttributeType; // 技能属性
  power: number; // 技能威力
  pp: number; // 技能PP
  accuracy: number; // 技能命中率
  priority: number; // 技能优先级
  specialEffect?: SpecialEffect; // 特殊效果
}

interface IPetData {
  level: number; // 等级
  gender: string; // 性别
  talentValue: ITalentValue; // 天赋值
}

export type { IRacialValue, ITalentValue, ISkill, IPetData };
