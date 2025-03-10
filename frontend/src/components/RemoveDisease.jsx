import React, { useState } from "react";

const RemoveDisease = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Please enter the disease name.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/remove_disease", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ name }),
      });

      if (!response.ok) throw new Error(response);

      setError(response.text());
      setName("");
    } catch (err) {
      setError("Error removing disease");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-[#D8C4B6] shadow-md rounded-lg mt-20">
      <h1 className="text-xl font-bold mb-4 cursor-default select-none">
        Remove a Disease
      </h1>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label
          htmlFor="diseaseName"
          className="block mb-2 font-semibold cursor-default select-none"
        >
          What's the name?
        </label>
        <input
          id="diseaseName"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name of the Disease"
          className="w-full p-2 border rounded mb-4"
          autoFocus
        />

        <button
          type="submit"
          className="select-none bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
        >
          Remove
        </button>
      </form>

      <button
        onClick={() => (window.location.href = "/")}
        className="select-none mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-full"
      >
        Home
      </button>
    </div>
  );
};

export default RemoveDisease;
