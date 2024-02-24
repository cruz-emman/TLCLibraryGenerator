import axios from "axios";
import { ApiRequest } from "./apiCall";
import useUserResultStore from "@/services/store";

export const uploadFileTLCUsers = async (formData) => {
  try {
    await axios.post("http://localhost:5000/api/uploadLibrary2", formData);
    return true;
  } catch (error) {
    throw error;
  }
};


export const sampleQuery = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/result?from=8&end=10&year=23&type=STUDENTS`)
    console.log(response.data)
    return response.data;
  } catch (error) {
    // Handle errors here if needed
    console.log(error)
  }
};

export const getUserResult = async (from, end, startYear, endYear , type) => {
  
  try {
    const response = await axios.get(`http://localhost:5000/api/result?from=${from}&startYear=${startYear}&end=${end}&endYear=${endYear}&type=${type}`)
    return response.data;
  } catch (error) {
    // Handle errors here if needed
    console.log(error)
  }
};

export async function fetchUser(from, end, startYear, endYear, type) {
  const response = await fetch(`http://localhost:5000/api/result?from=${from}&startYear=${startYear}&end=${end}&endYear=${endYear}&type=${type}`);
  console.log(response)
  return response.json();
}
