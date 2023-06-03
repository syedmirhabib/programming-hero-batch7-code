import { useContext, useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { authContext } from "../authentication/AuthProviders";
import Rating from "react-rating";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import "./app.css";
import dynamicTitle from "../hooks/dynamicTitle";
import { FaArrowCircleRight } from "react-icons/fa";
import { TfiArrowRight } from "react-icons/tfi";
import logo from "./../assets/icons/logo.png";


import Gallery from "./Gallery";


import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

function App() {
  const { user } = useContext(authContext);
  const [data, setdata] = useState([]);
  dynamicTitle("Home");

  const tabdata = (data) => {
    fetch(
      `https://cute-gold-lemming-sari.cyclic.app/category/?category=${data}`
    )
      .then((data) => data.json())
      .then((data) => setdata(data));
  };

  useEffect(() => {
    fetch(
      `https://cute-gold-lemming-sari.cyclic.app/category/?category=Sports Car`
    )
      .then((data) => data.json())
      .then((data) => setdata(data));
  }, []);

  const tabpaneldata = (
    <>
      <div className="grid grid-cols-3 gap-5 w-fit mx-auto my-10 max-[800px]:grid-cols-2 max-[650px]:grid-cols-1">
        {data.map((data) => (
          <div
            key={data._id}
            className="card lg:w-72 md:w-auto bg-base-100 shadow-[0_1px_4px_rgba(0,0,0,0.16)] 
        hover:shadow-[0_3px_8px_rgba(0,0,0,0.20)] transition duration-500 ease-in-out hover:scale-[105%] "
          >
            <figure>
              <img src={data.image} className="h-48 w-full" />
            </figure>
            <div className="card-body h-36">
              <h2 className="card-title">{data.name}</h2>
              <div className="text-left">
                <p>Price : {data.price}</p>
                <div className="flex mt-2">
                  <h1>Rating :</h1>
                  <span className="mt-1 pl-1">
                    <Rating
                      readonly
                      placeholderRating={data.rating}
                      emptySymbol={<AiOutlineStar />}
                      placeholderSymbol={
                        <AiTwotoneStar className="text-[#406147]" />
                      }
                      fullSymbol={<AiTwotoneStar />}
                    />
                  </span>
                  <span className="pl-2">({data.rating})</span>
                </div>
              </div>
            </div>
            <div className="p-2">
              <Link
                onClick={() => {
                  user
                    ? window.location.replace(`/all-toys/${data._id}`)
                    : setTimeout(
                        () => window.location.replace(`/all-toys/${data._id}`),
                        2000
                      );
                }}
              >
                <button
                  className="btn block w-full rounded-xl bg-[#406147] hover:bg-[#07500a] border-none"
                  onClick={() => {
                    user
                      ? ""
                      : toast.error(
                          "You have to log in first to view details."
                        );
                  }}
                >
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="overflow-hidden">
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

      {/* Hero Section start */}

      <section>
        <div className="hero min-h-fit bg-[#dce2cb] flex items-center justify-center px-4 relative">
          <div className="hero-content flex-col-reverse lg:flex-row items-center max-w-[90%] mx-auto">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 leading-tight">
                Discover the Magic of <br /> Animal Dolls
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mt-4">
                Immerse your children in a world of imagination with our
                enchanting collection
                <br /> of animal dolls.
              </p>
              <button className="btn bg-[#406147] hover:bg-[#07500a] text-white rounded-full mb-10 py-3 px-6 mt-6">
                Get Your Toys
              </button>
            </div>
            <img
              src="herodoll.png"
              className="max-w-[40%] lg:max-w-[30%] rounded-lg hover:scale-[105%] transition duration-500 ease-in-out mt-10 lg:mt-0"
            />
          </div>

          {/* Find us on start */}
          <div className="absolute left-4 bottom-4 flex items-center">
            <span className="text-green-900 mr-2">Find us on:</span>
            <a href="#" className="mr-2">
              <img src="facebook.png" alt="Facebook" className="w-6 h-6" />
            </a>
            <a href="#" className="mr-2">
              <img src="twitter.png" alt="Twitter" className="w-6 h-6" />
            </a>
            <a href="#">
              <img src="instagram.png" alt="YouTube" className="w-6 h-6" />
            </a>
          </div>
          {/* Find us on end */}
        </div>
      </section>

      {/* Hero Section End */}

      


     {/* Galley Section Start */}

     <section className="my-15" data-aos="fade-up">
  <div className="container mx-auto px-4 lg:px-8 py-20">
    <h1 className="text-4xl font-bold text-center underline underline-offset-8 text-[#406147] mb-12">
      Gallery
    </h1>

    <Gallery></Gallery>
  </div>
</section>


      {/* Galley Section END */}

      {/* Shop By Category Start */}

      <section data-aos="fade-up">
        <h1 className="text-2xl font-bold text-center mt-15 text-[#406147] underline decoration-4 underline-offset-[10px]">
          Shop by category
        </h1>
        <div className="text-center mx-20 max-[650px]:mx-2 mt-16">
          <Tabs>
            <TabList className="font-bold ">
              <Tab
                onClick={() => {
                  tabdata("Sports Car");
                }}
              >
                Sea doll
              </Tab>
              <Tab
                onClick={() => {
                  tabdata("Supercar");
                }}
              >
                Pet doll
              </Tab>
              <Tab
                onClick={() => {
                  tabdata("Truck");
                }}
              >
                Forest doll
              </Tab>
            </TabList>

            <TabPanel>{tabpaneldata}</TabPanel>

            <TabPanel>{tabpaneldata}</TabPanel>

            <TabPanel>{tabpaneldata}</TabPanel>
          </Tabs>
        </div>
      </section>

      {/* Shop By Category End */}

      {/* New Section 1 Start */}

      <section data-aos="zoom-in" data-aos-easing="ease-in-back">
  <div className="container mx-auto px-4 py-20">
    <div className="rounded-lg overflow-hidden shadow-lg bg-gradient-to-bl from-[#7f95ec] to-[#4d62ab] flex flex-col sm:flex-row">
      <div className="w-full sm:w-3/5 p-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          Spark Your Child's Imagination with Our Adorable Animal Doll Toys!
        </h2>
        <p className="text-[#f2f4fb] mb-6">
          Unlock a world of creativity and adventure as your child forms lasting connections with our charming animal doll toys.
        </p>
        <button className="bg-white hover:bg-gray-200 text-black font-semibold py-2 px-5 rounded-3xl"
        
        onClick={() => {
          user
            ? ""
            : toast.error(
                "You have to log in first to view details."
              );
        }}>
          
          Find On Store
        </button>
      </div>
      <div className="w-full sm:w-2/5 bg-cover bg-center">
        <div className="h-full m-6">
          <img src="./s1doll.png" alt="Doll" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  </div>
</section>



      {/* New Section 1 end */}

      

      {/* Newsletter start */}

      <div className="max-w-3xl mx-auto mb-8">
        <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
          <section className="py-12 px-8 bg-gray-200">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center">
                <img className="h-12 w-auto mr-2" src={logo} alt="Logo" />
                <h1 className="text-xl font-bold text-gray-800">Wonderkin</h1>
              </div>
              <h2 className="text-4xl font-bold mt-8">
                Subscribe to Our Newsletter
              </h2>
            </div>
            <form className="max-w-md mx-auto">

              <div className="flex flex-col items-center md:flex-row">
                <input
                  type="email"
                  className="flex-grow py-2 px-4 border border-gray-300 rounded-l-md rounded-t-none md:rounded-l-none md:rounded-t-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:bg-gray-100 transition duration-300"
                  placeholder="Enter your email address"
                />
                <button className="bg-[#406147] hover:bg-[#07500a] text-white py-2 px-6 rounded-r-md rounded-b-none md:rounded-r-none md:rounded-b-md mt-2 md:mt-0 transition duration-300">
                  Subscribe
                </button>
              </div>

            </form>
          </section>
        </div>
      </div>

      {/* Newsletter  */}
    </div>
  );
}

export default App;
