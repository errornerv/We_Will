import { useForm } from "react-hook-form";
import DefaultFooter from "./DefaultFooter";
import { useEffect } from "react";
import useAuthService from "../../hooks/zustand/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SecondPageForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const {
    getSignupOneTimePassword,
    postSignup,
    loading,
    error,
    getVerifySignupOneTimePassword,
  } = useAuthService();

  const navigate = useNavigate();

  useEffect(() => {
    const formData = JSON.parse(localStorage.getItem("signupForm1Data"));
    if (formData && formData.username && formData.password) {
      setValue("username", formData.username);
      setValue("password", formData.password);
      setValue("repeatPassword", formData.repeatPassword);
    } else {
      toast.info("ابتدا اطلاعات صفحه قبل را وارد کنید");
      navigate("/signup/1");
    }
  }, [setValue]);

  const handleRequestOTP = async () => {
    const user_phone = getValues("user_phone");
    if (user_phone) {
      const response = await getSignupOneTimePassword(user_phone);
      toast.info(response);
    } else {
      toast.info("ابتدا شماره موبایل خود را وارد کنید");
    }
  };

  ////////////////////////////////////

  const handleVerifyOTP = async () => {
    const onetimeauthcode = getValues("onetimeauthcode");
    if (!onetimeauthcode) {
      toast.error("رمز یکبار مصرف الزامی است");
      return;
    }

    const formData = new FormData();
    formData.append("otp", onetimeauthcode);

    try {
      const response = await getVerifySignupOneTimePassword(formData);
      console.log(response);

      if (response) {
        toast.success("رمز یکبار مصرف با موفقیت تأیید شد");
        return response; // Return the response for further processing if needed
      } else {
        toast.error("خطا در تأیید رمز یکبار مصرف");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("خطا در تأیید رمز یکبار مصرف");
    }
  };

  ////////////////////////////////////

  const onSubmit = async (data) => {
    if (!data.onetimeauthcode) {
      toast.error("رمز یکبار مصرف الزامی است");
      return;
    }

    const formData = new FormData();
    formData.append("new-username", data.username);
    formData.append("email", data.email);
    formData.append("phone", data.user_phone);
    formData.append("new-password", data.password);

    try {
      const response = await postSignup(formData);

      if (response.status === "success") {
        const userCredentials = {
          username: data.username,
          password: data.password,
        };
        localStorage.setItem(
          "userCredentials",
          JSON.stringify(userCredentials)
        );

        localStorage.removeItem("signupForm1Data");

        toast.success("ثبت نام با موفقیت انجام شد");

        navigate("/login/username");
      } else {
        toast.error("خطا در ثبت نام");
        navigate("/signup/1");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("خطا در ثبت نام");
      navigate("/signup/1");
    }
  };

  return (
    <div className="px-5 flex flex-col mt-4">
      <form
        onSubmit={handleSubmit(handleVerifyOTP)}
        className="flex flex-col gap-y-1"
      >
        <label htmlFor="email" className="font-semibold">
          ایمیل*
        </label>
        <input
          type="text"
          {...register("email", { required: "ایمیل الزامی است" })}
          placeholder="ایمیل خود را وارد کنید..."
          id="signupemail"
          className="border border-inputborders rounded-lg p-1.5 mt-2 mb-3 outline-none"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}

        <label htmlFor="user_phone" className="font-semibold">
          شماره موبایل*
        </label>
        <input
          type="number"
          {...register("user_phone", { required: "شماره موبایل الزامی است" })}
          placeholder="شماره موبایل خود را وارد کنید..."
          id="signupmobile"
          className="border border-inputborders rounded-lg p-1.5 mt-2 mb-3 outline-none"
        />
        {errors.user_phone && (
          <span className="text-red-500">{errors.user_phone.message}</span>
        )}

        <label htmlFor="onetimeauthcode" className="font-semibold">
          رمز یکبار مصرف*
        </label>
        <span className="flex gap-x-1">
          <input
            type="number"
            {...register("onetimeauthcode", {
              required: "رمز یکبار مصرف الزامی است",
            })}
            placeholder="1234"
            id="signuponetimeauthcode"
            className="border border-inputborders rounded-lg p-1.5 mt-2 mb-3 outline-none w-36"
          />
          <button
            type="button"
            className="btn btn-sm m-auto text-btns w-1/3"
            onClick={handleRequestOTP}
            disabled={loading}
          >
            {loading ? "در حال ارسال..." : "درخواست"}
          </button>
        </span>
        {errors.onetimeauthcode && (
          <span className="text-red-500">{errors.onetimeauthcode.message}</span>
        )}

        <button
          type="submit"
          className="btn btn-sm outline-none w-auto rounded-xl bg-base-100 border-none text-btns"
        >
          ثبت نام
        </button>
      </form>
      <DefaultFooter />
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default SecondPageForm;
