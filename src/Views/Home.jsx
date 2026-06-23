import React from "react";
import TaskPieChart from "../DashBoard/Home/Taskpiechart";
import Accordion from "../DashBoard/Home/Accordion";

const Home = () => {
  const userData = sessionStorage.getItem("userData"); // get user data from session storage
  const parsedData = JSON.parse(userData); // parse the user data
  const userName = parsedData[0].EmpName; // get the EmpName value from the user data
  return (
    <div className=" mx-2">
      <div className="flex my-2 font-bold w-full">Welcome, {userName}</div>
      <div className="mt-3 border border-black">
        <div className="flex items-center border border-b-black">
          <div className="flex justify-start items-center p-3 font-bold">
            Tasks
          </div>

          <div className="flex justify-center items-center gap-0 sm:gap-3 md:gap-4 lg:gap-5 ml-1 sm:ml-[5%] md:ml-[20%] lg:ml-[30%]">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded bg-yellow-500 mx-2"></div>Ongoing
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded bg-red-600 mx-2"></div>Overdue
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded bg-green-500 mx-2"></div>{" "}
              Completed
            </div>
          </div>
        </div>
        <div className="flex flex-wrap ">
          <div className="w-full lg:w-1/2 flex justify-center mx-auto">
            <TaskPieChart />
          </div>
          <div className="w-full  lg:w-1/2 flex">
            <Accordion />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
