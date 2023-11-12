"use client";
import { useTokenContext } from "../context/token";
import React from "react";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Paper from "@mui/material/Paper";
import Grow from "@mui/material/Grow";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Grid } from "@mui/material";
const brainJson = [
  { url: "https://dl.s9p.ir/sub/brain/01.mp3", title: "قسمت اول" },
  { url: "https://dl.s9p.ir/sub/brain/02.mp3", title: "قسمت دوم" },
  { url: "https://dl.s9p.ir/sub/brain/03.mp3", title: "قسمت سوم" },
  { url: "https://dl.s9p.ir/sub/brain/04.mp3", title: "قسمت چهارم" },
  { url: "https://dl.s9p.ir/sub/brain/05.mp3", title: "قسمت پنجم" },
  { url: "https://dl.s9p.ir/sub/brain/06.mp3", title: "قسمت ششم" },
  { url: "https://dl.s9p.ir/sub/brain/07.mp3", title: "قسمت هفتم" },
  { url: "https://dl.s9p.ir/sub/brain/08.mp3", title: "قسمت هشتم" },
];
const uniJson = [
  { url: "https://dl.s9p.ir/sub/uni/01.mp4", title: "قسمت اول" },
  { url: "https://dl.s9p.ir/sub/uni/02.mp4", title: "قسمت دوم" },
  { url: "https://dl.s9p.ir/sub/uni/03.mp4", title: "قسمت سوم" },
  { url: "https://dl.s9p.ir/sub/uni/04.mp4", title: "قسمت چهارم" },
  { url: "https://dl.s9p.ir/sub/uni/05.mp4", title: "قسمت پنجم" },
  { url: "https://dl.s9p.ir/sub/uni/06.mp4", title: "قسمت ششم" },
  { url: "https://dl.s9p.ir/sub/uni/07.mp4", title: "قسمت هفتم" },
  { url: "https://dl.s9p.ir/sub/uni/08.mp4", title: "قسمت هشتم" },
];
const brain = (
  <div className="grid grid-cols-1 gap-2 justify-items-center place-content-center">
    {brainJson.map((brain) => (
      <div key={brain.url}>
        <p>{brain.title}</p>
        <audio controls preload={false}>
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
        <video width="320" height="240" controls>
          <source src={uni.url} type="video/mp4" />
        </video>
      </div>
    ))}
  </div>
);
export default function Dash() {
  const [checked, setChecked] = React.useState(false);
  const [isUni, setIsUni] = React.useState(false);

  const handleChange = (type) => {
    if (type == "brain") setChecked((prev) => !prev);
    if (type == "uni") setIsUni((prev) => !prev);
  };

  return (
    <div className="container flex flex-col pb-4 mx-auto w-80" dir="rtl">
      <img src="logo.png" alt="" className="mx-auto" srcset="" />
      <p className="text-center">آکادمی لذت خیاطی</p>

      <div className="flex items-center justify-start">
        <Switch checked={checked} onChange={(e) => handleChange("brain")} />
        <p className="px-2 bg-green-200 rounded py1">پادکست فرماندهی مغز</p>
      </div>

      <div className={`${checked ? "block" : "hidden"}  my-4`}>{brain} </div>
      <div className="flex items-center justify-start">
        <Switch checked={isUni} onChange={(e) => handleChange("uni")} />
        <p className="px-2 bg-green-200 rounded py1">
          کارگاه آموزشی دانشگاه تهران
        </p>
      </div>

      <div className={`${isUni ? "block" : "hidden"}  my-4`}>{uni} </div>
    </div>
  );
}
