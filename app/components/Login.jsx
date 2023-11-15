"use client";
import { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { InputBase } from "@mui/material";
import Fetch from "../Helpers/Fetch";
import { useTokenContext } from "../context/token";
import { toast } from "react-toastify";
import { redirect, useRouter } from "next/navigation";
export default function Home() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [step, setStep] = useState(1);

  const [submitLoading, setSubmitLoading] = useState(false);
  const [countDown, setCountDown] = useState(0);
  const [countDownLoading, setCountDownLoading] = useState(false);
  const { token, setToken } = useTokenContext();
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);
  const proRef = useRef([]);
  const products = [
    { id: 1, title: "پادکست فرماندهی مغز", price: 50000 },
    { id: 2, title: "کلاس حضوری دانشگاه تهران", price: 50000 },
    { id: 3, title: "لایو های آموزشی استاد ", price: 50000 },
  ];
  const router = useRouter();
  const fetchPhone = (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    Fetch({
      url: "sub/login",
      method: "post",
      body: { phone: mobileNumber },
    })
      .then((result) => result.json())
      .then((res) => {
        console.log(res.isDone);
        res.isDone
          ? (setStep(2), setSubmitLoading(false))
          : (toast.error("لحظاتی بعد مجددا اقدام نمایید"),
            setSubmitLoading(false));
      });
  };

  const fetchCode = (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    Fetch({
      url: "sub/twoFactor",
      method: "post",
      body: { phone: mobileNumber, code: verificationCode },
    })
      .then((result) => result.json())
      .then((res) => {
        if (res.isDone) {
          setToken(res.data.token);
          toast.success("ارتباط موفقیت آمیز");
          // router.push("/dash");
          setStep(3);
          setSubmitLoading(false);
        } else {
          toast.error("مشکلی رخ داده است");
          setSubmitLoading(false);
          console.log(res);
        }
      });
  };
  const fetchPayment = (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    const pids = JSON.stringify(cart);
    Fetch({
      url: `sub/purchase`,
      method: "post",
      body: { pids },
      token: token,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.isDone) {
          toast.success("ارتباط موفقیت آمیز");
          router.push("/dash");
        }
      });
  };
  const deacreaseCountDown = () =>
    setCountDown((current) => {
      if (current > 0) {
        return current - 1;
      }
    });
  useEffect(() => {
    let countDownInterval = setInterval(deacreaseCountDown, 1000);
    if (countDown < 1) {
      clearInterval(countDownInterval);
    }
    return () => clearInterval(countDownInterval);
  }, [countDown, countDownLoading]);
  const handleCart = (v) => {
    if (cart.includes(v.id)) {
      setCart(cart.filter((item) => item !== v.id));
      setPrice(price - v.price);
    } else {
      setCart([...cart, v.id]);
      setPrice(price + v.price);
    }
  };

  const [verificationCode, setVerificationCode] = useState("");
  const verificationCodeError = useRef("");
  const isVerificationCodeValid = (vc) => /^(\d{6})$/.test(vc);
  const verificationCodeValid = isVerificationCodeValid(verificationCode);
  const handleVerificationCodeOnChange = (e) => {
    const enteredVerificationCode = e.target.value;
    console.log(enteredVerificationCode);

    const properVerificationCode = enteredVerificationCode
      .replace(/\D/g, "")
      .slice(0, 6);
    if (properVerificationCode) {
      if (isVerificationCodeValid(properVerificationCode)) {
        verificationCodeError.current = "";
      } else {
        verificationCodeError.current = "میبایست 6 رقم باشد";
      }
    } else {
      verificationCodeError.current = "";
    }
    setVerificationCode(properVerificationCode);
  };

  const mobileNumberError = useRef("");
  const isMobileNumberValid = (mn) => /^(09\d{9})$/.test(mn);
  const mobileNumberValid = isMobileNumberValid(mobileNumber);
  const handleMobileNumberOnChange = (e) => {
    const enteredMobileNumber = e.target.value;
    const properMobileNumber = enteredMobileNumber
      .replace(/\D/g, "")
      .slice(0, 11);
    if (properMobileNumber) {
      if (isMobileNumberValid(properMobileNumber)) {
        mobileNumberError.current = "";
      } else {
        mobileNumberError.current =
          "شماره همراه میبایست با 09 آغاز شود و 11 رقم باشد";
      }
    } else {
      mobileNumberError.current = "";
    }
    setMobileNumber(properMobileNumber);
  };
  return (
    <form
      className="flex flex-col items-center justify-between p-24 text-black body"
      dir="rtl"
      onSubmit={(e) =>
        step == 1 ? fetchPhone(e) : step == 2 ? fetchCode(e) : fetchPayment(e)
      }
    >
      <img src="logo.png" height={1500} />

      <div className="font-bold leading-6 tracking-normal text-right">
        <p className="mb-4">آکادمی لذت خیاطی </p>
        <p className="">برای مشاهده این بخش احتیاج به دسترسی ویژه دارید</p>
        <p>با خرید دسترسی از امکانات زیر برخوردار خواهید شد</p>
        <p className="mt-5"> ✍️ دسترسی مادام العمر به : </p>

        <p className=""> ✍️ مشاهده تمام لایو های آموزشی استاد مقدم جو</p>
        <p className=""> ✍️ دسترسی به دوره فرماندهی مغز</p>
        <p className=""> ✍️ کارگاه آموزشی دانشگاه علمی کاربردی تهران</p>

        {step == 1 && (
          <>
            <p className="mt-4 mb-2 text-center">شماره تماس : </p>
            <div className="flex items-center justify-center">
              <InputBase
                type="text"
                dir="ltr"
                sx={{ letterSpacing: 10 }}
                className="px-2 border border-black border-dashed rounded w-60"
                onChange={handleMobileNumberOnChange}
                placeholder="09_________"
                value={mobileNumber}
                inputProps={{
                  maxLength: 11,
                  minLength: 11,
                  required: true,
                }}
              />
            </div>
          </>
        )}
        {step === 2 && (
          <p className="my-4 text-sm font-bold text-center">
            کد تایید ارسال شده برای شماره <span dir="ltr">{mobileNumber}</span>{" "}
            را وارد کنید
          </p>
        )}
        {step === 2 && (
          <div className="flex justify-center">
            {/* <Verification Code | Step 2> */}

            <input
              value={verificationCode}
              onChange={handleVerificationCodeOnChange}
              className={`text-center px-2 border border-black border-dashed rounded w-60 ${
                verificationCode ? "tracking-[7px]" : ""
              }`}
              dir="ltr"
              type="tel"
              autoComplete="off"
              placeholder="x x x x x x"
              required
            />
          </div>
        )}
        {step == 2 ? (
          countDown > 0 ? (
            <span>درخواست مجدد کد تا {countDown} ثانیه دیگر</span>
          ) : (
            <>{countDownLoading ? "فرصت به اتمام رسید" : ""}</>
          )
        ) : (
          ""
        )}
      </div>

      {step == 3 && (
        <div className="mt-4">
          <p>
            قصد خرید کدام یک از اشتراک ها را دارید ؟ (میتوانید یکی یا همه را
            انتخاب کنید )
          </p>
          <div className="flex flex-col items-start justify-start mt-4">
            {products.map((pro) => (
              <div
                key={pro.id}
                onClick={() => handleCart(pro)}
                className={`${
                  cart.includes(pro.id) ? "bg-green-400" : ""
                } px-4 my-1 border border-green-400 border-solid rounded cursor-pointer`}
              >
                <input
                  type="checkbox"
                  ref={proRef[pro.id]}
                  checked={cart.includes(pro.id)}
                />{" "}
                {pro.title}
              </div>
            ))}
          </div>
          <p className="text-center"> مبلغ قابل پرداخت : {price} تومان</p>
        </div>
      )}

      <button className="flex justify-center w-48 px-4 py-2 my-4 text-center bg-green-200 rounded ">
        {submitLoading ? (
          <svg
            aria-hidden="true"
            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        ) : step == 1 ? (
          "مرحله بعدی"
        ) : step == 2 ? (
          "ثبت کد تایید"
        ) : (
          "پرداخت و دریافت"
        )}
      </button>
    </form>
  );
}
