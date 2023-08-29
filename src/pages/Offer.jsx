import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Offer = ({ userToken }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <section className="section-offer">
      <img
        className="img-offer"
        src={data.product_image.secure_url}
        alt={data.product_name}
      />
      <p>{data.product_price} €</p>
      {data.product_details.map((detail, index) => {
        const keys = Object.keys(detail);
        // console.log(keys);
        const key = keys[0];
        console.log(key);
        return (
          <p key={index}>
            {key} : {detail[key]}
          </p>
        );
      })}
      {userToken ? (
        <Link
          className="button-primary"
          to="/payment"
          state={{ title: data.product_name, price: data.product_price }}
        >
          Acheter
        </Link>
      ) : (
        <Link className="button-primary" to="/login">
          <span>Achetez</span>
        </Link>
      )}
    </section>
  );
};

export default Offer;
