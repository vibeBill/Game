"use client";

import { DuDuPig, PuPuBear } from "@/common/pet/pets/fire";
import Bag from "@/components/game/Bag";

export default function Home() {
  const bag = {
    pets: [
      new DuDuPig({
        level: 100,
        gender: "male",
        talentValue: { HP: 21, PA: 21, PD: 30, MA: 30, MD: 15, SP: 1 },
      }),
      new PuPuBear({
        level: 100,
        gender: "female",
        talentValue: { HP: 21, PA: 21, PD: 30, MA: 30, MD: 15, SP: 1 },
      }),
    ],
    tools: [],
  };
  return (
    <div>
      <Bag data={bag} />
    </div>
  );
}
