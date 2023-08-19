"use strict";
const newUser = {
  name: "ismail",
  surname: "aslan",
  email: "ismailaslan1097@gmail.com",
  password: "asdf",
};
const BASE_URL = "http://localhost:8000/api/v1/";

const fetcher = async (url, method = "", headers, body = {}) => {
  const res = await fetch(
    BASE_URL + url,
    method === "GET"
      ? {
          method,
          headers,
        }
      : {
          method,
          headers,
          body: JSON.stringify(body),
        }
  );
  return await res.json();
};

const main = async () => {
  try {
    let token = "";

    //#region login register

    try {
      const res = await fetch(BASE_URL + "users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(newUser),
      });
      let data = await res.json();
      data = data.data;
      token = data.token;
    } catch (error) {
      const res = await fetch(BASE_URL + "users/login", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      let data = await res.json();
      data = data.data;
      token = data.token;
    }
    //#endregion

    const headerObj = {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: "Bearer " + token,
    };

    const newProduct = await fetcher("products/", "POST", headerObj, {
      title: "deneme" + Math.floor(Math.random() * 100),
      description: "deneme desc",
      categoryIds: [],
      price: Math.floor(Math.random() * 100) / 10,
      showDiscount: false,
      isListed: true,
      unitCount: Math.floor(Math.random() * 3 + 1),
    });
    console.log("newProduct", newProduct);
    const cart = await fetcher("cart/" + newProduct.data.id, "GET", headerObj);
    if (cart.status !== "success") {
      console.log("cart", cart);
      throw "cart error";
    }
    const checkout = await fetcher("payment/", "GET", headerObj);
    console.log("checkout =>", checkout);
  } catch (error) {
    console.log("error===>", error);
  }
};
main();
