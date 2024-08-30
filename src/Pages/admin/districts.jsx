import { useState } from "react";
import InputField from "../../Components/inputField";
import { LuPlusCircle } from "react-icons/lu";
import { FaSpinner } from "react-icons/fa6";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storage } from "../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";

const Districts = () => {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [churchNames, setChurchNames] = useState([""]);
  const [imageUploads, setImageUploads] = useState([null]); // Array to store image uploads for each church
  const [imageUrls, setImageUrls] = useState([""]); // Array to store image URLs for each church
  const [imageRefPaths, setImageRefPaths] = useState([""]); // Array to store image reference paths for each church

  const handleChurchNameChange = (index, event) => {
    const newChurchNames = [...churchNames];
    newChurchNames[index] = event.target.value;
    setChurchNames(newChurchNames);
  };

  const handleAddChurch = () => {
    setChurchNames([...churchNames, ""]);
    setImageUploads([...imageUploads, null]);
    setImageUrls([...imageUrls, ""]);
    setImageRefPaths([...imageRefPaths, ""]);
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

    const newImageRefPaths = [...imageRefPaths];
    newImageRefPaths.splice(index, 1);
    setImageRefPaths(newImageRefPaths);

    // Perform Firebase operations if necessary
    if (imageRefPaths[index]) {
      const imageRef = ref(storage, imageRefPaths[index]);

      deleteObject(imageRef)
        .then(() => {
          console.log("Image deleted successfully from Firebase Storage.");
          toast.success("Church and associated image deleted successfully!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        })
        .catch((error) => {
          console.error("Failed to delete image from Firebase Storage:", error);
          toast.error("Failed to delete image!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        });
    }
  };

  const uploadImage = (index) => {
    if (imageUploads[index] == null) return;

    const imageRef = ref(storage, `${imageUploads[index].name + v4()}`);
    uploadBytes(imageRef, imageUploads[index])
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            const newImageUrls = [...imageUrls];
            newImageUrls[index] = url;
            setImageUrls(newImageUrls);

            const newImageRefPaths = [...imageRefPaths];
            newImageRefPaths[index] = imageRef.fullPath;
            setImageRefPaths(newImageRefPaths);

            toast.success("Image uploaded successfully!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
            });
          })
          .catch((error) => {
            console.error("Failed to retrieve image URL:", error);
          });
      })
      .catch((error) => {
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
      });
  };

  const changeImage = (index) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = "";
    setImageUrls(newImageUrls);

    const newImageUploads = [...imageUploads];
    newImageUploads[index] = null;
    setImageUploads(newImageUploads);
  };

  const deleteImage = (index) => {
    if (imageRefPaths[index]) {
      const imageRef = ref(storage, imageRefPaths[index]);
      deleteObject(imageRef)
        .then(() => {
          const newImageUrls = [...imageUrls];
          newImageUrls[index] = "";
          setImageUrls(newImageUrls);

          const newImageUploads = [...imageUploads];
          newImageUploads[index] = null;
          setImageUploads(newImageUploads);

          const newImageRefPaths = [...imageRefPaths];
          newImageRefPaths[index] = "";
          setImageRefPaths(newImageRefPaths);

          toast.success("Image deleted successfully!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        })
        .catch((error) => {
          console.error("Failed to delete image:", error);
          toast.error("Failed to delete image!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let trimmedName = name.replace(/\s+/g, "");
    const districtRegex = /district/i;
    if (districtRegex.test(trimmedName)) {
      trimmedName = trimmedName.replace(districtRegex, "District");
    } else {
      trimmedName = trimmedName.concat("District");
    }

    const trimmedChurchNames = churchNames.map((churchName) =>
      churchName.replace(/\s+/g, "")
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
      setImageRefPaths([""]);
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
                      <button
                        type="button"
                        className="bg-red-600 text-white text-sm py-2 px-3 rounded-sm shadow-md font-poppins"
                        onClick={() => deleteImage(index)}
                      >
                        Delete Image
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
                        {isSubmitting ? (
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
            {isSubmitting ? (
              <FaSpinner color="white" className="animate-spin" />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Districts;
