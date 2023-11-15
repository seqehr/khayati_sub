"use client";
import { useTokenContext } from "../context/token";
import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Paper from "@mui/material/Paper";
import Grow from "@mui/material/Grow";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Grid } from "@mui/material";
import Fetch from "../Helpers/Fetch";
import { toast } from "react-toastify";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import { palette } from "@mui/system";

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
        <audio controls preload="false">
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
const Dash = () => {
  const [cart, setCart] = useState([]);
  const [checked, setChecked] = React.useState(false);
  const [isUni, setIsUni] = React.useState(false);
  const [userProducts, setUserProducts] = useState([]);
  const refs = useRef([]);
  const { token } = useTokenContext();
  const handleChange = (type) => {
    if (type == "brain") setChecked((prev) => !prev);
    if (type == "uni") setIsUni((prev) => !prev);
  };

  const fetchCart = async (token) => {
    await Fetch({ url: "sub/cart", token: token, method: "post" })
      .then((res) => res.json())
      .then((res) => {
        res.data.forEach((pro) => {
          setCart((cart) => [...cart, pro.product_id]);
        });
        console.log(res.data);
      });
  };
  const fetchUserProducts = async (token) => {
    await Fetch({ url: "sub/userProducts", token: token, method: "post" })
      .then((res) => res.json())
      .then((res) => {
        res.data.forEach((pro) => {
          setUserProducts((userProducts) => [...userProducts, pro.product_id]);
        });
        console.log(userProducts);
      });
  };
  const addToCart = (v) => {
    setCart((cart) => [...cart, v.toString()]);
    const pids = JSON.stringify([v]);
    Fetch({
      url: `sub/purchase`,
      method: "post",
      body: { pids },
      token: token,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.isDone) {
          toast.success("به سبد خرید اضافه شد ");
        }
      });
  };

  const deletePurchase = (id) => {
    setCart((cart) => cart.filter((item) => item !== id));

    Fetch({
      url: `sub/purchase/delete/${id}`,
      token: token,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.isDone) {
          toast.success("از سبد خرید حذف شد");
        }
      });
  };
  useEffect(() => {
    if (token) {
      fetchCart(token);
      fetchUserProducts(token);
    }
  }, [token]);
  return (
    <div className="container flex flex-col pb-4 mx-auto w-80" dir="rtl">
      {cart.length > 0 && (
        <div className="flex items-center justify-between px-2 mt-4 bg-green-100">
          <div className="flex flex-col">
            <p> سبد خرید : </p>
            {cart.length > 0 ? (
              <>
                {cart.length} محصول به مبلغ {cart.length * 50000} ت
              </>
            ) : (
              "۰ محصول"
            )}
          </div>
          {cart.length > 0 && (
            <Link
              href={`https://lezatkhayati.com/api/sub/pay/${token}`}
              className="px-2 mx-2 text-center rounded bg-cyan-300 max-auto"
            >
              پرداخت
            </Link>
          )}
        </div>
      )}
      <img src="logo.png" alt="" className="mx-auto" srcset="" />
      <p className="text-center">آکادمی لذت خیاطی </p>

      <div
        className="flex items-center justify-start"
        ref={(element) => {
          refs.current[1] = element;
        }}
      >
        <Switch checked={checked} onChange={(e) => handleChange("brain")} />
        <p className="px-2 bg-green-200 rounded py1">پادکست فرماندهی مغز</p>
      </div>

      <div className={`${checked ? "block" : "hidden"}  my-4`}>
        {userProducts.includes("1") ? (
          brain
        ) : (
          <>
            <img src="lock.png" width={100} height={100} className="mx-auto" />
            {cart.includes("1") ? (
              <div className="flex flex-col items-center justify-center">
                <p>این محصول در سبد خرید شما موجود است اما هنوز نخریده اید</p>
                <div className="flex">
                  {" "}
                  <Link
                    href={`https://lezatkhayati.com/api/sub/pay/${token}`}
                    className="px-2 mx-2 text-center rounded bg-cyan-300 max-auto"
                  >
                    پرداخت و مشاهده
                  </Link>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => deletePurchase("1")}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <p>
                  برای مشاهده این محصول ابتدا آن را به سبد خرید اضافه کرده و سپس
                  خریداری کنید
                </p>
                <button
                  className="px-2 text-center rounded bg-cyan-300 max-auto"
                  onClick={() => addToCart(1)}
                >
                  افزودن به سبد خرید
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <div
        className="flex items-center justify-start"
        ref={(element) => {
          refs.current[2] = element;
        }}
      >
        <Switch checked={isUni} onChange={(e) => handleChange("uni")} />
        <p className="px-2 bg-green-200 rounded py1">
          کارگاه آموزشی دانشگاه تهران
        </p>
      </div>

      <div className={`${isUni ? "block" : "hidden"}  my-4`}>
        {" "}
        {userProducts.includes("2") ? (
          uni
        ) : (
          <>
            <img src="lock.png" width={100} height={100} className="mx-auto" />
            {cart.includes("2") ? (
              <div className="flex flex-col items-center justify-center">
                <p>این محصول در سبد خرید شما موجود است اما هنوز نخریده اید</p>
                <div className="flex">
                  {" "}
                  <Link
                    href={`https://lezatkhayati.com/api/sub/pay/${token}`}
                    className="px-2 mx-2 text-center rounded bg-cyan-300 max-auto"
                  >
                    پرداخت و مشاهده
                  </Link>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => deletePurchase("2")}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <p>
                  برای مشاهده این محصول ابتدا آن را به سبد خرید اضافه کرده و سپس
                  خریداری کنید
                </p>
                <button
                  className="px-2 text-center rounded bg-cyan-300 max-auto"
                  onClick={() => addToCart(2)}
                >
                  افزودن به سبد خرید
                </button>
              </div>
            )}
          </>
        )}{" "}
      </div>
    </div>
  );
};

export default Dash;
