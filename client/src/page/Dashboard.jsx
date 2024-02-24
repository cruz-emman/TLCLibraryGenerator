import Botside from "@/components/Botside";
import Topside from "@/components/Topside";
import React, { useState } from "react";
import { addDays, format } from "date-fns";

const Dashboard = () => {
  


  return (
    <div className="flex flex-col w-full gap-5 mx-auto">
      <Topside  />
      <Botside />
    </div>
  );
};

export default Dashboard;
