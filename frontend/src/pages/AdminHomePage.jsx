// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { fetchAdminProducts } from '../redux/slices/adminProductSlice';
// import { fetchAllOrders } from '../redux/slices/adminOrderSlice';

// const AdminHomePage = () => {
// const dispatch = useDispatch();
// const { products, loading: productsLoading, error: productsError } = useSelector((state) => state.adminProducts);
// const { orders, totalOrders, totalSales, loading: ordersLoading, error: ordersError } = useSelector((state) => state.adminOrders);

// useEffect(() => {
//     dispatch(fetchAdminProducts());
//     dispatch(fetchAllOrders());
// }, [dispatch])

//   return (
//     <div className='max-w-7xl mx-auto p-6'>
//       <h1 className='text-3xl font-bold mb-6'>Admin Dashboard</h1>
//       {productsLoading || ordersLoading ? (
//         <p>Loading...</p>
//       ) : productsError ? (
//         <p className='text-red-500'>Error fetch products: {productsError}</p>
//       ) : ordersError ? (
//         <p className='text-red-500'>Error fetch orders: {ordersError}</p>
//       ) : (
//       <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
//         <div className='p-4 shadow-md rounded-lg'>
//             <h2 className='text-xl font-semibold'>Revenue</h2>
//             <p className='text-2xl'>${totalSales.toFixed(2)}</p>
//         </div>
//         <div className='p-4 shadow-md rounded-lg'>
//             <h2 className='text-xl font-semibold'>Total Orders</h2>
//             <p className='text-2xl'>{totalOrders}</p>
//             <Link to="/admin/orders" className='text-blue-500 hover:underline'>Manage Orders</Link>
//         </div>
//         <div className='p-4 shadow-md rounded-lg'>
//             <h2 className='text-xl font-semibold'>Total Products</h2>
//             <p className='text-2xl'>{products.length}</p>
//             <Link to="/admin/products" className='text-blue-500 hover:underline'>Manage Products</Link>
//         </div>
//       </div>
//       )}

//       <div className='mt-6'>
//         <h2 className='text-2xl font-bold mb-4'>Recent Orders</h2>
//         <div className='overflow-x-auto'>
//             <table className='min-w-full text-left text-gray-500'>
//                 <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
//                     <tr>
//                         <th className='py-3 px-4'>Order ID</th>
//                         <th className='py-3 px-4'>User</th>
//                         <th className='py-3 px-4'>Total Price</th>
//                         <th className='py-3 px-4'>Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {orders.length > 0 ? 
//                     (orders.map((order) => (
//                         <tr key={order._id} className='border-b hover:bg-gray-50 cursor-pointer'>
//                             <td className='p-4'>{order._id}</td>
//                             <td className='p-4'>{order.user}</td>
//                             <td className='p-4'>{order.totalPrice.toFixed(2)}</td>
//                             <td className='p-4'>{order.status}</td>
//                         </tr>
//                     ))) : (
//                         <tr colSpan={4} className='p-4 text-center text-gray-500'>
//                             No recent orders found
//                         </tr>
//                     ) }
//                 </tbody>
//             </table>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminHomePage

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAdminProducts } from '../redux/slices/adminProductSlice';
import { fetchAllOrders } from '../redux/slices/adminOrderSlice';

const AdminHomePage = () => {
    const dispatch = useDispatch();

    // FIX 1: Provide default empty arrays or default numeric values for state
    const { products = [], loading: productsLoading, error: productsError } = useSelector((state) => state.adminProducts);
    const {
        orders = [], // Default to empty array
        totalOrders = 0, // Default to 0
        totalSales = 0,  // Default to 0
        loading: ordersLoading,
        error: ordersError
    } = useSelector((state) => state.adminOrders);

    useEffect(() => {
        dispatch(fetchAdminProducts());
        dispatch(fetchAllOrders());
    }, [dispatch]);

    return (
        <div className='max-w-7xl mx-auto p-6'>
            <h1 className='text-3xl font-bold mb-6'>Admin Dashboard</h1>
            {productsLoading || ordersLoading ? (
                <p>Loading...</p>
            ) : productsError ? (
                <p className='text-red-500'>Error fetching products: {productsError}</p>
            ) : ordersError ? (
                <p className='text-red-500'>Error fetching orders: {ordersError}</p>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    <div className='p-4 shadow-md rounded-lg'>
                        <h2 className='text-xl font-semibold'>Revenue</h2>
                        {/* FIX 1: Ensure totalSales is a number before toFixed */}
                        <p className='text-2xl'>${(typeof totalSales === 'number' ? totalSales : 0).toFixed(2)}</p>
                    </div>
                    <div className='p-4 shadow-md rounded-lg'>
                        <h2 className='text-xl font-semibold'>Total Orders</h2>
                        {/* FIX 1: Ensure totalOrders is a number before display */}
                        <p className='text-2xl'>{typeof totalOrders === 'number' ? totalOrders : 0}</p>
                        <Link to="/admin/orders" className='text-blue-500 hover:underline'>Manage Orders</Link>
                    </div>
                    <div className='p-4 shadow-md rounded-lg'>
                        <h2 className='text-xl font-semibold'>Total Products</h2>
                        {/* products already defaulted to [] so .length is safe */}
                        <p className='text-2xl'>{products.length}</p>
                        <Link to="/admin/products" className='text-blue-500 hover:underline'>Manage Products</Link>
                    </div>
                </div>
            )}

            <div className='mt-6'>
                <h2 className='text-2xl font-bold mb-4'>Recent Orders</h2>
                <div className='overflow-x-auto'>
                    <table className='min-w-full text-left text-gray-500'>
                        <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                            <tr>
                                <th className='py-3 px-4'>Order ID</th>
                                <th className='py-3 px-4'>User</th>
                                <th className='py-3 px-4'>Total Price</th>
                                <th className='py-3 px-4'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ?
                                (orders.map((order) => (
                                    <tr key={order._id} className='border-b hover:bg-gray-50 cursor-pointer'>
                                        <td className='p-4'>{order._id}</td>
                                        {/* FIX 3: Access the user's name property */}
                                        <td className='p-4'>{order.user ? order.user.name : 'N/A'}</td>
                                        {/* FIX 1: Ensure totalPrice is a number before toFixed */}
                                        <td className='p-4'>
                                            ${(typeof order.totalPrice === 'number' ? order.totalPrice : 0).toFixed(2)}
                                        </td>
                                        <td className='p-4'>{order.status}</td>
                                    </tr>
                                ))) : (
                                    // FIX 2: Changed colspan to colSpan
                                    <tr colSpan={4} className='p-4 text-center text-gray-500'>
                                        <td>No recent orders found</td> {/* FIX: Wrap text in td */}
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminHomePage;
