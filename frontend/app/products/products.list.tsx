import type { ProductsListProps } from "../types";

export function ProductsList({ products }: ProductsListProps) {
  console.log("ProductsList props:", products);
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <div className="max-w-[900px] w-full space-y-6 px-4">
          <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
            <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
              Product List
            </p>
            <table className="min-w-full text-sm text-left">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th scope="col" className="px-4 py-2 font-medium text-gray-600 dark:text-gray-300">ID</th>
                        <th scope="col" className="px-4 py-2 font-medium text-gray-600 dark:text-gray-300">Name</th>
                        <th scope="col" className="px-4 py-2 font-medium text-gray-600 dark:text-gray-300">Product Type</th>
                        <th scope="col" className="px-4 py-2 font-medium text-gray-600 dark:text-gray-300">Colours</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {products?.map(product => (
                      <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/60">
                        <td className="px-4 py-2 text-gray-800 dark:text-gray-100">{product.id}</td>
                        <td className="px-4 py-2 text-gray-800 dark:text-gray-100">{product.name}</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                          {product.ProductType?.name ?? '-'}
                        </td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                          {product.Colours?.map(c => c.name).join(", ")}
                        </td>
                      </tr>
                    ))}
                </tbody>
            </table>
          </nav>
        </div>
      </div>
    </main>
  );
}
