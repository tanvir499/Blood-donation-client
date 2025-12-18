import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";

const AddProduct = () => {
    const [showOnHome, setShowOnHome] = useState(false);

    const handleAddProduct = (e) =>{
        e.preventDefault();
        const form = e.target;
        const productName = form.productName.value
        const description = form.description.value
        const category = form.category.value
        const price = form.price.value
        const quantity = form.quantity.value
        const moq = form.moq.value
        const productImage = form.productImage.value
        const paymentOption = form.paymentOption.value

        const formData = {
            productName,
            description,
            category,
            price,
            quantity,
            moq,
            productImage,
            paymentOption,
            showOnHome
                        
        }
        console.log(formData);
        
    }
  return (
    <div className="min-h-screen flex items-center justify-center  p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent mb-8">
          Add New Product
        </h2>

        <form onSubmit={handleAddProduct} className="space-y-5">
          {/* Product Name */}
          <div>
            <label className="font-medium">Product Name / Title</label>
            <input
              name="productName"
              type="text"
              placeholder="Enter product name"
              className="w-full mt-1 p-3 rounded-lg border focus:ring-2 focus:ring-indigo-300 outline-none"
              required
            />
          </div>

          {/* Product Description */}
          <div>
            <label className="font-medium">Product Description</label>
            <textarea
              rows="2"
              name="description"
              placeholder="Write product details..."
              className="w-full mt-1 p-3 rounded-lg border focus:ring-2 focus:ring-indigo-300 outline-none resize-none"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="font-medium">Category</label>
            <select name="category" className="w-full mt-1 p-3 rounded-lg border focus:ring-2 focus:ring-indigo-300 outline-none">
              <option value="">Select Category</option>
              <option value="shirt">Shirt</option>
              <option value="pant">Pant</option>
              <option value="jacket">Jacket</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>

          {/* Price & Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="font-medium">Price</label>
              <input
                name="price"
                type="number"
                placeholder="৳ Price"
                className="w-full mt-1 p-3 rounded-lg border focus:ring-2 focus:ring-indigo-300 outline-none"
                required
              />
            </div>

            <div>
              <label className="font-medium">Available Quantity</label>
              <input
                name="quantity"
                type="number"
                placeholder="Quantity"
                className="w-full mt-1 p-3 rounded-lg border focus:ring-2 focus:ring-indigo-300 outline-none"
                required
              />
            </div>

            <div>
              <label className="font-medium">MOQ</label>
              <input
                name="moq"
                type="number"
                placeholder="Minimum Order"
                className="w-full mt-1 p-3 rounded-lg border focus:ring-2 focus:ring-indigo-300 outline-none"
                required
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="font-medium">Upload Images</label>
            <div className="mt-1 flex items-center justify-center w-full border-1 border-dashed rounded-lg p-2 cursor-pointer hover:border-indigo-400 transition">
              <label className="flex flex-col items-center gap-2 cursor-pointer">
                <FiUpload className="text-2xl text-indigo-500" />
                <span className="text-gray-600 text-sm">
                  Upload multiple images
                </span>
                <input name="productImage" type="file" multiple className="hidden" />
              </label>
            </div>
          </div>

          {/* Payment Options */}
          <div>
            <label className="font-medium">Payment Option</label>
            <select name="paymentOption" className="w-full mt-1 p-3 rounded-lg border focus:ring-2 focus:ring-indigo-300 outline-none">
              <option value="">Select Payment Method</option>
              <option value="payFirst">PayFirst</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>

          {/*show on Home*/}
          <div className="flex items-center gap-3">
             <input type="checkbox" 
              checked={showOnHome} 
              onChange={() => setShowOnHome(!showOnHome)}
              className="h-5 w-5"
              />
              <label className="font-semibold">Show on Home page(default false)</label>
          </div>

         

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 font-semibold text-white rounded-lg bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 hover:opacity-90 transition shadow-md"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
