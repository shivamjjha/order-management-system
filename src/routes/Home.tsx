import AddOrderModal from '../components/AddOrderModal';
import { getCookie, setCookie } from '../utils/cookie';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import {
  useFetcher,
  Form,
  useLoaderData
} from 'react-router-dom';
export async function action({ request, params }: any) {
  console.log('action')
  const ordersFromCookie = getCookie('orders');
  const existingOrders = ordersFromCookie
    ? JSON.parse(ordersFromCookie)
    : [];
  console.log('existingOrders', existingOrders)
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log('data', data)


  // const record = JSON.parse(data?.data);
  // const newRestaurantsList = [...existingOrders, record];

  // setCookie('orders', JSON.stringify(newRestaurantsList));
  return
}

export function Home() {
  const data: any = useLoaderData();
  const [selected, setSelected] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const fetcher = useFetcher()

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
