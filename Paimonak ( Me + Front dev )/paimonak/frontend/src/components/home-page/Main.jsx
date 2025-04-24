import ProductsCard from "./ProductsCard";

export default function Main() {
  return (
    <div className="hidden max-640:block">
      <div className="flex flex-col">
        <img src="src/assets/paimonak.png" alt="Paimonak" className="mb-5" />
        <div className="mb-10">
          <div className=" mt-10 mr-5">
            <img
              src="src/assets/PaimonakText1.png"
              alt="Paimonak"
              className="w-64 m-auto"
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="card text-center">
            <h2 className="text-2xl font-bold">ساخت پروفایل</h2>
            <p className="text-base text-center mx-2 mt-5 mb-10">
              می‌تونی پروفایل مخصوص خودتو داشته باشی، باهاش مشخصات کاراکتراتو
              ببینی و به بقیه نشون بدی!
            </p>
          </div>
          <div className=" m-auto">
            <img src="src/assets/image2.png" alt="Paimonak" className="w-80" />
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="card text-center">
            <h2 className="text-2xl font-bold mt-10">شبیه ساز ویش</h2>
            <p className="text-base text-center mx-2 mt-5 mb-5">
              یه مینی گیم باحال، که می‌تونی ویش بزنی و کاراکتر بگیری!
            </p>
          </div>
          <div className=" m-auto">
            <img src="src/assets/image3.png" alt="Paimonak" className="w-80" />
          </div>
        </div>

        <div className="mt-10 mb-10">
          <div className=" mt-10 mr-5">
            <img
              src="src/assets/PaimonakText2.png"
              alt="Paimonak"
              className="w-80 m-auto"
            />
          </div>
          <ProductsCard />
        </div>
      </div>
    </div>
  );
}
