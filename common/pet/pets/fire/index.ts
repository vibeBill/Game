import { AttributeType } from "@/utils/enum";
import Pet from "../..";
import { spark } from "@/common/skills/fire";
import { IPetData } from "@/utils/interface";

class DuDuPig extends Pet {
  level: number;
  image: string;
  avatar: string;
  constructor(data: IPetData) {
    super(
      1,
      "嘟嘟猪",
      data.gender,
      data.level,
      {
        HP: 100,
        PA: 100,
        PD: 100,
        MA: 100,
        MD: 100,
        SP: 100,
      },
      data.talentValue,
      AttributeType.fire,
      [spark]
    );
    this.level = data.level;
    this.image =
      "https://oydqrbee757owwwj.public.blob.vercel-storage.com/genggui-dkjKK7QOBMwe1jIG4hTMDg2qfAWTFb.gif";
    this.avatar =
      "https://oydqrbee757owwwj.public.blob.vercel-storage.com/gengguiAvatar-M8xbIra0h8udVCDDKQ15SV2Is2LHr4.jpg";
  }
}

class PuPuBear extends Pet {
  level: number;
  image: string;
  avatar: string;
  constructor(data: IPetData) {
    super(
      1,
      "噗噗熊",
      data.gender,
      data.level,
      {
        HP: 110,
        PA: 80,
        PD: 100,
        MA: 120,
        MD: 100,
        SP: 80,
      },
      data.talentValue,
      AttributeType.fire,
      [spark]
    );
    this.level = data.level;
    this.image =
      "https://oydqrbee757owwwj.public.blob.vercel-storage.com/gaiouka-bXUo8DmucB20YneftvW580wTMdAjWs.gif";
    this.avatar =
      "https://oydqrbee757owwwj.public.blob.vercel-storage.com/gaioukaAvatar-W7IGsMM5MN5PoZnhxhwySoe9S8MNGB.jpg";
  }
}

export { DuDuPig, PuPuBear };
