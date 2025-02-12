import React, { useEffect, useState } from "react";
import Cards from "../components/Home/Cards";
import axios from "axios";

const ImportantTasks = () => {
  const [Data, setData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v2/get-imp-tasks",
        { headers }
      );
      setData(response.data.data);
    };
    fetch();
  });
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center my-4">Important Tasks</h1>
      <Cards home={"false"} data={Data} />
    </div>
  );
};

export default ImportantTasks;
