import { useForm } from "react-hook-form";
import DefaultFooter from "./DefaultFooter";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FirstPageForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    toast.success("اطلاعات با موفقیت ثبت شد");
    localStorage.setItem("signupForm1Data", JSON.stringify(data));
    navigate("/signup/2");
  };

  return (
    <div className="px-5 py-2 flex flex-col mt-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-1">
        <label htmlFor="username" className="font-semibold">
          نام کاربری*
        </label>
        <input
          type="text"
          {...register("username", { required: "نام کاربری الزامی است" })}
          placeholder="نام کاربری خود را وارد کنید ..."
          id="signupusername"
          className="border border-inputborders rounded-lg p-1.5 mt-2 mb-3 outline-none"
        />
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}

        <label htmlFor="password" className="font-semibold">
          رمز عبور*
        </label>
        <input
          type="password"
          {...register("password", { required: "رمز عبور الزامی است" })}
          placeholder="رمز عبور خود را وارد کنید..."
          id="signuppassword"
          className="border border-inputborders rounded-lg p-1.5 mt-2 mb-3 outline-none"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}

        <label htmlFor="repeatpassword" className="font-semibold">
          تکرار رمز عبور*
        </label>
        <input
          type="password"
          {...register("repeatPassword", {
            required: "تکرار رمز عبور الزامی است",
            validate: (value) =>
              value === watch("password") || "رمز عبور مطابقت ندارد",
          })}
          placeholder="رمز عبور خود را دوباره وارد کنید..."
          id="signuprepeatpassword"
          className="border border-inputborders rounded-lg p-1.5 mt-2 mb-3 outline-none"
        />
        {errors.repeatPassword && (
          <span className="text-red-500">{errors.repeatPassword.message}</span>
        )}

        <button
          type="submit"
          className="btn btn-sm outline-none w-auto rounded-xl bg-base-100 border-none text-btns"
        >
          ثبت نام
        </button>
      </form>
      <DefaultFooter />
    </div>
  );
};

export default FirstPageForm;
