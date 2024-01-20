"use client";
import { useTokenContext } from "../context/token";
import React, { useEffect, useState, useRef } from "react";
import { redirect, useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Paper from "@mui/material/Paper";
import Grow from "@mui/material/Grow";
import { FcLock } from "react-icons/fc";
// import { Steps, Hints } from "intro.js-react";
import { FcOk } from "react-icons/fc";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Grid } from "@mui/material";
import Fetch from "../Helpers/Fetch";
import { toast } from "react-toastify";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import { palette } from "@mui/system";
import toPersianNumber from "../Helpers/toPersianNumber";
import Image from "next/image";
import { uniJson } from "../Helpers/data";
import { brainJson } from "../Helpers/data";
import { products } from "../Helpers/data";
// import "intro.js/introjs.css";
// import "intro.js/introjs-rtl.css";
// import "intro.js/themes/introjs-modern.css";

const Dash = () => {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [checkeds, setCheckeds] = React.useState(["1", "2"]);
  const [price, setPrice] = React.useState(0);

  const [checked, setChecked] = React.useState(false);
  const [isUni, setIsUni] = React.useState(false);
  const [userProducts, setUserProducts] = useState([]);
  const refs = useRef([]);
  const { token, setToken } = useTokenContext();
  const handleChange = (id) => {
    const isChecked = checkeds.includes(id);

    // If it exists, remove it; otherwise, add it
    setCheckeds((prevChecked) =>
      isChecked
        ? prevChecked.filter((exists) => exists !== id)
        : [...prevChecked, id]
    );

    // if (type == "brain") setChecked((prev) => !prev);
    // if (type == "uni") setIsUni((prev) => !prev);
  };
  const onExit = () => {
    // console.log("tmume");
    // setStepsEnabled(true);
  };
  const fetchCart = async (token) => {
    await Fetch({ url: "sub/cart", token: token, method: "post" })
      .then((res) => res.json())
      .then((res) => {
        setCart([]);
        if (res.isDone) {
          res.data.forEach((pro) => {
            setCart((cart) => [...cart, pro.product_id]);
            setPrice(
              (price) =>
                price + products.find((item) => item.id == pro.product_id).price
            );
          });
        } else if (!res.isDone && res.message == "wrong credentials") {
          setToken(false);
          router.push("/");
        }
        console.log(res.data);
      });
  };
  const fetchUserProducts = async (token) => {
    await Fetch({ url: "sub/userProducts", token: token, method: "post" })
      .then((res) => res.json())
      .then((res) => {
        if (res.isDone) {
          res.data.forEach((pro) => {
            setUserProducts((userProducts) => [
              ...userProducts,
              { id: pro.product_id, expired: pro.expired, remain: pro.remain },
            ]);
          });
        } else if (!res.isDone && res.message == "wrong credentials") {
          setToken(false);
          router.push("/");
        }
        console.log(userProducts);
      });
  };
  const addToCart = (product) => {
    setCart((cart) => [...cart, product.id.toString()]);
    const pids = JSON.stringify([product.id]);
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
          setPrice(price + product.price);
        }
      });
  };

  const deletePurchase = (product) => {
    setPrice(price - product.price);
    setCart((cart) => cart.filter((item) => item !== product.id));

    Fetch({
      url: `sub/purchase/delete/${product.id}`,
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
  // const [currentStep, setCurrentStep] = useState(0);

  // const [stepsEnabled, setStepsEnabled] = useState(false);
  // useEffect(() => {
  //   if (currentStep == 9) setStepsEnabled(false);
  //   else setStepsEnabled(true);

  //   console.log("use effect called");
  // }, [currentStep]);
  // const steps = [
  //   {
  //     element: ".step1",
  //     intro: "از اینجا میتونی دوره های مورد نظر خودت رو ببینی ",
  //     // position: "left",
  //     // tooltipClass: "myTooltipClass",
  //     // highlightClass: "myHighlightClass",
  //   },
  //   {
  //     element: ".step2",
  //     intro: "با زدن این دکمه میتونی دوره رو به سبد خرید خودت اضافه کنی",
  //   },
  //   {
  //     element: ".step3",
  //     intro: "حالا از این قسمت میتونی برای  تسویه حساب و دریافت دوره اقدام کنی",
  //     position: "top",
  //   },
  // ];
  const renew = (id) => {
    Fetch({ url: `sub/userProducts/renew/${id}`, token: token }).then((res) => {
      // if (res.isDone) {
      setCart((cart) => [...cart, id]);
      toast.success("مجددا به سبد خرید اضافه شد");
      // }
    });
  };
  const courseUi = (id) => {
    switch (id) {
      case "1":
        return <>{brain}</>;
      case "2":
        return <>{uni}</>;

      default:
        break;
    }
  };

  const pay = () => {
    Fetch({
      url: `sub/pay`,
      token: token,
      method: "post",
      body: { price: price },
    })
      .then((res) => res.json())
      .then((res) => {
        router.push(res.data.url);
      });
  };

  return (
    <div>
      {/* <Steps
        enabled={stepsEnabled}
        steps={steps}
        initialStep={currentStep}
        onExit={onExit}
        // ref={(steps) => introStep}
        options={{ doneLabel: "پایان", nextLabel: "بعدی", prevLabel: "قبلی" }}
        // onBeforeChange={onBeforeChange}
      /> */}
      <div>
        {products.map((uiProduct, index) => (
          <div key={index}>
            <div
              className="flex items-center justify-start  gap-2"
              ref={(element) => {
                refs.current[uiProduct.id] = element;
              }}
            >
              <Switch
                checked={checkeds.includes(uiProduct.id)}
                onChange={(e) => handleChange(uiProduct.id)}
                className="step1"
              />
              <div className="">
                <div className="px-2  rounded py-1 ">
                  <p className="bg-green-200">{uiProduct.name}</p>
                  <hr />
                  {userProducts.find((item) => item.id === uiProduct.id)
                    ?.remain !== undefined ? (
                    <div className=" bg-green-800 text-white px-2 text-[10px]">
                      {userProducts.find((item) => item.id === uiProduct.id)
                        .remain + "روز تا پایان اشتراک"}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div></div>
            </div>
            {/* {JSON.stringify(userProducts)} */}
            <div
              className={`${
                checkeds.includes(uiProduct.id) ? "block" : "hidden"
              }  my-4 shadow-lg rounded-lg py-4`}
            >
              {userProducts.find((item) => item.id === uiProduct.id) ? (
                userProducts.find((item) => item.id === uiProduct.id)
                  .expired ? (
                  <div>
                    {!cart.includes(uiProduct.id) ? (
                      <div className="flex items-center flex-col">
                        <div>اشتراک شما در این دوره به پایان رسیده است</div>
                        <button
                          onClick={() => renew(uiProduct.id)}
                          className="px-2 text-center rounded bg-cyan-300 step2"
                        >
                          تمدید اشتراک
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <p>
                          فاکتور تمدید این دوره به سبد خرید شما اضافه گردید لطفا
                          آن را پرداخت کنید
                        </p>
                        <div className="flex">
                          {" "}
                          <button
                            onClick={pay}
                            className="text-center rounded bg-cyan-300 flex items-center justify-center"
                          >
                            <> پرداخت و مشاهده</>
                          </button>
                          <IconButton
                            aria-label="delete"
                            size="small"
                            onClick={() => deletePurchase(uiProduct)}
                          >
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // courseUi(uiProduct.id)
                  <div className="flex items-center justify-center">
                    <Link
                      href={`/dash/course/${uiProduct.id}`}
                      className="text-center bg-green-200 rounded-lg px-2 py-1"
                    >
                      مشاهده دوره
                    </Link>
                  </div>
                )
              ) : (
                <>
                  {cart.includes(uiProduct.id) ? (
                    <div className="flex flex-col items-center justify-center text-center gap-3  px-2">
                      <FcOk size={50} />
                      <p className="bg-yellow-300 rounded-lg px-2 ">
                        این دوره در سبد خرید شما موجود است اما هنوز نخریده اید
                      </p>
                      <div className="flex">
                        {" "}
                        <button
                          onClick={pay}
                          className="px-2 mx-2 text-center rounded bg-cyan-300 flex items-center"
                        >
                          پرداخت و مشاهده
                        </button>
                        <IconButton
                          aria-label="delete"
                          size="small"
                          onClick={() => deletePurchase(uiProduct)}
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center gap-2 px-2">
                      <FcLock size={50} />
                      <p className="text-justify">
                        در این قسمت توضیحات قرار خواهید گرفت
                      </p>
                      <p className="bg-yellow-300 rounded-lg px-2">
                        برای سفارش این دوره ابتدا آن را به سبد خرید اضافه کنید
                      </p>
                      <button
                        className="px-2 text-center rounded bg-cyan-300 max-auto step2"
                        onClick={() => addToCart(uiProduct)}
                      >
                        افزودن به سبد خرید
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className=" sticky bottom-0 right-0 left-0 step3   ">
        {cart.length > 0 && (
          <div
            className="flex items-center justify-between px-2 border-t-2 border-yellow-300 mt-4 bg-green-100 sticky  bottom-0 right-0 left-0 lg:w-96 w-full mx-auto pb-10 "
            dir="rtl"
          >
            <div className="flex flex-col  ">
              <p> سبد خرید : </p>
              {cart.length > 0 ? (
                <>
                  {toPersianNumber(cart.length)} دوره به مبلغ{" "}
                  {toPersianNumber(price)} ت
                </>
              ) : (
                "۰ دوره"
              )}
            </div>
            {cart.length > 0 && (
              <button
                onClick={pay}
                className="px-2 mx-2 text-center rounded bg-cyan-300 max-auto "
              >
                پرداخت
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dash;
