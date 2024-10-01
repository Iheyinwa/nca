import { useState } from "react";
import InputField from "../../Components/inputField";
import { LuPlusCircle } from "react-icons/lu";
import { FaSpinner } from "react-icons/fa6";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Districts = () => {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [churchNames, setChurchNames] = useState([""]);
  const [imageUploads, setImageUploads] = useState([null]); // Array to store image uploads for each church
  const [imageUrls, setImageUrls] = useState([""]); // Array to store image URLs for each church

  const handleChurchNameChange = (index, event) => {
    const newChurchNames = [...churchNames];
    newChurchNames[index] = event.target.value;
    setChurchNames(newChurchNames);
  };

  const handleAddChurch = () => {
    setChurchNames([...churchNames, ""]);
    setImageUploads([...imageUploads, null]);
    setImageUrls([...imageUrls, ""]);
  };

  const handleDeleteChurch = (index) => {
    const newChurchNames = [...churchNames];
    newChurchNames.splice(index, 1);
    setChurchNames(newChurchNames);

    const newImageUploads = [...imageUploads];
    newImageUploads.splice(index, 1);
    setImageUploads(newImageUploads);

    const newImageUrls = [...imageUrls];
    newImageUrls.splice(index, 1);
    setImageUrls(newImageUrls);

    // Handle image deletion in Cloudinary if necessary
    // You can use Cloudinary's API to delete images if required
  };

  const uploadImage = async (index) => {
    if (imageUploads[index] == null) return;
    const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;
    const cloudName = import.meta.env.VITE_CLOUD_NAME;

    const formData = new FormData();
    formData.append("file", imageUploads[index]);
    formData.append("upload_preset", uploadPreset);
    formData.append("cloud_name", cloudName); // Replace with your Cloudinary cloud name
    setIsUploading(true);
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, // Replace with your Cloudinary API URL
        formData
      );

      const newImageUrls = [...imageUrls];
      newImageUrls[index] = response.data.secure_url; // Use the secure URL from Cloudinary response
      setImageUrls(newImageUrls);

      toast.success("Image uploaded successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Failed to upload image!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const changeImage = (index) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = "";
    setImageUrls(newImageUrls);

    const newImageUploads = [...imageUploads];
    newImageUploads[index] = null;
    setImageUploads(newImageUploads);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let trimmedName = name.trim(); // Just trim extra spaces around, not inside

    const districtRegex = /district/i;
    if (districtRegex.test(trimmedName)) {
      trimmedName = trimmedName.replace(districtRegex, "District");
    } else {
      trimmedName = trimmedName.trim();
    }

    const trimmedChurchNames = churchNames.map((churchName) =>
      churchName.trim()
    );

    // Prepare data including image URLs
    const data = { name: trimmedName };
    const churchesData = trimmedChurchNames.map((churchName, index) => ({
      name: churchName,
      amount: 0,
      votes: 0,
      imageUrl: imageUrls[index] || "",
    }));
    data.churches = churchesData;

    try {
      const districtRef = doc(db, "districtData", data.name);

      await setDoc(districtRef, {}, { merge: true });
      for (const churchData of churchesData) {
        const churchRef = doc(districtRef, "churches", churchData.name);

        await setDoc(churchRef, churchData, { merge: true });
      }
      setName("");
      setChurchNames([""]);
      setImageUploads([null]);
      setImageUrls([""]);
      setIsSubmitting(false);
      toast.success("Update Successful!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      window.location.reload();
    } catch (e) {
      console.error(e);
      toast.error("An error occurred!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  return (
    <section className="m-4 h-full">
      <form onSubmit={handleSubmit} className="p-4">
        <InputField
          type="text"
          title="Enter your district name"
          note="Eg. Ikorodu District"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <hr className="my-2" />

        {churchNames.map((churchName, index) => (
          <section key={index} className="flex flex-col gap-4 my-2">
            <p className="font-semibold text-xl font-poppins">
              Church {index + 1}
            </p>
            <div className="flex items-center gap-2">
              <div className="">
                {imageUrls[index] ? (
                  <div>
                    <img
                      src={imageUrls[index]}
                      alt="Uploaded"
                      className="h-32 rounded-md shadow-md object-cover"
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        type="button"
                        className="bg-yellow-500 text-white text-sm py-2 px-3 rounded-sm shadow-md font-poppins"
                        onClick={() => changeImage(index)}
                      >
                        Change Image
                      </button>
                    </div>
                  </div>
                ) : (
                  <label
                    htmlFor={`upload-image-${index}`}
                    className="flex flex-col gap-2 items-center justify-center h-32 text-sm font-poppins cursor-pointer rounded-md"
                  >
                    <input
                      type="file"
                      id={`upload-image-${index}`}
                      onChange={(event) => {
                        const newImageUploads = [...imageUploads];
                        newImageUploads[index] = event.target.files[0];
                        setImageUploads(newImageUploads);
                      }}
                    />
                    {imageUploads[index] && !imageUrls[index] && (
                      <button
                        type="button"
                        className="bg-blue-500 text-white py-2 px-3 rounded-md shadow-md font-poppins"
                        onClick={() => uploadImage(index)}
                      >
                        {isUploading ? (
                          <FaSpinner className="animate-spin" />
                        ) : (
                          "Upload Image"
                        )}
                      </button>
                    )}
                  </label>
                )}
              </div>
              <InputField
                type="text"
                title={`Church ${index + 1} name`}
                value={churchName}
                onChange={(e) => handleChurchNameChange(index, e)}
              />
              {churchNames.length > 1 && (
                <button
                  type="button"
                  className="bg-red-500 text-white py-2 px-4 rounded-md shadow-md font-poppins"
                  onClick={() => handleDeleteChurch(index)}
                >
                  Delete
                </button>
              )}
            </div>
            <hr />
          </section>
        ))}

        <div className="flex justify-start gap-2 items-center">
          <LuPlusCircle size={25} color="#9ca3af" />
          <button
            type="button"
            className="text-gray-400 text-xl font-poppins"
            onClick={handleAddChurch}
          >
            Add another church
          </button>
        </div>

        <div className="flex justify-end">
          <button className="bg-green-600 border-green-600 text-white py-2 px-4 rounded text-xl font-poppins">
            {isSubmitting ? <FaSpinner className="animate-spin" /> : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Districts;
