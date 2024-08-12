import { Button, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile , setImageFile] = useState(null);
  const [imageFileUrl , setImageFileUrl] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file))
    }

  }
  return (
    <div className="mx-w-lg mx-auto p-3 w-full">
      <h1 className="text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
          />
        </div>
        <TextInput id="username" placeholder="username" defaultValue={currentUser.username}/>
        <TextInput id="email" placeholder="email" defaultValue={currentUser.email}/>
        <TextInput id="password" placeholder="************"/>
        <Button type="submit" gradientDuoTone='purpleToBlue' outline >
            Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-4">
        <span className="cursor-pointer" >Delete Account</span>
        <span className="cursor-pointer mr-3" >Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
