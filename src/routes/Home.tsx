import AddEditOrderModal from '../components/AddEditOrderModal';
import { getCookie, setCookie } from '../utils/cookie';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import {
  useFetcher,
  Form,
  useLoaderData,
  Link,
  redirect,
} from 'react-router-dom';

// TO allow multiple users to log in and log out and still maintain orders in cookies
export const getUserName = () => {
  const userCookieValue = getCookie('user') ?? ''
  if (userCookieValue == null || userCookieValue == '') {
    throw new Error('please log in first!')
  }
  const userName = JSON.parse(userCookieValue)?.username
  return userName;
}

export async function action({ request, params }: any) {
  const userName = getUserName()
  const ORDER_COOKIE_STRING = `${userName}:orders`

  const ordersFromCookie = getCookie(ORDER_COOKIE_STRING);
  const existingOrders = ordersFromCookie ? JSON.parse(ordersFromCookie) : [];
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const record = data;
  const newOrdersList =
    data.edit === 'true'
      ? existingOrders?.map((item: any) =>
        item.orderNumber === params.orderNumber ? record : item
      )
      : [...existingOrders, record];

  setCookie(ORDER_COOKIE_STRING, JSON.stringify(newOrdersList));
  return redirect('/');
}

export async function loader() {
  const userName = getUserName()
  const ORDER_COOKIE_STRING = `${userName}:orders`
  const ordersFromCookie = getCookie(ORDER_COOKIE_STRING);
  const existingOrders = ordersFromCookie ? JSON.parse(ordersFromCookie) : [];

  return existingOrders;
}

export function Home() {
  const orders: any[] | undefined = useLoaderData() as any;


  return (
    <div className='overflow-x-auto relative'>
      <AddEditOrderModal />
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
            const orderNumber = item.orderNumber;

            return (
              <tr className='bg-white border-b' key={idx}>
                <th
                  scope='row'
                  className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap'
                >
                  {orderNumber ?? ''}
                </th>
                <td className='py-4 px-6'>{item.orderDueDate ?? ''}</td>
                <td className='py-4 px-6'>{item.buyerName ?? ''}</td>
                <td className='py-4 px-6'>{item.address ?? ''}</td>
                <td className='py-4 px-6'>{item.tel ?? ''}</td>
                <td className='py-4 px-6'>{item.orderTotal ?? ''}</td>
                <td className='py-4 px-6'>
                  <Link to={`/edit/${orderNumber}`}>Edit</Link>
                </td>
                <td className='py-4 px-6'>
                  <Form
                    method='post'
                    action={`/${orderNumber}/destroy`}
                    onSubmit={event => {
                      if (
                        !confirm(
                          'Please confirm you want to delete this order.'
                        )
                      ) {
                        event.preventDefault();
                      }
                    }}
                  >
                    <input type='hidden' value={orderNumber} />
                    <button type='submit'>Delete</button>
                  </Form>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
