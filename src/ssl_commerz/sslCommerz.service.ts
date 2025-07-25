import { envVariables } from "../config/env.config";
import AppError from "../errorHandler/AppError";
import { ISslCommerz } from "./ssslCommerz.interface";
import axios from "axios";
const sslPaymentInit = async (payload: ISslCommerz) => {
  try {
    const { amount, transactionId, name, email, address, phone } = payload;
    const data = {
      store_id: envVariables.SSL_STORE_ID,
      store_passwd: envVariables.SSL_STORE_PASS,
      total_amount: amount,
      currency: "BDT",
      tran_id: transactionId,
      success_url: `${envVariables.SSL_SUCCESS_BACKEND_URL}?transactionId=${transactionId}&amount=${amount}&status=success`,
      fail_url: `${envVariables.SSL_FAIL_BACKEND_URL}?transactionId=${transactionId}&amount=${amount}&status=fail`,
      cancel_url: `${envVariables.SSL_CANCEL_BACKEND_URL}?transactionId=${transactionId}&amount=${amount}&status=cancel`,
      // ipn_url: envVariables.SSL_SUCCESS_BACKEND_URL,
      shipping_method: "N/A",
      Product_name: "Tour Management System",
      Product_category: "service",
      Product_profile: "general",

      cus_name: name,
      cus_email: email,
      cus_add1: address,
      cus_add2: address,
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: phone,
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: "1000",
      ship_country: "Bangladesh",
      multi_card_name: "mastercard,visacard,amexcard",
      value_a: "ref001_A",
      value_b: "ref002_B",
      value_c: "ref003_C",
      value_d: "ref004_D",
    };
    console.log(data);
    const response = await axios({
      method: "post",
      url: envVariables.SSL_PAYMENT_API,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: data,
    });

    // const response = await axios.post(envVariables.SSL_PAYMENT_API, data, {
    //   headers: { "Content-Type": "application/x-www-from-urlencoded" },
    // });
    console.log("at ssl service", (await response).data);
    return response.data;
  } catch (error) {
    console.log("at ssl service error", error);
    throw new AppError(500, "Failed to initiate SSL payment");
  }
};

export const sslCommerzService = {
  sslPaymentInit,
};
