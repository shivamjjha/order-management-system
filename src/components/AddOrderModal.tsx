import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';

export default function AddOrderModal() {
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          initialFocus={cancelButtonRef}
          onClose={setOpen}
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
                  <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                    <div className='sm:flex sm:items-start'>
                      <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                        {/* <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" /> */}
                        Icon
                      </div>
                      <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                        <Dialog.Title
                          as='h3'
                          className='text-lg font-medium leading-6 text-gray-900'
                        >
                          Add a new Order
                        </Dialog.Title>
                        <div className='mt-2'>
                          <form className='w-full max-w-lg'>
                            <div className='flex flex-wrap -mx-3 mb-6'>
                              <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                                <label
                                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                                  htmlFor='grid-first-name'
                                >
                                  First Name
                                </label>
                                <input
                                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                                  id='grid-first-name'
                                  type='text'
                                  placeholder='Jane'
                                />
                                <p className='text-red-500 text-xs italic'>
                                  Please fill out this field.
                                </p>
                              </div>
                              <div className='w-full md:w-1/2 px-3'>
                                <label
                                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                                  htmlFor='grid-last-name'
                                >
                                  Last Name
                                </label>
                                <input
                                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                  id='grid-last-name'
                                  type='text'
                                  placeholder='Doe'
                                />
                              </div>
                            </div>
                            <div className='flex flex-wrap -mx-3 mb-6'>
                              <div className='w-full px-3'>
                                <label
                                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                                  htmlFor='grid-password'
                                >
                                  Password
                                </label>
                                <input
                                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                  id='grid-password'
                                  type='password'
                                  placeholder='******************'
                                />
                                <p className='text-gray-600 text-xs italic'>
                                  Make it as long and as crazy as you'd like
                                </p>
                              </div>
                            </div>
                            <div className='flex flex-wrap -mx-3 mb-2'>
                              <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                                <label
                                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                                  htmlFor='grid-city'
                                >
                                  City
                                </label>
                                <input
                                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                  id='grid-city'
                                  type='text'
                                  placeholder='Albuquerque'
                                />
                              </div>
                              <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                                <label
                                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                                  htmlFor='grid-state'
                                >
                                  State
                                </label>
                                <div className='relative'>
                                  <select
                                    className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                    id='grid-state'
                                  >
                                    <option>New Mexico</option>
                                    <option>Missouri</option>
                                    <option>Texas</option>
                                  </select>
                                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                                    <svg
                                      className='fill-current h-4 w-4'
                                      xmlns='http://www.w3.org/2000/svg'
                                      viewBox='0 0 20 20'
                                    >
                                      <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                              <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                                <label
                                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                                  htmlFor='grid-zip'
                                >
                                  Zip
                                </label>
                                <input
                                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                  id='grid-zip'
                                  type='text'
                                  placeholder={90210}
                                />
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                    <button
                      type='button'
                      className='inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
                      onClick={() => setOpen(false)}
                    >
                      Deactivate
                    </button>
                    <button
                      type='button'
                      className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <button onClick={() => setOpen(o => !o)}>New Order</button>
    </>
  );
}
