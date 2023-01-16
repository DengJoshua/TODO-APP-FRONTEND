import React from "react";
import {
  ComputerDesktopIcon,
  ClockIcon,
  CreditCardIcon
} from "@heroicons/react/20/solid";
import { Squares2X2Icon } from "@heroicons/react/24/solid";

function Home() {
  return (
    <div
      className="w-full h-full items-center py-10 md:py-32"
      style={{ backgroundColor: "#f6f6f6" }}
    >
      <div className="text-center">
        <p className="text-xl md:text-4xl md:font-extralight">
          TodoApp Helps You{" "}
        </p>
        <p className="md:text-4xl">Manage Tasks and Time Efficently.</p>
      </div>
      <div className="grid w-full md:w-3/4 md:grid-cols-2 lg:grid-cols-4 gap-5 mx-auto p-5">
        <div className="flex flex-col w-full gap-2">
          <ComputerDesktopIcon className="h-10 w-10 fill-blue-600 md:w-1/3 md:h-1/3 mx-auto" />
          <strong className="text-center">Manage Tasks</strong>
          <p className="text-center font-light text-sm">
            TodoApp helps a user to carefully manage plan and then monitor
            progress on how a task is going.
          </p>
          <button className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium justify text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-700 w-fit self-center">
            Learn more
          </button>
        </div>
        <div className="flex flex-col w-full gap-2">
          <CreditCardIcon className="h-10 w-10 fill-blue-600 md:w-1/3 md:h-1/3 mx-auto" />
          <strong className="text-center">Manage Tasks</strong>
          <p className="text-center font-light text-sm">
            Make creating, deploying, and maintaining your own blocks easier
            with the developer tools.
          </p>
          <button className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium justify text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-700 w-fit self-center">
            Learn more
          </button>
        </div>
        <div className="flex flex-col w-full gap-2">
          <ClockIcon className="h-10 w-10 fill-blue-600 md:w-1/3 md:h-1/3 mx-auto" />
          <strong className="text-center">Manage Tasks</strong>
          <p className="text-center font-light text-sm">
            TodoApp helps a user to carefully manage plan and then monitor
            progress on how a task is going.
          </p>
          <button className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium justify text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-700 w-fit self-center">
            Learn more
          </button>
        </div>
        <div className="flex flex-col w-full gap-2">
          <Squares2X2Icon className="h-10 w-10 fill-blue-600 md:w-1/3 md:h-1/3 mx-auto" />
          <strong className="text-center">Manage Tasks</strong>
          <p className="text-center font-light text-sm">
            TodoApp helps a user to carefully manage plan and then monitor
            progress on how a task is going.
          </p>
          <button className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium justify text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-700 w-fit self-center">
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
