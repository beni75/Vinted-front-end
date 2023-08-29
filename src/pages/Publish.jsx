import { useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { Navigate } from "react-router-dom";

const Publish = ({ userToken }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [picture, setPicture] = useState(null);

  const [imgFromCloudinary, setImgFromCloudinary] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      // Rajouter les paires clef/valeur à mon formdata
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("picture", picture);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImgFromCloudinary(response.data.secure_url);
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return userToken ? (
    <div className="section-publish">
      <h1>Vends tes articles</h1>

      <form onSubmit={handleSubmit}>
        <Dropzone onDrop={(acceptedFiles) => setPicture(acceptedFiles[0])}>
          {({ getRootProps, getInputProps }) => (
            <div className="dropzone" {...getRootProps()}>
              <input {...getInputProps()} />
              {picture ? (
                <div>
                  <img
                    style={{ width: "100px" }}
                    src={URL.createObjectURL(picture)}
                    alt="Preview"
                  />
                  <button onClick={() => setPicture(null)}>Supprimer</button>
                </div>
              ) : (
                <button>Ajoutez/glissez des photos</button>
              )}
            </div>
          )}
        </Dropzone>
        <br />
        <span>Titre</span>
        <input
          type="text"
          placeholder="ex: Chemise Sézane verte"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <hr />
        <span>Décris ton article</span>
        <input
          type="text"
          placeholder="ex: porté quelques fois, taille correctement"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <hr />
        <span>Marque</span>
        <input
          type="text"
          placeholder="ex: Zara"
          onChange={(event) => {
            setBrand(event.target.value);
          }}
        />
        <hr />
        <span>Taille</span>
        <input
          type="text"
          placeholder="ex: L / 42"
          onChange={(event) => {
            setSize(event.target.value);
          }}
        />
        <hr />
        <span>Couleur</span>
        <input
          type="text"
          placeholder="ex: verte"
          onChange={(event) => {
            setColor(event.target.value);
          }}
        />
        <hr />
        <span>Etat</span>
        <input
          type="text"
          placeholder="Neuf avec étiquette"
          onChange={(event) => {
            setCondition(event.target.value);
          }}
        />
        <hr />
        <span>Lieu</span>
        <input
          type="text"
          placeholder="ex: Paris"
          onChange={(event) => {
            setCity(event.target.value);
          }}
        />
        <hr />
        <span>Prix</span>
        <input
          type="number"
          placeholder="0,00€"
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />
        <button className="button-primary" type="submit">
          Ajoutez
        </button>
      </form>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
