import React, { useEffect, useState } from "react";
import CheckoutItem from "../components/CheckoutItem";
/* import Nav from "../components/Nav"; */
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";
import { selectItems as selectFavoritedItems } from "../slices/favoritesSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { PlusCircleIcon } from "@heroicons/react/outline";
import { addToBasket } from "../slices/basketSlice";
import { emptyBasket } from "../slices/basketSlice";

function CheckoutBody() {
  const items = useSelector(selectItems);
  const favoritedItems = useSelector(selectFavoritedItems);
  const itemCost = 5;
  const [favItems, setFavItems] = useState([]);
  const [buttonText, setButtonText] = useState("Place Order");

  const dispatch = useDispatch();

  const favsToDisplay = () => {
    const favs = favoritedItems.filter((__item) => {
      if (!items.some((item) => item.id === __item.id)) {
        return __item;
      }
    });
    setFavItems(favs);
  };

  useEffect(() => {
    favsToDisplay();
  }, [items]);

  const handleAddItemToBasket = (id) => {
    //find the product
    const product = favoritedItems.find((item) => item.id === id);

    dispatch(addToBasket(product));
  };

  /*   console.log(favItems); */

  const placeOrder = () => {
    setButtonText("Ordering...");
    setTimeout(() => {
      console.log("Order placed!");
      setButtonText("Place Order");
      dispatch(emptyBasket());
    }, 3000);
  };

  return (
    <div>
      {" "}
      {items.length > 0 ? (
        <p className="font-bold text-2xl mt-4 ml-3">your shopping basket:</p>
      ) : (
        <p className="font-bold text-xl mt-4 ml-3">
          your shopping basket is empty
        </p>
      )}
      {/* Checkout Product including trashbin, to left. Price on far right(hard code price). */}
      {items.map((item, i) => (
        <CheckoutItem item={item} key={i} />
      ))}
      {items.length > 0 && (
        <h2 className="ml-4 mt-4">Total:${itemCost * items.length}</h2>
      )}
      {/* PLACE ORDER BUTTON */}
      {items.length > 0 && (
        <div onClick={placeOrder} className="flex justify-center">
          <div className="w-32 group transtion duration-100 hover:scale-105 cursor-pointer h-10 rounded-full bg-navBarColor flex-row flex justify-center items-center">
            <p className="text-white group-hover:underline cursor-pointer font-semibold text-sm ">
              {buttonText}
            </p>
          </div>
        </div>
      )}
      {/* FAVORITED ITEMS(but that are not in cart) */}
      {favItems.length > 0 && (
        <h1 className="font-semibold text-base mt-4 ml-3">
          Add some favorites?
        </h1>
      )}
      <div className="flex flex-wrap mb-7 mt-2 ml-3">
        {favItems.map((item, i) => (
          <div key={i} className="flex flex-col items-center ml-4">
            <LazyLoadImage
              src={item.url}
              key={i}
              className="h-16 w-16"
            ></LazyLoadImage>
            <div className="flex justify-center">
              <PlusCircleIcon
                onClick={() => handleAddItemToBasket(item.id)}
                className="h-4 w-4 text-blue-600 cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CheckoutBody;
