import React, { useState } from 'react'
import { LiaUserEditSolid } from "react-icons/lia";
import { MdOutlineDelete } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";


const Table = ({ userData = [], deleteUser, editUser, handleSelect, selectedRows }) => {

  const [editableRow, setEditableRow] = useState(null)
  const [editedData, setEditedData] = useState({});

  const handleEditClick = (id, user) => {
    setEditableRow(id);
    setEditedData(user);
  }

  const handleChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value })
  };

  const handleSave = (id) => {
    editUser(id, editedData);
    setEditableRow(null);
  }
  return (
    <div className='w-full text-black border-[1px] rounded-lg overflow-hidden'>

      <table className='w-full '>
        <thead className='bg-[#0832DE] text-white'>
          <tr>
            <th className='w-10 text-center'>
              <input 
              type='checkbox'
              onChange={() => handleSelect('all')}
              checked={selectedRows.length === userData.length}
              />
              </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th className='text-center'>Action</th>
          </tr>
        </thead>
        <tbody>

          {
            userData.map((user) => (
              <tr key={user.id} className={`${selectedRows.includes(user.id) ? 'bg-gray-200':''}`}>
                <td className='text-center'>
                  <input 
                  type='checkbox'
                  onChange={() => handleSelect(user.id)}
                  checked={selectedRows.includes(user.id)}
                  />
                </td>
                <td>
                  {editableRow === user.id ? (
                    <input
                      type='text'
                      value={editedData.name}
                      onChange={(e) => handleChange(e, "name")}
                    />
                  ) : (
                    user.name
                  )
                  }
                </td>
                <td>
                  {editableRow === user.id ? (
                    <input
                      type='email'
                      value={editedData.email}
                      onChange={(e) => handleChange(e, "email")}
                    />
                  ) : (
                    user.email
                  )
                  }
                </td>
                <td>
                  {editableRow === user.id ? (
                    <input
                      type='text'
                      value={editedData.role}
                      onChange={(e) => handleChange(e, "role")}
                    />
                  ) : (
                    user.role
                  )
                  }
                </td>

                <td>

                  {editableRow === user.id ? (
                    <span className='flex gap-5 justify-center text-lg'>
                      <button className='save  text-green-500' onClick={() => handleSave(user.id)}>
                        <TiTickOutline />
                      </button>
                      <button className='cancel  text-green-500' onClick={() => setEditableRow(null)}>
                        <RxCross2 />
                      </button>
                    </span>
                  ) : (
                    <span className='flex gap-5 justify-center text-lg'>
                      <button>
                        <MdOutlineDelete
                          onClick={() => deleteUser(user.id)}
                          color='red'
                          className='delete'
                        />
                      </button>
                      <button>
                        <LiaUserEditSolid
                          onClick={() => handleEditClick(user.id, user)}
                          className='edit'
                        />
                      </button>

                    </span>
                  )}




                </td>
              </tr>
            ))
          }

        </tbody>
      </table>

    </div >
  )
}

export default Table