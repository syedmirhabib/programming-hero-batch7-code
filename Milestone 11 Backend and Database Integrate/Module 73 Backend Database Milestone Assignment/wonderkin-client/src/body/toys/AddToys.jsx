import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { authContext } from "../../authentication/AuthProviders";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamicTitle from "../../hooks/dynamicTitle";

export default function AddToys() {
  dynamicTitle("Add Toys");

  const { loading, user } = useContext(authContext);

  const [selectedOption, setSelectedOption] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.category = selectedOption?.value;
    data.sellerName = user?.displayName;
    data.sellerEmail = user?.email;
    fetch("https://cute-gold-lemming-sari.cyclic.app/addtoys", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .then((data) => {
        toast.success("A Toy is Successfully added.");
        reset();
      });
  };

  const options = [
    { value: "Sports Car", label: "Pet Doll" },
    { value: "Supercar", label: "Sea Doll" },
    { value: "Truck", label: "Forest Doll" },
  ];

  return (
    <div className="h-full p-4 sm:p-8">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <h1 className="text-center text-3xl font-bold mt-2 underline decoration-4 underline-offset-[10px]">
        Add Toys
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              disabled
              defaultValue={user?.displayName}
              placeholder="Seller Name"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <input
              disabled
              defaultValue={user?.email}
              placeholder="Seller Email"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <input
              {...register("name", { required: true, maxLength: 20 })}
              placeholder="Toy Name"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <input
              {...register("image", { required: true })}
              type="text"
              placeholder="Photo Url"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <input
              type="number"
              {...register("price", { required: true, maxLength: 20 })}
              placeholder="Price"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <CreatableSelect
              defaultValue={selectedOption}
              placeholder="Category"
              onChange={(data) => setSelectedOption(data)}
              className="max-w-xs"
              options={options}
            />
          </div>
          <div>
            <input
              type="number"
              {...register("rating", { min: 1, max: 5 })}
              placeholder="Rating (1 - 5) only"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <input
              type="number"
              {...register("quantity", { required: true })}
              placeholder="Available quantity"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <textarea
          {...register("description")}
          placeholder="Detail description"
          className="textarea textarea-bordered block w-full h-[16vh] my-4"
        ></textarea>
        <button className="btn block w-full bg-[#406147] hover:bg-[#07500a] border-none">
          Add Toy
        </button>
      </form>
    </div>
  );
}
