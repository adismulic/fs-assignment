import type { ProductsCreateProps } from "../types";
import { API_ENDPOINTS } from "../constants";

export function ProductsCreate({ productTypes, colors }: ProductsCreateProps) {
  console.log("ProductsCreate Props:", { productTypes, colors });
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <div className="max-w-[900px] w-full space-y-6 px-4">
          <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
            <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
              Create New Product
            </p>
            <form
              className="space-y-6"
              onSubmit={async (e: any) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement | null;
                submitBtn && (submitBtn.disabled = true);

                try {
                  const fd = new FormData(form);
                  const payload = {
                    name: (fd.get("name") || "").toString().trim(),
                    productTypeId: fd.get("productTypeId"),
                    colourIds: fd.getAll("colourIds"),
                  };

                  console.log("Creating product with payload:", payload);

                  if (!payload.name || !payload.productTypeId) {
                    alert("Please fill all required fields.");
                    return;
                  }

                  const res = await fetch(API_ENDPOINTS.PRODUCTS, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                  });

                  if (!res.ok) {
                    const text = await res.text().catch(() => "");
                    alert("Failed to create product" + (text ? `: ${text}` : ""));
                    return;
                  }

                  alert("Product created successfully.");
                  form.reset();
                } catch (err: any) {
                  alert("Error: " + (err?.message || "Unknown error"));
                } finally {
                  submitBtn && (submitBtn.disabled = false);
                }
              }}
            >
              <div className="space-y-2">
                <label className="block text-sm font-medium">Name<span className="text-red-500">*</span></label>
                <input
                  name="name"
                  required
                  placeholder="Product name"
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Product Type<span className="text-red-500">*</span></label>
                <select
                  name="productTypeId"
                  required
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a type
                  </option>
                  {productTypes?.map((pt: any) => (
                    <option
                      key={pt.id}
                      value={pt.id}
                      style={{ color: '#000' }}
                    >
                      {pt.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <span className="block text-sm font-medium">Colors<span className="text-red-500">*</span></span>
                <div className="flex flex-wrap gap-3">
                  <select
                    name="colourIds"
                    required
                    multiple
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                    size={Math.min((colors?.length || 0), 8) || 4}
                  >
                    {colors?.map((c: any) => (
                      <option
                        key={c.id}
                        value={c.id}
                        style={c.hex ? { backgroundColor: c.hex, color: '#000' } : undefined}
                      >
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium px-4 py-2 transition"
                >
                  Create Product
                </button>
              </div>
            </form>
          </nav>
        </div>
      </div>
    </main>
  );
}
