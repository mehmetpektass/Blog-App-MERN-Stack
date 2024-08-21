import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { CircularProgressbar } from "react-circular-progressbar";

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [uploadImageError, setUploadImageError] = useState(null);
  const [imageUploadProgress , setImageUploadProgress] = useState(null);
  const [formData , setFormData] = useState({});

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setUploadImageError("Please chose an image");
        return;
      }
      setUploadImageError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setUploadImageError(
            "Could not Upload Image (File Must Be less then 2MB)"
          );
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadProgress(null);
            setFormData({...formData , image:downloadURL})
          });
        }
      );
    } catch (error) {
        console.log(error);
        setImageUploadProgress(null);
        setUploadImageError('Image Upload Faild')
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} >
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) => setFormData({...formData , title: e.target.value})}
          />
          <Select onChange={(e) => setFormData({...formData , category:e.target.value})}>
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
                <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : ('Upload Image')}
          </Button>
        </div>
        {formData.image && (
            <img src={formData.image} alt='Upload' className="w-44 h-44 rounded-full self-center" />
        )}
         {uploadImageError && (
            <Alert color='failure' >{uploadImageError}</Alert>
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange={(e) => setFormData({...formData , content: e.target.value})}
        />
        <Button type="submit" gradientDuoTone="purpleToPink" outline>
          Publish
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
