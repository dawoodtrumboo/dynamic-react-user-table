import React, { useState,useEffect } from 'react'
import { CiSearch } from "react-icons/ci";
import { Modal } from './Modal';
import Table from './Table';
import { MdNavigateNext,MdNavigateBefore } from "react-icons/md";
const Users = () => {

  const [modalOpen, setModalOpen] = useState(false);

  const [userData, setUserData] = useState([])


useEffect(()=> {

  const fetchData = async () => {

    try{
      const response = await fetch(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`);
      const result = await response.json();
      setUserData(result);
    }catch(error){
      console.log("Error in fetching: ", error.message)
    }
  }

  fetchData();
},[])






  const totalUsers = userData.length;
  const [userToEdit, setUserToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  const totalAdmins = () =>{
    const admins = userData.filter((user) => user.role ==='admin');
    return admins.length
  }
  const totalMembers = () =>{
    const mods = userData.filter((user) => user.role ==='member');
    return mods.length
  }
  const handleSearchChange = (event) => {
    if (event.key === 'Enter') {
      setSearchTerm(event.target.value.toLowerCase());
    }
  };


  const getFilteredUserData = () => {
    return userData.filter((user) =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.role.toLowerCase().includes(searchTerm)
    );
  };

  const [currentPage, setcurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage*recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = getFilteredUserData().slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(getFilteredUserData().length / recordsPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);

  function nextPage(){
      if(currentPage !== lastIndex && currentPage < totalPages){
        setcurrentPage(currentPage+1);
      }
  }

  function prevPage(){
    if(currentPage !== 1){
      setcurrentPage(currentPage-1);
    }
  }

  function changeCurrentPage(id){
    setcurrentPage(id)
  }



  const handleSelect = (id) => {
    if(id === 'all'){
      if(selectedRows.length === userData.length){
        setSelectedRows([]);
      }else{
        setSelectedRows(records.map(user => user.id))
      }
    } else {
      setSelectedRows((prevSelectedRow) => {
        if(prevSelectedRow.includes(id)) {
          return prevSelectedRow.filter(rowId => rowId !== id);
        } else {
          return [...prevSelectedRow,id];
        }
      })
    }
  }

  const handleDeleteUser = (targetId) => {
    setUserData(userData.filter((user) => user.id !== targetId));
  }

  const handleDeleteSelectedUser = () =>{
    setUserData(userData.filter((user) => !selectedRows.includes(user.id)));
    setSelectedRows([]);
  }
  const handleUserEdit = (id, updatedUser) => {
    setUserData(userData.map(user =>{
      if(user.id === id) {
        return {...user, ...updatedUser};
      }
      return user
    }))
  }

  const handleAddUser = (newUser) => {
    userToEdit == null
      ? setUserData([...userData, newUser])
      : setUserData(
        userData.map((currUser, idx) => {
          if (idx !== userToEdit) return currUser;

          return newUser;
        })
      );
  };

  
  return (
    <div className='w-full px-[10px]'>

      <header className='w-3/4 mx-auto flex justify-between items-center h-[150px]'>
        <div className='text-center '>
          <span className='text-5xl font-semibold'>{totalUsers}</span>
          <p className='text-sm text-gray-600'>Users</p>
        </div>
        <hr className='w-[80px] border-[1px] rotate-90' />
        <div className='text-center'>
          <span className='text-5xl font-semibold'>{totalAdmins()}</span>
          <p className='text-sm text-gray-600'>Admins</p>
        </div>
        <hr className='w-[80px] border-[1px] rotate-90' />
        <div className='text-center'>
          <span className='text-5xl font-semibold'>{totalMembers()}</span>
          <p className='text-sm text-gray-600'>Members</p>
        </div>

      </header>
      <div className='flex justify-between w-full items-center mt-[50px] mb-3'>
      <div className='rounded-lg border-[1px] border-gray-200 w-[30%] px-2 py-1 flex gap-2 items-center text-gray-600'>
        <CiSearch />
        <input onKeyDown={handleSearchChange}  placeholder='Search here...' className='focus:outline-none text-sm py-1 w-full text-gray-400 placeholder:text-gray-400' />
      </div>
      <div className='flex gap-5 items-center'>
        {selectedRows.length>0 &&
         <button onClick={() => handleDeleteSelectedUser() } className="bg-red-600 rounded-lg text-white font-semibold text-sm px-8 py-2">
         Delete
       </button>
        }
     
      <button onClick={() => setModalOpen(true)} className="bg-[#0832DE] rounded-lg text-white font-semibold text-sm px-8 py-2">
        Add
      </button>
      </div>
      </div>
     

      {/* <div className='w-3/5 mx-auto'>

            <Table2 userData={userData} deleteUser={handleDeleteUser} editUser={handleUserEdit} />
      <button onClick={() => setModalOpen(true)} className="btn">
        Add
      </button>
      

            </div> */}
      <Table
        userData={records} 
        deleteUser={handleDeleteUser} 
        editUser={handleUserEdit}
        handleSelect = {handleSelect}
        selectedRows = {selectedRows}
       
      />
      {
        records.length>0 ?
        <nav className='flex w-full justify-between text-xs mt-8'>
        <div>
          <span className='py- text-gray-500'>{currentPage} out of {totalPages} page</span>
        </div>
        <ul className='flex gap-2 items-center'>
          <li className='flex items-center text-lg cursor-pointer hover:text-[#0832DE]' onClick={prevPage}>
            <button><MdNavigateBefore/></button>
          </li>
          {
            numbers.map((n,i)=>(
              <li 
              className={`cursor-pointer border-[1px] border-gray-400 rounded-md px-2 py-1 hover:bg-[#0832DE] hover:text-white transition-all ease-in 
              ${currentPage === n ? 'bg-[#0832DE] text-white border-none':'bg-gray-200 '}`} 
              key={i}
              onClick={()=>changeCurrentPage(n)}
              >
                <button
                >{n}</button>
              </li>
            ))
          }
           <li className='flex items-center text-lg cursor-pointer hover:text-[#0832DE]'onClick={nextPage}>
           <button><MdNavigateNext/></button>
          </li>
        </ul>
      </nav>
      : null
      }
   
      
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setUserToEdit(null);
          }}
          onSubmit={handleAddUser}
        />
      )}
    </div>
  )
}

export default Users