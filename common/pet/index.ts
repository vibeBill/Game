import { AttributeType } from "@/utils/enum";
import { IRacialValue, ISkill, ITalentValue } from "@/utils/interface";

class Pet {
  pid: number; // 宠物编号
  name: string; // 名字
  gender: string; // 性别
  racialValue: IRacialValue;
  talentValue: ITalentValue;
  attribute: AttributeType; // 属性
  skillGroup: Array<ISkill> = []; // 技能组
  // 能力值
  HP: number = 0;
  PA: number = 0;
  PD: number = 0;
  MA: number = 0;
  MD: number = 0;
  SP: number = 0;
  constructor(
    pid: number,
    name: string,
    gender: string,
    level: number,
    racialValue: IRacialValue,
    talentValue: ITalentValue,
    attribute: AttributeType,
    skillGroup: Array<ISkill>
  ) {
    this.pid = pid;
    this.name = name;
    this.gender = gender;
    this.racialValue = racialValue;
    this.talentValue = talentValue;
    this.attribute = attribute;
    this.skillGroup = skillGroup;
    this.init(level);
  }

  init(level: number) {
    this.HP = Math.floor(
      ((this.racialValue.HP * 2 + this.talentValue.HP) * level) / 100 +
        level +
        10
    );
    this.PA = Math.floor(
      ((this.racialValue.PA * 2 + this.talentValue.PA) * level) / 100 + 5
    );
    this.PD = Math.floor(
      ((this.racialValue.PD * 2 + this.talentValue.PD) * level) / 100 + 5
    );
    this.MA = Math.floor(
      ((this.racialValue.MA * 2 + this.talentValue.MA) * level) / 100 + 5
    );
    this.MD = Math.floor(
      ((this.racialValue.MD * 2 + this.talentValue.MD) * level) / 100 + 5
    );
    this.SP = Math.floor(
      ((this.racialValue.SP * 2 + this.talentValue.SP) * level) / 100 + 5
    );
  }
}

export default Pet;
