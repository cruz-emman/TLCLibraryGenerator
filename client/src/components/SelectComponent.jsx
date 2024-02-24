import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Colleges, monthsArray, yearsArray } from "@/data";


const SelectComponent = ({
    data,
    setData,
    title,
    name,
    handleChange,
    label,
    dataArray,
    

}) => {
    
  return (
    <div>
        <Select
          value={data.end}
          onValueChange={(value) => handleChange(value, name)}
          name={name}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={title} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{label}</SelectLabel>
              {dataArray.map((item, index) => (
                <SelectItem key={index} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
    </div>
  )
}

export default SelectComponent