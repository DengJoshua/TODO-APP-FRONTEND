import React from "react";
import { Modal, Box } from "@mui/material";
import { XCircleIcon } from "@heroicons/react/20/solid";

function TagModal({ tagname, setTagName, openTagModal, setOpenTagModal }) {
  return (
    <Modal open={openTagModal} onClose={() => setOpenTagModal(false)}>
      <Box>
        <div className="w-full flex flex-col gap-5 w-2/5 lg:w-2/5 mx-auto mt-56 bg-white rounded-xl p-5 transition-all duration-200">
          <strong className="text-center items-baseline">
            <XCircleIcon
              className="w-3 cursor-pointer text-b h-3 fill-red-500"
              onClick={() => setOpenTagModal(false)}
            />{" "}
            Add Tags
          </strong>
          <input
            type="text"
            value={tagname}
            placeholder="Tag name"
            className="outline-none border border-indigo-300 p-2 rounded"
            onChange={e => setTagName(e.target.value)}
          />
          <div className="flex flex-row-reverse">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded">
              Save
            </button>
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Cancel
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default TagModal;
