/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthService from "../../hooks/zustand/useAuth";
import { toast } from "react-toastify";

export default function LoginUsernamePage() {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });

  const { postLogin, loading, error } = useAuthService();

  const navigate = useNavigate();

  useEffect(() => {
    const storedCredentials = JSON.parse(
      localStorage.getItem("userCredentials")
    );
    if (storedCredentials) {
      setUserCredentials({
        username: storedCredentials.username || "",
        password: storedCredentials.password || "",
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", userCredentials.username);
    formData.append("password", userCredentials.password);

    try {
      const response = await postLogin(formData);

      console.log("Login response:", response);

      if (response?.flag === true) {
        toast.success("ورود موفقیت آمیز بود");
        localStorage.removeItem("userCredentials");
        navigate("/");
      } else {
        console.error("Login failed:", response?.flag === false);
        toast.error("ورود ناموفق بود");
      }
    } catch (error) {
      toast.error("خطا در ورود به حساب کاربری");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="hidden max-640:block">
      <img
        src="/src/assets/AuthImgTop.png"
        alt="paimonak"
        className="rounded-lg absolute w-28 top-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
      <div className="w-72 h-auto bg-white rounded-3xl m-auto mt-14 pt-20">
        <button className="btn btn-square btn-ghost -mt-20 float-right text-btns">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
        <button className="btn btn-square btn-ghost -mt-20 float-left text-btns">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-center font-bold text-xl -mt-4">
          ورود به حساب کاربری
        </h2>

        <form onSubmit={handleSubmit} className="px-5 flex flex-col mt-4">
          <label htmlFor="username" className="font-semibold">
            شماره موبایل/نام کاربری*
          </label>
          <input
            type="text"
            name="username"
            placeholder="نام کاربری خود را وارد کنید ..."
            value={userCredentials.username}
            onChange={(e) =>
              setUserCredentials({
                ...userCredentials,
                username: e.target.value,
              })
            }
            className="border border-inputborders rounded-lg p-1.5 mt-2 mb-3 outline-none"
          />

          <label htmlFor="password" className="font-semibold">
            رمز عبور*
          </label>
          <input
            type="password"
            name="password"
            placeholder="رمز عبور خود را وارد کنید..."
            value={userCredentials.password}
            onChange={(e) =>
              setUserCredentials({
                ...userCredentials,
                password: e.target.value,
              })
            }
            className="border border-inputborders rounded-lg p-1.5 mt-2 mb-3 outline-none"
          />

          <button
            type="submit"
            className="btn btn-sm outline-none w-auto rounded-xl bg-base-100 border-none text-btns"
          >
            ورود
          </button>
        </form>

        <div className="flex flex-col gap-y-6 py-3 pb-5 px-5">
          <div className="flex justify-center items-center">
            <Link
              to={"/login/password"}
              className="text-btns font-medium text-center text-sm"
            >
              ورود با رمز یکبار مصرف
            </Link>
          </div>

          <div className="flex flex-col gap-y-2">
            <div className="flex gap-x-1">
              <p>حساب کاربری ندارید؟</p>
              <Link to={"/signup/1"}>
                <p className="text-btns">ثبت نام کنید</p>
              </Link>
            </div>
            <div className="flex gap-x-1">
              <p>رمز عبور خود را فراموش کردید؟</p>
              <Link to={"/forgetpassword/passwordrecovery"}>
                <p className="text-btns">بازیابی رمز عبور</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
