import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuthService from "../../hooks/zustand/useAuth";
import { toast } from "react-toastify";

export default function LoginPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const { getLoginOneTimePassword, getVerifyLoginOneTimePassword } =
    useAuthService();
  const navigate = useNavigate();

  const handleRequestOTP = async () => {
    const email = getValues("email");
    if (!email) {
      toast.info("ایمیل الزامی است");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email);

      const response = await getLoginOneTimePassword(formData);
      if (response?.flag === true) {
        toast.success("درخواست رمز یکبار مصرف با موفقیت ارسال شد");
      } else {
        toast.error("درخواست رمز یکبار مصرف ناموفق بود");
      }
    } catch (error) {
      console.log("Error during OTP request", error);
      toast.error("خطا در ارسال درخواست رمز یکبار مصرف");
    }
  };

  const onSubmit = async () => {
    const email = getValues("email");
    const otp = getValues("onetimeauthcode");

    if (!email || !otp) {
      toast.info("ایمیل و رمز یکبار مصرف الزامی است");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("otp", otp);

      const response = await getVerifyLoginOneTimePassword(formData);
      if (response?.flag === true) {
        toast.success("ورود موفقیت آمیز بود");
        navigate("/");
      } else {
        toast.error("ورود ناموفق بود");
      }
    } catch (error) {
      console.log("Error during login request", error);
      toast.error("خطا در ورود");
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

        <h2 className="text-center font-bold text-lg -mt-4">
          ورود با رمز یکبار مصرف
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-5 flex flex-col mt-4"
        >
          <label htmlFor="email" className="font-semibold">
            ایمیل*
          </label>
          <input
            type="email"
            placeholder="ایمیل خود را وارد کنید..."
            {...register("email", { required: "ایمیل الزامی است" })}
            className="border border-inputborders rounded-lg p-1.5 mt-2 mb-3 outline-none"
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}

          <label htmlFor="onetimeauthcode" className="font-semibold">
            رمز یکبار مصرف*
          </label>
          <span className="flex flex-row">
            <input
              type="number"
              id="signuponetimeauthcode"
              placeholder="1234"
              {...register("onetimeauthcode", {
                required: "رمز یکبار مصرف الزامی است",
              })}
              className="border border-inputborders rounded-lg p-1.5 mt-2 mb-3 outline-none w-36"
            />
            <button
              type="button"
              className="btn btn-sm m-auto w-1/3 text-btns"
              onClick={handleRequestOTP}
            >
              درخواست
            </button>
          </span>
          {errors.onetimeauthcode && (
            <span className="text-red-500 text-xs">
              {errors.onetimeauthcode.message}
            </span>
          )}

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
              to={"/login/username"}
              className="text-btns font-medium text-center text-sm"
            >
              ورود با رمز نام کاربری
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
