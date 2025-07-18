"use client";
import React, { useEffect, useState } from "react";
import { IoArrowForwardCircle } from "react-icons/io5";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaChevronCircleLeft } from "react-icons/fa";
export default function page() {
  const [taskList, setTaskList] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);
  const CreateTask = () => {
    console.log("Hey...........");

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      description: taskDescription,
      status: "Pending",
    };
    setTaskList([...taskList, newTask]);
    setTaskTitle("");
    setTaskDescription("");
  };

  const handleStatusChange = (id, newStatus) => {
    setTaskList(
      taskList.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem("tasks", JSON.stringify(taskList));
    }
  }, [taskList, hasLoaded]);

  useEffect(() => {
    const storedTask = localStorage.getItem("tasks");
    if (storedTask) {
      setTaskList(JSON.parse(storedTask));
    }
    setHasLoaded(true);
  }, []);

  const statuslist = ["Pending", "OnGoing", "Done"];
  const getStatusBgColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100";
      case "OnGoing":
        return "bg-blue-100";
      case "Done":
        return "bg-green-100";
      default:
        return "bg-gray-50";
    }
  };
  return (
    <div className="h-screen">
      <div className="flex flex-row gap-10 h-full bg-white">
        <div className="w-[25%] bg-white h-full shadow-xl p-2">
          <h1 className="text-center font-bold text-black ">Side Bar</h1>

          <div className="flex flex-col gap-2 ">
            <input
              className="border-2 border-gray-500 rounded-md w-full text-black p-1"
              placeholder="Task title"
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <textarea
              className="border-2 border-gray-500 rounded-md w-full text-black p-1 "
              placeholder="Task Description"
              type="text"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />

            <button
              onClick={CreateTask}
              className="bg-black text-white rounded-md w-full hover:bg-gray-500"
            >
              Create Task
            </button>
          </div>
        </div>
        <div className="w-[75%] h-full">
          <h1 className="text-center font-bold text-black">Board</h1>
          <div>
            {taskList.length === 0 ? (
              <div>
                <p className="text-black">There is no data 😶</p>
              </div>
            ) : (
              <div>
                <div className="flex flex-row gap-10 ">
                  {statuslist.map((list) => (
                    <div className="border-2 border-black  rounded-md p-2 w-[30%] ">
                      <p className="text-black text-center text-bold ">
                        {list}
                      </p>

                     

                      {taskList.filter((t) => t.status === list).length ===
                        0 && (
                        <>
                          {list === "Pending" && <p className="text-yellow-500"> No Pending Tasks </p>}
                          {list === "OnGoing" && <p  className="text-blue-500">No Ongoing Tasks </p>}
                          {list === "Done" && <p  className="text-green-500">No Done Tasks </p>}
                        </>
                      )}

                      {taskList
                        .filter((t) => t.status === list)
                        .map((task) => (
                          <div
                            key={task.id}
                            // className="border rounded p-2 mb-2 bg-gray-50"
                            className={`border rounded p-2 mb-2 ${getStatusBgColor(
                              task.status
                            )}`}
                          >
                            <p className="text-black font-semibold">
                              {task.title}
                            </p>
                            <p className="text-black ">{task.description}</p>
                            <p className="text-gray-600">
                              Status: {task.status}
                            </p>

                            {task.status === "Pending" && (
                              <>
                                <button
                                  onClick={() =>
                                    handleStatusChange(task.id, "OnGoing")
                                  }
                                  className="text-blue-500"
                                >
                                  {/* Move to OnGoing */}
                                  <FaChevronCircleRight />
                                </button>
                              </>
                            )}

                            {task.status === "OnGoing" && (
                              <div className="flex flex-row justify-between">
                                <button
                                  onClick={() =>
                                    handleStatusChange(task.id, "Pending")
                                  }
                                  className="text-yellow-500"
                                >
                                  {/* Move back to Pending */}
                                  <FaChevronCircleLeft />
                                </button>

                                <button
                                  onClick={() =>
                                    handleStatusChange(task.id, "Done")
                                  }
                                  className="text-green-500"
                                >
                                  {/* Move to Done */}
                                  <FaChevronCircleRight />
                                </button>
                              </div>
                            )}

                            {task.status === "Done" && (
                              <button
                                onClick={() =>
                                  handleStatusChange(task.id, "OnGoing")
                                }
                                className="text-blue-500 "
                              >
                                <FaChevronCircleLeft />
                              </button>
                            )}
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
