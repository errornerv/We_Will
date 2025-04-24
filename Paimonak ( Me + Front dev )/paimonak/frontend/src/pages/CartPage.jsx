export default function CartPage() {
  return (
    <div className="hidden max-640:block">
      <img
        src="/src/assets/AuthImgTop.png"
        alt="paimonak"
        className="rounded-lg absolute w-28 top-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
      <div className="w-80 h-cart bg-white rounded-3xl m-auto mt-14 pt-20">
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

        <h2 className="text-center font-bold text-xl -mt-4"> سبد خرید</h2>

        <div className="px-3 flex flex-row mt-4">
          <p className="text-sm m-auto">Blessing of the welkin moon</p>
          <span className="flex m-auto">
            <button className="btn btn-xs p-1 btn-ghost bg-btns m-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
            <p className="px-2 text-lg font-semibold">1</p>
            <button className="btn btn-xs p-1 btn-ghost bg-transparent m-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
                />
              </svg>
            </button>
          </span>
        </div>
        <div className="px-6 flex mt-1">
        <p className="text-xs m-auto mr-0">آیدی(uid):123123123</p>
        <p className="text-xs m-auto mr-0">سرور:آمریکا</p>
        <p className="m-auto text-base font-semibold ml-0">1,200,000T</p>
        </div>
        <div className="divider w-5/6 m-auto"></div>
        <div className="px-3 flex flex-row mt-4">
          <p className="text-sm m-auto">Blessing of the welkin moon</p>
          <span className="flex m-auto">
            <button className="btn btn-xs p-1 btn-ghost bg-btns m-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
            <p className="px-2 text-lg font-semibold">1</p>
            <button className="btn btn-xs p-1 btn-ghost bg-transparent m-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
                />
              </svg>
            </button>
          </span>
        </div>
        <div className="px-6 flex mt-1">
        <p className="text-xs m-auto mr-0">آیدی(uid):123123123</p>
        <p className="text-xs m-auto mr-0">سرور:آمریکا</p>
        <p className="m-auto text-base font-semibold ml-0">1,200,000T</p>
        </div>
        <div className="divider w-5/6 m-auto"></div>
        <div className="px-3 flex flex-row mt-4">
          <p className="text-sm m-auto">Blessing of the welkin moon</p>
          <span className="flex m-auto">
            <button className="btn btn-xs p-1 btn-ghost bg-btns m-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
            <p className="px-2 text-lg font-semibold">1</p>
            <button className="btn btn-xs p-1 btn-ghost bg-transparent m-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
                />
              </svg>
            </button>
          </span>
        </div>
        <div className="px-6 flex mt-1">
        <p className="text-xs m-auto mr-0">آیدی(uid):123123123</p>
        <p className="text-xs m-auto mr-0">سرور:آمریکا</p>
        <p className="m-auto text-base font-semibold ml-0">1,200,000T</p>
        </div>
        <div className="divider w-5/6 m-auto"></div>
        <span className="flex">
        <h2 className="font-semibold mr-16 m-auto">جمع کل</h2>
        <h2 className="font-semibold ml-16">1,200,000T</h2>
        </span>
        <div className="flex mt-4">
        <button className="btn btn-wide outline-none  m-auto rounded-xl bg-base-100 border-none text-btns">
          پرداخت
        </button>
        </div>
      </div>
    </div>
  );
}
