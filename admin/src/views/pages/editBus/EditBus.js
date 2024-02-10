import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  CForm,
  CInputGroup,
  CRow,
  CFormLabel,
  CCol,
  CFormCheck,
  CFormInput,
  CButton,
  CImage,
  CInputGroupText,
} from "@coreui/react";
import { toast, Toaster } from "react-hot-toast";
// const Bike ={
//     "docid": "72OyBqLgOSBEQSmcfSTq",
//     "passanger": 2,
//     "transmission": "M",
//     "rate": 400,
//     "description": "Manual Transmission without boot",
//     "img": "https://firebasestorage.googleapis.com/v0/b/Bikerental-3c8cf.appspot.com/o/Bikes%2Ftvs-apache.webp?alt=media&token=83600cdf-847a-48f8-9eeb-4bade2e0677f",
//     "cc": 160,
//     "name": "Apache",
//     "brand": "TVS",
//     "id": 12
// };
const EditBike = () => {
  const location = useLocation();
  const Bike = location.state;

  // const [passenger, setPassenger] = useState(Bike.passenger);
  const [transmission, setTransmission] = useState(Bike?.transmission || "");
  const [rate, setRate] = useState(Bike?.rate || "");
  const [description, setDescription] = useState(Bike?.description || "");
  const [cc, setCc] = useState(Bike?.cc || "");
  const [name, setName] = useState(Bike?.name || "");
  const [brand, setBrand] = useState(Bike?.brand || "");
  const [image, setImage] = useState(Bike?.img || "");
  const [inputImage, setInputImage] = useState(null);
  // const [id, setId] = useState(Bike.id);
  let updatedBike;
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputImage) {
      console.log(inputImage);
      const formData = new FormData();
      formData.append("image", inputImage);

      try {
        const response = await fetch("http://localhost:4000/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setImage(data.url);
          console.log("Image URL:", image);
          updatedBike = {
            passanger: 2,
            transmission: transmission,
            rate: rate,
            description: description,
            img: data.url,
            cc: cc,
            name: name,
            brand: brand,
          };
          console.log(updatedBike);
        } else {
          console.error("Image upload failed");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      updatedBike = {
        passanger: 2,
        transmission: transmission,
        rate: rate,
        description: description,
        cc: cc,
        img: image,
        name: name,
        brand: brand,
        id: Bike.id,
      };
      console.log(updatedBike);
    }

    try {
      const response = await fetch(
        `http://localhost:4000/Bikeupdate/${Bike.docid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBike),
        }
      );

      if (response.ok) {
        console.log("Bike updated successfully");
        toast.success("Bike Updated Successfully");

        // Perform any additional actions or navigate to another page
      } else {
        const errorData = await response.json();
        console.error("Error updating Bike:", errorData.message);
        // Handle the error appropriately
      }
    } catch (error) {
      console.error("Error updating Bike:", error);
      // Handle the error appropriately
    }
  };

  return (
    <div>
      <Toaster toastOptions={{ duration: 4000 }} />
      <h2>Edit Bike</h2>

      <CForm className="row g-3" onSubmit={handleSubmit}>
        <CCol md={3}>
          <CImage rounded thumbnail src={image} width={200} height={200} />
        </CCol>
        <CCol md={9}>
          {" "}
          <CInputGroup className="mb-3">
            <CFormInput
              type="file"
              id="inputImage"
              onChange={(e) => setInputImage(e.target.files[0])}
            />
            <CInputGroupText component="label" htmlFor="inputImage">
              Upload
            </CInputGroupText>
          </CInputGroup>
        </CCol>

        <CCol md={6}>
          <CFormInput
            type="text"
            id="inputName"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </CCol>
        <CCol md={6}>
          <CFormInput
            type="text"
            id="inputBrand"
            label="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </CCol>

        <CCol md={6}>
          <CFormInput id="inputPass" label="Passanger" value={2} />
        </CCol>
        <CCol md={6}>
          <CFormInput
            type="number"
            id="inputCc"
            label="CC"
            value={cc}
            onChange={(e) => setCc(e.target.value)}
          />
        </CCol>
        <CCol md={6}>
          <CFormInput
            type="text"
            id="inputTrans"
            label="Transmission"
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
          />
        </CCol>

        <CCol md={6}>
          <CFormInput
            type="number"
            id="rate"
            label="Rate"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </CCol>
        <CCol xs={12}>
          <CFormInput
            type="textarea"
            id="description"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </CCol>
        <CCol xs={12}>
          <CButton type="submit">Save</CButton>
        </CCol>
      </CForm>
    </div>
  );
};

export default EditBike;
