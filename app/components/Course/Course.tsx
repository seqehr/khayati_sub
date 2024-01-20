import React from "react";
import { uniJson } from "@/Helpers/data";
import { brainJson } from "@/Helpers/data";
import { products } from "@/Helpers/data";
type Props = {};

const Course = ({ id }) => {
  const product = products.find((item: any) => item.id == id);

  const brain = (
    <div className="grid grid-cols-1 gap-2 justify-items-center place-content-center">
      {brainJson.map((brain) => (
        <div key={brain.url}>
          <p>{brain.title}</p>
          <audio controls preload="false" controls controlsList="nodownload">
            <source src={brain.url} type="audio/mp3" />
          </audio>
        </div>
      ))}
    </div>
  );

  const uni = (
    <div className="grid grid-cols-1 gap-2 justify-items-center ">
      {uniJson.map((uni) => (
        <div key={uni.url}>
          <p>{uni.title}</p>
          <video width="320" height="240" controls controlsList="nodownload">
            <source src={uni.url} type="video/mp4" />
          </video>
        </div>
      ))}
    </div>
  );
  return (
    <div
      className="container flex flex-col pb-4 mx-auto lg:w-96 w-[90%] text-[12px] lg:text-base px-2 shadow-lg rounded-lg"
      dir="rtl"
    >
      <div className="text-center">{product.name}</div>

      {(() => {
        switch (id) {
          case "1":
            return <>{brain}</>;
          case "2":
            return <>{uni}</>;
        }
      })()}
    </div>
  );
};

export default Course;
