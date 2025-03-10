import React, { useState } from "react";

const AddDisease = () => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !color) {
      setError("Please enter a disease name and select a color.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/add_disease", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ name, color }),
      });

      if (!response.ok) throw new Error(response);

      setError(response.text());
      setName("");
      setColor("");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-[#D8C4B6] shadow-md rounded-lg mt-20">
      <h1 className="text-xl font-bold mb-4 cursor-default select-none ">
        Add a Disease
      </h1>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label
          htmlFor="diseaseName"
          className="block mb-2 font-semibold cursor-default select-none"
        >
          Enter the name of the new Disease
        </label>
        <input
          id="diseaseName"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name of the Disease"
          className="w-full p-2 border rounded mb-4 "
          autoFocus
        />

        <label
          htmlFor="diseaseColor"
          className="block mb-2 font-semibold cursor-default select-none"
        >
          Pick a color:
        </label>
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { id: "red", value: "red" },
            { id: "green", value: "#00b33c" },
            { id: "yellow", value: "yellow" },
            { id: "olive", value: "#ffcc99" },
            { id: "orange", value: "orange" },
            { id: "teal", value: "#4dffc3" },
            { id: "blue", value: "#6699ff" },
            { id: "violet", value: "#6666ff" },
            { id: "purple", value: "#d11aff" },
            { id: "pink", value: "pink" },
          ].map((colorOption) => (
            <label key={colorOption.id} className="cursor-pointer">
              <input
                id="diseaseColor"
                type="radio"
                name="color"
                value={colorOption.value}
                checked={color === colorOption.value}
                onChange={(e) => setColor(e.target.value)}
                className="sr-only"
              />
              <span
                className={`inline-block w-6 h-6 rounded-full border-2 cursor-default select-none ${
                  color === colorOption.value
                    ? "border-black"
                    : "border-slate-400"
                }`}
                style={{ backgroundColor: colorOption.value }}
              ></span>
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="select-none bg-[#1F7D53] text-white px-4 py-2 rounded hover:bg-[#509a77] w-full"
        >
          Add
        </button>
      </form>

      <button
        onClick={() => (window.location.href = "/")}
        className="mt-4 select-none bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-full"
      >
        Home
      </button>
    </div>
  );
};

export default AddDisease;
