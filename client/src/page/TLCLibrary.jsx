import { FormUpload } from '@/components/FormUpload';
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios'; // Import axios if not already imported
import { useToast } from "@/components/ui/use-toast"
import { makeArrayToSmall, readAsBinaryString } from '@/lib/upload-service';
import { headerTLC } from '@/data';
import tlclibrary1 from "../assets/capture.png";
import tlclibrary2 from '../assets/capture1.png'

const TLCLibrary  = () => {
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const { toast } = useToast()

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const Submit = async (e) => {
    e.preventDefault();

    setLoading(true);



    try {
      const data = await readAsBinaryString(file);
      let readedData = XLSX.read(data, { type: 'binary' });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 })[0];
      const checkHeader = [
        "time",
        "userfullname",
        "affecteduser",
        "eventcontext",
        "component",
        "eventname",
        "description",
        "origin",
        "ipaddress",
      ];




      let resultArray = makeArrayToSmall(dataParse);

      //header is not converted that is why not working/
      if (JSON.stringify(resultArray) === JSON.stringify(checkHeader)) {
        // Ensure formData is defined before using it
        const formData = new FormData();
        formData.append("excel", file);


        await axios.post("http://localhost:5000/api/uploadLibrary2", formData);
        toast({
          title: "File Uploaded Successfully"
        })
      } else {
        toast({
          title: 'Invalid header in the Excel file'
        })
        setError("Invalid header in the Excel file");
      }
    } catch (error) {
      toast({
        title: 'Error reading/uploading file. Please try again.'
      })
      setError("Error reading/uploading file. Please try again.");
      
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className='flex flex-col'>
      <FormUpload 
          title="Upload TLC Library"
          dialogTitle="Upload TLC Library"
          description="You are trying to upload .xslx files, are you sure that your
          header in your excel file is like this"
          image1={tlclibrary1}
          image2={tlclibrary2}
          Submit={Submit} 
          handleChange={handleChange}  
          loading={loading}/>
    </div> 
  );
};

export default TLCLibrary;
