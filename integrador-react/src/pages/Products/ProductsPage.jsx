import {ProductSection} from "../../components/Products/ProductSection";

export default function ProductsPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full mt-50 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Products Page</h1>
        <p className="text-lg text-gray-700">Welcome to the Products Page!</p>
      </div>

      <ProductSection />
    </>
  );
}
