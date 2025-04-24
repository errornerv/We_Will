export default function PasswordRecoveryPage() {
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
          بازیابی رمز عبور
        </h2>

        <div className="px-5 flex flex-col mt-4">
          <label htmlFor="" className="font-semibold">
            شماره موبایل/ایمیل*
          </label>
          <input
            type="text"
            name=""
            placeholder="شماره موبایل یا ایمیل خود را وارد کنید..."
            id=""
            className="border border-inputborders rounded-lg p-1.5 mt-2 mb-3 outline-none placeholder:text-sm"
          />
          <label htmlFor="onetimeauthcode" className="font-semibold">
            رمز یکبار مصرف*
          </label>
          <span className="flex flex-row">
            <input
              type="number"
              name="onetimeauthcode"
              placeholder="1234"
              id="signuponetimeauthcode"
              className="border border-inputborders rounded-lg p-1.5 mt-2 mb-3 outline-none w-36"
            />
            <button className="btn btn-sm m-auto w-fit text-btns">
              درخواست
            </button>
          </span>

          <button className="btn btn-sm outline-none w-auto rounded-xl bg-base-100 border-none text-btns mb-10">
            ادامه
          </button>
        </div>
      </div>
    </div>
  );
}
