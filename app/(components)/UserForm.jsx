"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const res = await fetch("/api/Users", {
      method: "POST",
      body: JSON.stringify({ formData }),
      "content-type": "application/json",
    });

    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response);
    } else {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-3 w-1/2 "
      >
        <h1>Create New User</h1>
        <label>Enter your Full Name</label>
        <input
          value={formData.name}
          type="text"
          name="name"
          id="name"
          required={true}
          className="m-2 bg-blue-400 rounded"
        />
        <label>Enter your Email</label>
        <input
          value={formData.email}
          type="text"
          name="email"
          id="email"
          required={true}
          className="m-2 bg-blue-400 rounded"
        />
        <label>Enter your Password</label>
        <input
          value={formData.password}
          type="password"
          name="password"
          id="password"
          required={true}
          className="m-2 bg-blue-400 rounded"
        />
        <input
          type="submit"
          value="Create User"
          className="bg-blue-300 hover:bg-blue-100"
        />
      </form>
      <p className="text-red-500">{errorMessage}</p>
    </>
  );
};

export default UserForm;
