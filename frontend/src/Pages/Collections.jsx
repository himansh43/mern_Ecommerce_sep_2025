import React from "react";
import { useStoreContext } from "../Context/StoreContext";
import { useState, useEffect } from "react";
import SearchProduct from "../Components/searchProduct";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";

const Collections = () => {
  let { products } = useStoreContext();
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(true);
  const location = useLocation();
  const [sortType,setSortType]= useState('relevant')
  const { showSearch, setShowSearch, searchInput, setSearchInput } =
    useStoreContext();

  const navigate = useNavigate();

  const applyCategoryFilter = (id) => {
    if (category.includes(id)) {
      setCategory((prev) => prev.filter((item) => item !== id));
    } else {
      setCategory((prev) => [...prev, id]);
    }
  };

  const applySubCategoryFilter = (id) => {
    if (subCategory.includes(id)) {
      setSubCategory((prev) => prev.filter((item) => item !== id));
    } else {
      setSubCategory((prev) => [...prev, id]);
    }
  };

  const applyFilter = () => {
    let productsCopy = [...products];
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setAllProducts(productsCopy);
  };

  const handleSortType = () => {
    let productsCopy = [...allProducts];
    switch (sortType) {
      case "LowToHigh":
        {
          productsCopy = productsCopy.sort((a, b) => a.price - b.price);
          setAllProducts(productsCopy);
        }
        break;
      case "HighToLow":
        {
          productsCopy = productsCopy.sort((a, b) => b.price - a.price);
          setAllProducts(productsCopy);
        }
        break;
      // case "Relevant":
      //   {
      //     setAllProducts(productsCopy);
      //   }
      //   break;
      default:
        setAllProducts(productsCopy);
        break;
    }
  };

  const handleSearchInput = (e) => {
    const term = searchInput.toLowerCase();
    let productsCopy = [...products];
    productsCopy = productsCopy.filter((item) => {
      return item.name.toLowerCase().includes(term);
    });

    setAllProducts(productsCopy);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, products]);

  useEffect(() => {
    handleSearchInput();
  }, [showSearch, setShowSearch, searchInput, setSearchInput]);

  useEffect(()=>{handleSortType()},[sortType])

  useEffect(()=>{
    setAllProducts(products)
  },[])

  return (
    <div className="flex justify-center items-center w-full mt-5">
      <div className="flex flex-col  justify-between items-center gap-10 w-full">
        {location.pathname === "/collections" && showSearch && (
          <div className="w-60 sm:w-72 md:w-80 lg:w-96">
            <SearchProduct />
          </div>
        )}
        <div className="flex flex-col sm:flex-row justify-between gap-10 w-full h-screen">
          {/* Filters */}
          <div className="sm:w-[20%] min-w-60 w-full flex flex-col  gap-2">
            <div className="flex gap-2  items-center">
              <h2 className=" text-xl">FILTERS</h2>
              <img
                src={assets.dropdown_icon}
                alt=""
                className={`h-4 cursor-pointer sm:hidden ${
                  showFilter ? "rotate-90" : ""
                }`}
                onClick={() => {
                  setShowFilter(!showFilter);
                }}
              />
            </div>

            {showFilter && (
              <>
                {" "}
                <div>
                  <hr className="text-gray-300 mb-3" />
                  <h2 className="font-medium">CATEGORIES</h2>
                  <div className="flex gap-2 text-gray-600">
                    <input
                      type="checkbox"
                      id="Men"
                      className="accent-red-500"
                      onChange={(e) => applyCategoryFilter(e.target.id)}
                    />
                    <label htmlFor="Men">Men</label>
                  </div>
                  <div className="flex gap-2 text-gray-600">
                    <input
                      type="checkbox"
                      id="Women"
                      className="accent-red-500"
                      onChange={(e) => applyCategoryFilter(e.target.id)}
                    />
                    <label htmlFor="Women">Women</label>
                  </div>
                  <div className="flex gap-2 text-gray-600">
                    <input
                      type="checkbox"
                      id="Kids"
                      className="accent-red-500"
                      onChange={(e) => applyCategoryFilter(e.target.id)}
                    />
                    <label htmlFor="Kids">Kids</label>
                  </div>
                </div>
                <hr className="text-gray-300" />
                <div>
                  <h2 className="font-medium">TYPE</h2>
                  <div className="flex gap-2 text-gray-600">
                    <input
                      type="checkbox"
                      id="TopWear"
                      className="accent-red-500"
                      onChange={(e) => applySubCategoryFilter(e.target.id)}
                    />
                    <label htmlFor="Topwear">Topwear</label>
                  </div>
                  <div className="flex gap-2 text-gray-600">
                    <input
                      type="checkbox"
                      id="BottomWear"
                      className="accent-red-500"
                      onChange={(e) => applySubCategoryFilter(e.target.id)}
                    />
                    <label htmlFor="Bottomwear">Bottomwear</label>
                  </div>
                  <div className="flex gap-2 text-gray-600">
                    <input
                      type="checkbox"
                      id="WinterWear"
                      className="accent-red-500"
                      onChange={(e) => applySubCategoryFilter(e.target.id)}
                    />
                    <label htmlFor="Winterwear">Winterwear</label>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Collections list */}
          <div className="w-[100%] flex-1 flex-col">
            <div className="flex flex-col sm:flex-row gap-2 w-full justify-between sm:items-center">
              <div className="flex items-center justify-center  gap-2">
                <h2 className="text-2xl font-medium text-gray-600">
                  ALL COLLECTIONS
                </h2>
                <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
              </div>
              <div className=" ">
                <select
                  name="sortBy"
                  id="sort"
                  className="outline-none px-2 py-1 border border-gray-600 rounded-sm cursor-pointer"
                  // onChange={(e) => handleSortType(e.target.value)}
                  onChange={(e)=>setSortType(e.target.value)}
                >
                  <option value="" hidden>
                    Sort By
                  </option>
                  <option value="Relevant">Relevant</option>
                  <option value="HighToLow">High to Low</option>
                  <option value="LowToHigh">Low to High</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4  mt-5 gap-5 w-full">
              {allProducts.map((item) => (
                <div key={item._id}>
                  <NavLink to={`/product/${item._id}`}>
                    <div className=" flex flex-col ">
                      <div className="overflow-hidden">
                        <img
                          src={item.image[0]}
                          alt="product-image"
                          className="w-full cursor-pointer hover:scale-110 transition ease-in-out"
                        />
                      </div>

                      <p className="text-[12px]">{item.name}</p>
                      <p>${item.price}</p>
                    </div>
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
