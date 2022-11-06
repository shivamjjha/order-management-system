import { redirect } from "react-router-dom";
import { getCookie, setCookie } from "../utils/cookie";

export async function action({ params }: any) {
  const orderNumber = params.orderNumber
  console.log('orderNumber', orderNumber)
  if (orderNumber) {
    const ordersFromCookie = getCookie('orders')
    const existingOrders =  ordersFromCookie ? JSON.parse(ordersFromCookie) : []
    console.log('existingOrders', existingOrders);
    
    const filteredOrders = existingOrders.filter((item: any) => item.orderNumber !== orderNumber)
    console.log('filteredOrders', filteredOrders);
    setCookie('orders', JSON.stringify(filteredOrders))
  }
  return redirect("/");
}