"use client";

import { useState } from "react";

interface DeleteProps {
  funcToDo: () => void;
}

function Delete({ funcToDo }: DeleteProps) {
  const [toDeleteState, setToDeleteState] = useState<number>(0);

  return (
    <div
      className="text-neutral-400 hover:text-[#ddd] hover:bg-rose-700 flex items-center gap-x-1"
      // onClick={deleteCollection}
    >
      {/* <MinusCircleIcon className="w-5 h-5" /> */}
      {toDeleteState === 0 && (
        <div
          className="w-full px-3 py-1 cursor-pointer"
          onClick={() => setToDeleteState(1)}
        >
          Delete
        </div>
      )}
      {toDeleteState === 1 && (
        <div className="px-3 py-1 w-full flex justify-between">
          <span>Are you sure?</span>
          <div>
            <span className="cursor-pointer hover:underline" onClick={funcToDo}>
              Yes
            </span>
            {" / "}
            <span
              className="cursor-pointer hover:underline"
              onClick={() => setToDeleteState(0)}
            >
              No
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Delete;
