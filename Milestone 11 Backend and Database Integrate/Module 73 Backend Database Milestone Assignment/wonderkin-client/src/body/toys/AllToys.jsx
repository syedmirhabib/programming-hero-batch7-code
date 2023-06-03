import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import dynamicTitle from "../../hooks/dynamicTitle";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function AllToys() {
  const [toys, setToys] = useState([]);
  dynamicTitle("All Toys");

  const loadMore = () => {
    fetch("https://cute-gold-lemming-sari.cyclic.app/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ value: "10" }),
    })
      .then((data) => data.json())
      .then((data) => setToys(data));
  };

  const findInTable = () => {
    const input = document.getElementById("myInput");
    const filter = input.value.toUpperCase();
    const table = document.getElementById("myTable");
    const tr = table.getElementsByTagName("tr");
    for (let i = 0; i < tr.length; i++) {
      const td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        const txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  };

  useEffect(() => {
    fetch("https://cute-gold-lemming-sari.cyclic.app/")
      .then((data) => data.json())
      .then((data) => setToys(data));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="overflow-x-auto flex-grow">
        <Outlet />

        {toys.length > 0 ? (
          <table className="w-full table-auto border border-gray-300" id="myTable">
            <thead>
              <tr className="border-b">
                <th className="bg-[#f6ffe5]"></th>
                <th className="bg-[#f6ffe5]">
                  <h1 className="text-sm">Name</h1>
                  <input
                    type="text"
                    id="myInput"
                    onKeyUp={() => {
                      findInTable();
                    }}
                    placeholder="Search for names.."
                    title="Type in a name"
                    className="input input-bordered"
                  />
                </th>
                <th className="bg-[#f6ffe5]">Seller</th>
                <th className="bg-[#f6ffe5]">Category</th>
                <th className="bg-[#f6ffe5]">Price</th>
                <th className="bg-[#f6ffe5]">Quantity</th>
                <th className="bg-[#f6ffe5]">Details</th>
              </tr>
            </thead>
            <tbody>
              {toys.map((data) => (
                <tr key={data._id} className="hover:bg-gray-100">
                  <td></td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={data.image} alt="Avatar" />
                        </div>
                      </div>
                      <div>{data.name}</div>
                    </div>
                  </td>
                  <td>{data?.sellerName}</td>
                  <td>{data.category}</td>
                  <td>{data.price}</td>
                  <td>{data.quantity}</td>
                  <td className="text-center">
                    <Link
                      to={`/all-toys/${data._id}`}
                      className="btn bg-[#406147] hover:bg-[#07500a]"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center items-center h-full">
            <SkeletonTheme baseColor="#e9f8ff" highlightColor="white">
              <Skeleton count={5} height={60} />
            </SkeletonTheme>
          </div>
        )}
      </div>
    </div>
  );
}
