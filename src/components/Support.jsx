import React from "react";

function Support() {
  return (
    <select
      name="Category"
      className="text-red-400 p-3 outline-none border border-indigo-400 rounded hover:text-green-200 m-10"
    >
      <option
        value="Yes"
        className="text-general hover:text-blue-400 cursor-pointer"
      >
        Yes
      </option>
      <option value="Maybe">Entertainment</option>
      <option value="No">No</option>
    </select>
  );
}

export default Support;
