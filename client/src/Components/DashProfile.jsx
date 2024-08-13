import { Alert, Button, TextInput } from "flowbite-react";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase.js'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress , setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError , setImageFileUploadError] = useState(null);
  
  
  const filePickerRef = useRef();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    

    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage , fileName);
    const uploadTask = uploadBytesResumable(storageRef , file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = 
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0))
      },
      (error) => {
        setImageFileUploadError('Could not Upload Image (File Must Be less then 2MB)')
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL)
        })
      }
    )
  }
  else{
    setImageFileUploadError("No file selected");
  }
  };

  console.log(imageFileUploadProgress)


  return (
    <div className="mx-w-lg mx-auto p-3 w-full">
      <h1 className="text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
          ref={filePickerRef}
        />
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
          />
        </div>
        {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}
        <TextInput
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <TextInput id="password" placeholder="************" />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-4">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer mr-3">Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
