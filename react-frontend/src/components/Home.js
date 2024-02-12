import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../firebase/Auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { Link } from "react-router-dom";
import { getAuth } from 'firebase/auth';

const Home = () => {
  const currentUser = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const storage = getStorage();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const auth = getAuth();
    if (currentUser) {
      setUserName(currentUser.displayName);
    }
  }
  , [currentUser]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && ["image/jpeg", "image/png", "image/jpg", "image/bmp", "image/webp"].includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      alert("Unsupported file type. Please select an image.");
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!currentUser) {
      alert("Please log in to upload files.");
      return;
    }

    if (file) {
      const storageRef = ref(storage, `clothes/${currentUser.uid}/${file.name}`);
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log("Uploaded a blob or file!", snapshot);
        alert("File uploaded successfully!");
      }).catch((error) => {
        console.error("Error uploading file:", error);
        alert("Error uploading file.");
      });
    }
  };

  return (
    <div>
        <div style={{float: "right"}}>
        {currentUser ? (
          <span>Welcome, {currentUser.displayName || 'User'}</span>
        ) : (
          <>
            <Link to="/register">Sign Up</Link>
            {" | "}
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
      <h1>Welcome to your AI Closet</h1>
      <p>Please upload your clothes</p>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>Supported formats: .jpg, .png, .jpeg, .bmp, .webp</p>
    </div>
  );
};

export default Home;
