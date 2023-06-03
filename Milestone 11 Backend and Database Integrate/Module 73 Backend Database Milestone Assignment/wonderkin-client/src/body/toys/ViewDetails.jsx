import { useEffect } from "react";
import {
  Navigate,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import dynamicTitle from "../../hooks/dynamicTitle";

export default function ViewDetails() {
  const navigate = useNavigate();
  const data = useLoaderData();

  return (
    <div className="h-full p-4 sm:p-8">
      <input
        type="checkbox"
        id="my-modal-3"
        className="modal-toggle"
        defaultChecked
      />
      <div className="modal">
        <div className="modal-box relative w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <label
            onClick={() => navigate("/all-toys")}
            className="btn btn-sm btn-circle absolute right-2 top-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            ✕
          </label>
          <img
            src={data[0].image}
            className="h-auto w-full rounded-t-lg"
            alt="Toy Image"
          />

          <div className="p-4">
            <table className="w-full table-auto">
              <tbody>
                <tr>
                  <td className="font-bold pr-2 border-b">Toy Name:</td>
                  <td className="border-b">{data[0].name}</td>
                </tr>
                <tr>
                  <td className="font-bold pr-2 border-b">Seller Name:</td>
                  <td className="border-b">{data[0]?.sellerName}</td>
                </tr>
                <tr>
                  <td className="font-bold pr-2 border-b">Seller Email:</td>
                  <td className="border-b">{data[0]?.sellerEmail}</td>
                </tr>
                <tr>
                  <td className="font-bold pr-2 border-b">Price:</td>
                  <td className="border-b">{data[0].price}</td>
                </tr>
                <tr>
                  <td className="font-bold pr-2 border-b">Rating:</td>
                  <td className="border-b">{data[0].rating}</td>
                </tr>
                <tr>
                  <td className="font-bold pr-2 border-b">
                    Available Quantity:
                  </td>
                  <td className="border-b">{data[0].quantity}</td>
                </tr>
                <tr>
                  <td className="font-bold pr-2">Description:</td>
                  <td>{data[0]?.description}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
