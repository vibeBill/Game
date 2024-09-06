"use client";

import { useState } from "react";
import styles from "./style.module.scss";
import Pet from "../Pet";

const Bag = ({ data }: { data: any }) => {
  const [selectedId, setSelectedId] = useState(0);
  const { pets, tools } = data;
  const handleClick = (id: number) => {
    setSelectedId(id);
  };
  return (
    <div className={styles.bag}>
      <div className={styles.bagContent}>
        <div className={styles.petShow}>
          <div className={styles.show}>
            {pets[selectedId] && <Pet data={pets[selectedId]} />}
          </div>
          <div className={styles.intro}>
            <div className={styles.name}>名称：{pets[selectedId].name}</div>
            <div>血量：{pets[selectedId].HP}</div>
            <div>物攻：{pets[selectedId].PA}</div>
            <div>物防：{pets[selectedId].PD}</div>
            <div>魔攻：{pets[selectedId].MA}</div>
            <div>魔防：{pets[selectedId].MD}</div>
            <div>速度：{pets[selectedId].SP}</div>
          </div>
        </div>
        <div className={styles.tools}></div>
      </div>
      <div className={styles.pets}>
        {[0, 1, 2, 3, 4, 5].map((id) => (
          <div
            className={styles.petSlot}
            key={id}
            style={{
              border: selectedId === id ? "2px solid #f00" : "1px solid #000",
            }}
            onClick={() => {
              handleClick(id);
            }}
          >
            {pets[id] && <Pet data={pets[id]} isAvatar={true} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bag;
