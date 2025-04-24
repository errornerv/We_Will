import { useEffect } from "react";
import useProductService from "../../hooks/zustand/useProducts";
import Error from "./Error";
import Loading from "./Loading";

export default function ProductsCard() {
  const { productsList, loading, error, getProducts } = useProductService();
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div id="card-container" className="flex gap-7 overflow-x-auto px-7 m-auto">
      {Array.isArray(productsList.products) &&
        productsList.products.map((product) => (
          <div
            key={product.product_id}
            className="card border border-accent shadow-inner mb-4 mt-5 -mr-5 max-640:w-auto flex-shrink-0 bg-white rounded-3xl"
          >
            <figure className="px-2 pt-2 w-44 m-auto">
              <img src={product.image_url} alt={product.product_name} />
            </figure>
            <div className="card-body items-center text-center text-xl text-[#586070] p-0 py-7">
              <h2 className="card-title mb-1">{product.product_name}</h2>
              <p className="font-semibold text-base">
                قیمت: {product.price} تومان
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}
