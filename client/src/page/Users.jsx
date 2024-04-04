import { FormUpload } from "@/components/FormUpload";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios"; // Import axios if not already imported
import { useToast } from "@/components/ui/use-toast";
import { makeArrayToSmall, readAsBinaryString } from "@/lib/upload-service";
import users1 from '../assets/users1.png'
import users2 from '../assets/users2.png'

const Users = () => {
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [type, setType] = useState();
  const [college, setCollege] = useState();

  const { toast } = useToast();

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const Submit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = await readAsBinaryString(file);
      let readedData = XLSX.read(data, { type: "binary" });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      // Ensure formData is defined before using it
      const formData = new FormData();
      formData.append("excel", file);

      await axios.post("http://localhost:5000/api/uploadUser", formData);
      toast({
        title: "File Uploaded Successfully",
      });
    } catch (error) {
      toast({
        title: 'Error reading/uploading file. Please try again.'
      });
      setError("Error reading/uploading file. Please try again.");
     
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <FormUpload
        title="Upload TLC Users"
        dialogTitle="Upload TLC Users"
        description="You are trying to upload .xslx files, are you sure that your
        header in your excel file is like this" 
        image1={users1}
        image2={users1}
        Submit={Submit}
        handleChange={handleChange}
        loading={loading}
      />
    </div>
  );
};

export default Users;
