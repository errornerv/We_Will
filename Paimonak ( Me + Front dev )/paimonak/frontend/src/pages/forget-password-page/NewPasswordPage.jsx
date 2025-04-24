export default function NewPasswordPage() {
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

        <h2 className="text-center font-bold text-base -mt-4">
          {" "}
          رمز عبور جدید
        </h2>

        <div className="px-5 flex flex-col mt-4">
          <label htmlFor="password" className="font-semibold">
            رمز عبور*
          </label>
          <input
            type="password"
            name="passsword"
            placeholder="رمز عبور خود را وارد کنید..."
            id="signuppassword"
            className="border border-inputborders rounded-lg p-1.5 mt-2 mb-3 outline-none"
          />
          <label htmlFor="repeatpassword" className="font-semibold">
            تکرار رمز عبور*
          </label>
          <input
            type="password"
            name="repeatpasssword"
            placeholder="رمز عبور خود را دوباره وارد کنید..."
            id="signuprepeatpassword"
            className="border border-inputborders rounded-lg p-1.5 mt-2 mb-3 outline-none"
          />

          <button className="btn btn-sm outline-none w-auto rounded-xl bg-base-100 border-none text-btns mb-10">
            تایید
          </button>
        </div>
      </div>
    </div>
  );
}
