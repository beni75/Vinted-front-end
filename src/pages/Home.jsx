import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = ({ search, sortByPriceAscending, loader }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sortParam = sortByPriceAscending ? "price-asc" : "price-desc";

        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}&sort=${sortParam}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [search, sortByPriceAscending]);

  return isLoading ? (
    <section style={{ height: "100vh" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loader}
      </div>
    </section>
  ) : (
    <>
      <section className="section-home">
        <h1>Prêts à faire du tri dans vos placards ?</h1>
      </section>

      <section className="grid-container">
        {data.offers.map((offer) => {
          return (
            <Link key={offer._id} to={`/offer/${offer._id}`}>
              <div className="grid-item">
                <span>{offer.owner.account.username}</span>
                <img
                  className="img-product"
                  src={offer.product_image.secure_url}
                  alt="product_image"
                />
                <span>{offer.product_price}</span>
                {offer.product_details.map((details, index) => {
                  return (
                    <div key={index}>
                      <span>{details.MARQUE}</span>
                      <span>{details.TAILLE}</span>
                    </div>
                  );
                })}
              </div>
            </Link>
          );
        })}
      </section>
    </>
  );
};

export default Home;
