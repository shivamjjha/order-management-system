import { useState } from 'react';
import {
  useFetcher,
  useLoaderData
} from 'react-router-dom';
import AddOrderModal from '../components/AddOrderModal';
import { getCookie, setCookie } from '../utils/cookie';

export async function action({ request, params }: any) {
  const ordersFromCookie = getCookie('orders');
  const existingOrders = ordersFromCookie
    ? JSON.parse(ordersFromCookie)
    : [];
  const formData = await request.formData();
  const data = Object.fromEntries(formData);


  const record = JSON.parse(data?.data);
  const newRestaurantsList = [...existingOrders, record];

  setCookie('orders', JSON.stringify(newRestaurantsList));
}

export function Home() {
  const data: any = useLoaderData();
  const [selected, setSelected] = useState<any>(null);
  const fetcher = useFetcher();

  return (
    <div className="overflow-x-auto relative">
      <AddOrderModal />
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="py-3 px-6">
              Order Number
            </th>
            <th scope="col" className="py-3 px-6">
              Order Due Date
            </th>
            <th scope="col" className="py-3 px-6">
              Customer Buyer Name
            </th>
            <th scope="col" className="py-3 px-6">
              Customer Address
            </th>
            <th scope="col" className="py-3 px-6">
              Customer Phone
            </th>
            <th scope="col" className="py-3 px-6">
              Order Total
            </th>
            <th scope="col" className="py-3 px-6 text-center" colSpan={2}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b">
            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
              Apple MacBook Pro 17"
            </th>
            <td className="py-4 px-6">
              Order Due Date
            </td>
            <td className="py-4 px-6">
              Customer Buyer Name
            </td>
            <td className="py-4 px-6">
              Customer Address
            </td>
            <td className="py-4 px-6">
              Customer Phone
            </td>
            <td className="py-4 px-6">
              Order Total
            </td>
            <td className="py-4 px-6">
              Edit
            </td>
            <td className="py-4 px-6">
              Delete
            </td>
          </tr>
        </tbody>
      </table>
    </div>



  );
}
