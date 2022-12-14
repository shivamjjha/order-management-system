import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import {
  useFetcher,
  Form,
  useLoaderData,
  Link,
  useNavigate,
  useLocation,
  useParams,
} from 'react-router-dom';

export default function AddEditOrderModal() {
  const cancelButtonRef = useRef(null);

  const fetcher = useFetcher();
  const navigate = useNavigate();
  const location = useLocation();
  let { orderNumber } = useParams();

  const pathname = location.pathname;
  const orders: any[] | undefined = useLoaderData() as any;

  const isEditPage = pathname.startsWith('/edit/')
  const open = pathname === '/new' || isEditPage;
  const onClose = () => navigate('/');

  const currentOrder = orders?.find(item => item.orderNumber === orderNumber);

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          initialFocus={cancelButtonRef}
          onClose={onClose}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          <div className='fixed inset-0 z-10 overflow-y-auto'>
            <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              >
                <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                  <fetcher.Form method='post'>
                    <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                      <div className='sm:flex sm:items-start'>
                        <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                          <Dialog.Title
                            as='h3'
                            className='text-lg font-medium leading-6 text-gray-900'
                          >
                            Add a new Order
                          </Dialog.Title>
                          <div className='mt-2'>
                            <div className='w-full max-w-lg'>
                              <div className='flex flex-wrap -mx-3 mb-6'>
                                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                                  <label
                                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                                    htmlFor='grid-first-name'
                                  >
                                    Order Number
                                  </label>
                                  <input
                                    className='appearance-none block w-full  text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                                    id='grid-first-name'
                                    type='text'
                                    name='orderNumber'
                                    defaultValue={currentOrder?.orderNumber ?? ''}
                                  />
                                </div>
                                <div className='w-full md:w-1/2 px-3'>
                                  <label
                                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                                    htmlFor='grid-last-name'
                                  >
                                    Order Due Date
                                  </label>
                                  <input
                                    className='appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                    id='grid-last-name'
                                    type='date'
                                    placeholder='Select Order Date'
                                    name='orderDueDate'
                                    defaultValue={currentOrder?.orderDueDate ?? ''}
                                  />
                                </div>
                              </div>
                              <div className='flex flex-wrap -mx-3 mb-6'>
                                <div className='w-full px-3'>
                                  <label
                                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                                    htmlFor='c-buyer-name'
                                  >
                                    Customer Buyer Name
                                  </label>
                                  <input
                                    className='appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                    id='c-buyer-name'
                                    type='text'
                                    name='buyerName'
                                    defaultValue={currentOrder?.buyerName ?? ''}
                                  />
                                </div>
                              </div>
                              <div className='flex flex-wrap -mx-3 mb-6'>
                                <div className='w-full px-3'>
                                  <label
                                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                                    htmlFor='c-address'
                                  >
                                    Customer Address
                                  </label>
                                  <input
                                    className='appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                    id='c-address'
                                    name='address'
                                    type='text'
                                    defaultValue={currentOrder?.address ?? ''}
                                  />
                                </div>
                              </div>
                              <div className='flex flex-wrap -mx-3 mb-2'>
                                <div className='w-full md:w-2/3 px-3 mb-6 md:mb-0'>
                                  <label
                                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                                    htmlFor='c-phone'
                                  >
                                    Customer Phone
                                  </label>
                                  <input
                                    className='appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                    id='c-phone'
                                    type='tel'
                                    name='tel'
                                    defaultValue={currentOrder?.tel ?? ''}
                                  />
                                </div>
                                <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                                  <label
                                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                                    htmlFor='order-total'
                                  >
                                    Order Total
                                  </label>
                                  <input
                                    className='appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                    id='order-total'
                                    type='text'
                                    name='orderTotal'
                                    defaultValue={currentOrder?.orderTotal ?? ''}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <input type="hidden" name="edit" value={isEditPage.toString()} />
                    <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                      <button
                        type='submit'
                        className='inline-flex w-full justify-center rounded-md border border-transparent bg-green-400 px-3 py-1 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
                      >
                        Save
                      </button>
                      <button
                        type='button'
                        className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                        onClick={onClose}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </fetcher.Form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Link to='/new'
        className='inline-flex w-full justify-center rounded-md border border-transparent bg-slate-400 px-3 py-1 text-base font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
      >New Order</Link>
    </>
  );
}
