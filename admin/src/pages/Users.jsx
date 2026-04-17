import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DashChartData } from '../store/slices/authSlice';

const Users = () => {

    const {AllUsers} = useSelector(state=> state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(DashChartData())
    }, [dispatch]);

  return (
    <div>
        {/* ✅ RECENT ORDERS */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-[24px]! mt-10">
        <h2 className="text-xl font-bold mb-[20px]!">All Users</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 text-sm border-b">
              <th className="pb-[10px]!">User ID</th>
              <th className="pb-[10px]!">User Name</th>
              <th className="pb-[10px]!">User Email</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {AllUsers?.map((user) => (

              <tr key={user._id} className="border-b hover:bg-gray-50">

                <td className="py-[15px]! font-mono text-xs">
                  {user._id.slice(0, 8)}
                </td>

                <td className="py-[15px]!">
                  {user?.fullName || "N/A"}
                </td>

                <td className="py-[15px]! font-bold">
                  ${user?.email}
                </td>

              </tr>

            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users
