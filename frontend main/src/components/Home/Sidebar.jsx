import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
import { useDispatch } from "react-redux";
import axios from "axios";

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const data = [
    {
      title: "All Tasks",
      icon: <CgNotes />,
      link: "/",
    },
    {
      title: "Important Tasks",
      icon: <MdLabelImportant />,
      link: "/importantTasks",
    },
    {
      title: "Completed Tasks",
      icon: <FaCheckDouble />,
      link: "/completedTasks",
    },
    {
      title: "Incompleted Tasks",
      icon: <TbNotebookOff />,
      link: "/incompletedTasks",
    },
  ];

  const [Data, setData] = useState();

  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    history("/signup");
  };

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v2/get-all-tasks",
        { headers }
      );
      setData(response.data.data);
    };
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetch();
    }
  }, []);

  return (
    <div className="p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 h-screen">
      {Data && (
        <div className="p-4 mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-white">{Data.username}</h2>
          <h4 className="text-sm text-gray-200">{Data.email}</h4>
          <hr className="my-2 border-gray-500" />
        </div>
      )}
      <div>
        {data.map((items, i) => (
          <Link
            to={items.link}
            key={i}
            className="my-2 flex items-center p-2 rounded bg-gradient-to-r from-gray-800 to-gray-600 text-white hover:bg-gradient-to-l hover:from-gray-700 hover:to-gray-500 transition-all duration-300"
          >
            {items.icon} &nbsp; {items.title}
          </Link>
        ))}
      </div>
      <div className="mt-4">
        <button
          className="bg-gradient-to-r from-teal-500 to-blue-500 w-full p-2 rounded text-white hover:from-blue-500 hover:to-teal-500 transition duration-300"
          onClick={logout}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
