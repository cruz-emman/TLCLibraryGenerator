import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SelectComponent from "@/components/SelectComponent";
import { Colleges, faculties, monthsArray, yearsArray } from "@/data";
import { Button } from "@/components/ui/button";
import { fetchUser } from "@/actions/apiActions";



const Sample = () => {
  
  const {isPending, isError, data: resultData, isFetching} = useQuery({
    queryKey: ['users'],
    queryFn: fetchUser,
  });


  const [data, setData] = useState({
    from: "",
    startYear: "",
    end: "",
    endYear: "",
    college: "",
    type: "",
  });

  const handleChange = (value, name) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = () => {
    fetchUser(data.from, data.startYear, data.end, data.endYear, data.type);
    console.log(resultData)

  };

  const handleClear = () => {
    // Clear functionality
  };


  if(isFetching) return <div> Loading...</div>



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
    <Button variant="default" onClick={handleClick}>
      Search
    </Button>
    <Button variant="secondary" onClick={handleClear}>
      Clear Filter
    </Button>
  </div>
  );
};

export default Sample;
