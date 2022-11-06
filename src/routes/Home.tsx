import AddOrderModal from '../components/AddOrderModal';
import { getCookie, setCookie } from '../utils/cookie';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import { useFetcher, Form, useLoaderData } from 'react-router-dom';

export async function action({ request, params }: any) {
  console.log('action');
  const ordersFromCookie = getCookie('orders');
  const existingOrders = ordersFromCookie ? JSON.parse(ordersFromCookie) : [];
  console.log('existingOrders', existingOrders);
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log('data', data);

  const record = data;
  const newOrdersList = [...existingOrders, record];
  console.log('newRestaurantsList', newOrdersList);

  setCookie('orders', JSON.stringify(newOrdersList));
  return;
}

export async function loader() {
  const ordersFromCookie = getCookie('orders');
  const existingOrders = ordersFromCookie ? JSON.parse(ordersFromCookie) : [];

  return existingOrders;
}

export function Home() {
  const orders: any[] | undefined = useLoaderData() as any;
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>(null);

  console.log('data', orders);

  return (
    <div className='overflow-x-auto relative'>
      <AddOrderModal />
      <table className='w-full text-sm text-left text-gray-500'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
          <tr>
            <th scope='col' className='py-3 px-6'>
              Order Number
            </th>
            <th scope='col' className='py-3 px-6'>
              Order Due Date
            </th>
            <th scope='col' className='py-3 px-6'>
              Customer Buyer Name
            </th>
            <th scope='col' className='py-3 px-6'>
              Customer Address
            </th>
            <th scope='col' className='py-3 px-6'>
              Customer Phone
            </th>
            <th scope='col' className='py-3 px-6'>
              Order Total
            </th>
            <th scope='col' className='py-3 px-6 text-center' colSpan={2}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((item: any, idx) => {
            return (
              <tr className='bg-white border-b' key={idx}>
                <th
                  scope='row'
                  className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap'
                >
                  {item.orderNumber ?? ''}
                </th>
                <td className='py-4 px-6'>{item.orderDueDate ?? ''}</td>
                <td className='py-4 px-6'>{item.buyerName ?? ''}</td>
                <td className='py-4 px-6'>{item.address ?? ''}</td>
                <td className='py-4 px-6'>{item.tel ?? ''}</td>
                <td className='py-4 px-6'>{item.orderTotal ?? ''}</td>
                <td className='py-4 px-6'>
                  <button
                    type='button'
                    onClick={() => {
                      setOpen(true);
                      setData({
                        orderNumber: '2323',
                        orderDueDate: '2022-11-06',
                        buyerName: 'nkqnkqnk',
                        address: 'nknk',
                        tel: 'nknkn3knk',
                        orderTotal: 'nknknk',
                      });
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td className='py-4 px-6'>
                  <button type='button'>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
