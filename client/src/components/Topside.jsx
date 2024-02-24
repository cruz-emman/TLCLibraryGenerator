import React, { useState } from "react";
import { Colleges, faculties, monthsArray, yearsArray } from "@/data";
import { Button } from "./ui/button";
import SelectComponent from "./SelectComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUserResultStore from "@/services/store";

const Topside = () => {
  const navigate = useNavigate();

  const { userResults, setUserResults, clearUserResults, loading, setLoading, setTotalUsers, totalUsers, clearTotalUsers } =
    useUserResultStore();

  const [data, setData] = useState({
    from: "",
    startYear: "",
    end: "",
    endYear: "",
    college: "",
    type: "",
  });

  const getUserResult = async (from, end, startYear, endYear, type) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/result?from=${from}&startYear=${startYear}&end=${end}&endYear=${endYear}&type=${type}`
      );


      const responseTotalData = await axios.get(`http://localhost:5000/api/result/table?from=${from}&startYear=${startYear}&end=${end}&endYear=${endYear}&type=${type}`)

      //this is the month needs to render as a header
      setTotalUsers(responseTotalData.data)
      setUserResults(response.data);
    } catch (error) {
      // Handle errors here if needed
      console.log(error);
    } 
    finally {
      // Set loading state to false when the API call is complete (success or error)
      setLoading(false);
    }
  };

  const handleClick = () => {
    // Do something with userResults if needed
    getUserResult(data.from,  data.end,  data.startYear,data.endYear,  data.type);
  };

  const handleChange = (value, name) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = async () => {
    clearUserResults();
    clearTotalUsers()
    setData({
      from: "",
      startYear: "",
      end: "",
      endYear: "",
      college: "",
      type: "",
    });

    navigate(0);
  };

  return (
    <div className="flex items-center w-full gap-5">
      {/* Start Month */}
      <SelectComponent
        title="Start Of Month"
        name="from"
        handleChange={handleChange}
        label="Month"
        dataArray={monthsArray}
        data={data.from}
        setData={setData}
      />

      <SelectComponent
        title="Year"
        name="startYear"
        handleChange={handleChange}
        label="Year"
        dataArray={yearsArray}
        data={data.startYear}
        setData={setData}
      />

      <p>To</p>

      {/* End Month */}
      <SelectComponent
        title="End Of Month"
        name="end"
        handleChange={handleChange}
        label="Month"
        dataArray={monthsArray}
        data={data.end}
        setData={setData}
      />

      {/* Year */}
      <SelectComponent
        title="Year"
        name="endYear"
        handleChange={handleChange}
        label="End Year"
        dataArray={yearsArray}
        data={data.endYear}
        setData={setData}
      />

      {/* Colleges */}
      <SelectComponent
        title="College"
        name="college"
        handleChange={handleChange}
        label="Month"
        dataArray={Colleges}
        data={data.college}
        setData={setData}
      />

      {/* Types */}
      <SelectComponent
        title="Type"
        name="type"
        handleChange={handleChange}
        label="Type"
        dataArray={faculties}
        data={data.type}
        setData={setData}
      />

      {/* Button */}
      <Button disabled={loading} variant="default" onClick={handleClick}>
        {loading ? 'Searching...': "Search"}
      </Button>
      <Button variant="secondary" onClick={handleClear}>
        Clear Filter
      </Button>
    </div>
  );
};

export default Topside;
