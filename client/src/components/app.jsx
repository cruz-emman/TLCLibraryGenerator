import axios from "axios";
import React, { useState } from "react";

const App = () => {
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const upload = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("excel", file);

    setLoading(true);
    setError(null);

    try {
      await axios.post("http://localhost:5000/api/uploadLibrary2", formData);
      console.log("Uploaded Successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Error uploading file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={upload} encType="multipart/form-data">
        <input
          type="file"
          name="excel"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setError(null); // Clear previous error on file change
          }}
        />
        <button type="submit" value="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default App;
