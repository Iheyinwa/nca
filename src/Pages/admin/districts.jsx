import { useState } from "react";
import InputField from "../../Components/inputField";
import { LuPlusCircle } from "react-icons/lu";
import { FaSpinner } from "react-icons/fa6";
import { db } from "../../firebase"; 
import { doc, setDoc} from "firebase/firestore";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Districts = () => {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [churchNames, setChurchNames] = useState([""]);

  const handleChurchNameChange = (index, event) => {
    const newChurchNames = [...churchNames];
    newChurchNames[index] = event.target.value;
    setChurchNames(newChurchNames);
  };

  const handleAddChurch = () => {
    setChurchNames([...churchNames, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true)

    // Remove whitespaces from the district name and each church name
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

    const data = { name: trimmedName, churchNames: trimmedChurchNames };
    console.log(trimmedChurchNames)
    console.log(data);

    //Handle updating data
    try{
      const districtRef = doc(db, "districtData", data.name);

          // Create or update the district document
      await setDoc(districtRef, {}, { merge: true });
      for (const churchName of trimmedChurchNames) {
        const churchRef = doc(districtRef, "churches", churchName);

        // Create or update each church document in the subcollection
        await setDoc(
          churchRef,
          {
            name: churchName,
            amount: 0,
            votes: 0,
          },
          { merge: true }
        );
        setName("");
        setChurchNames([""]);
        setIsSubmitting(false);
      }
      toast.success("Update Successful !", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      window.location.reload();
    } catch (e){
      console.error(e)
      toast.error("An error occurred !", {
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

        {churchNames.map((churchName, index) => (
          <InputField
            key={index}
            type="text"
            title={`Enter church name ${index + 1}`}
            value={churchName}
            onChange={(e) => handleChurchNameChange(index, e)}
          />
        ))}

        <div className="flex justify-start gap-2 items-center">
          <LuPlusCircle size={25} color="#9ca3af" />
          <button
            type="button" // Prevent form submission on click
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
