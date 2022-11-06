import { redirect } from "react-router-dom";
import { getCookie, setCookie } from "../utils/cookie";
import { getUserName } from "./Home";

export async function action({ params }: any) {
  const userName = getUserName()
  const ORDER_COOKIE_STRING = `${userName}:orders`
  const orderNumber = params.orderNumber
  if (orderNumber) {
    const ordersFromCookie = getCookie(ORDER_COOKIE_STRING)
    const existingOrders =  ordersFromCookie ? JSON.parse(ordersFromCookie) : []
    const filteredOrders = existingOrders.filter((item: any) => item.orderNumber !== orderNumber)
    setCookie(ORDER_COOKIE_STRING, JSON.stringify(filteredOrders))
  }
  return redirect("/");
}