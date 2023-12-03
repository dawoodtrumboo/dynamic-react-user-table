import React, { useState } from "react";


export const Modal = ({ closeModal, onSubmit }) => {
  const [formState, setFormState] = useState({
      name: "",
      email: "",
      role: "member",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.name && formState.email && formState.role) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };

  return (
    <div
    id="modal"
      className="fixed -top-10 left-0 bg-black bg-opacity-70 z-1 w-full h-full flex items-center justify-center"
      onClick={(e) => {
        if (e.target.id === "modal") closeModal();
      }}
    >
      <div className="bg-white backdrop-blur-[1px] bg-opacity-40 w-[400px] px-10 py-5 rounded-3xl border-[#0832DE] border-[1px] shadow-xl shadow-[#ffffff4b]">
        <form className="space-y-8 py-5">
            <fieldset className="border rounded-3xl text-white transition-all ease-in hover:border-[#0832DE] hover:text-[#0832DE]">
              <legend htmlFor="name" className="ml-4">Name</legend>
              <input className="bg-transparent focus:outline-none px-4 mb-2 w-full" name="name" onChange={handleChange} value={formState.name} />
            </fieldset>

            <fieldset className="border rounded-3xl text-white transition-all ease-in hover:border-[#0832DE] hover:text-[#0832DE]">
              <legend htmlFor="email" className="ml-4">Email</legend>
              <input className="bg-transparent focus:outline-none px-4 mb-2 w-full" name="email" onChange={handleChange} value={formState.email}/>
            </fieldset>
            <fieldset className="border rounded-3xl text-white transition-all ease-in hover:border-[#0832DE] hover:text-[#0832DE]">
              <legend htmlFor="role" className="ml-4">Role</legend>
                <select
                name="role"
                onChange={handleChange}
                value={formState.role}
                className="bg-transparent focus:outline-none px-4 mb-2 w-[95%]"
              >
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="member">Member</option>
              </select>           
               </fieldset>
        
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="save bg-transparent text-white border-white border-[1px] shadow-md shadow-[#ffffff51] px-6 py-2 rounded-xl transition-all hover:border-[#0832DE] hover:border-[#0832DE] hover:bg-[#0832DE]  " onClick={handleSubmit}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};
