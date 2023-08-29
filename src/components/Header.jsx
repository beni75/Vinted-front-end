import { useState } from "react";
import Switch from "react-switch";
import { Link } from "react-router-dom";

const Header = ({ handleToken, userToken, search, setSearch, handleSort }) => {
  const [sortByPriceAscending, setSortByPriceAscending] = useState(false);

  const handleToggleSort = () => {
    const newSortValue = !sortByPriceAscending;
    setSortByPriceAscending(newSortValue);
    handleSort(newSortValue);
  };

  return (
    <header className="header-wrapper">
      <div className="header-top-container">
        <div>
          <Link to="/">
            <img
              className="logo-vinted"
              src="https://lereacteur-vinted.netlify.app/static/media/logo.10b0caad793dd0a8ea72.png"
              alt="logo vinted"
            />
          </Link>
        </div>
        <div className="header-link-container">
          {!userToken ? (
            <>
              <Link to="/signup">
                <button className="button-primary">S'inscrire</button>
              </Link>

              <Link to="/login">
                <button className="button-primary">Se connecter</button>
              </Link>
              <Link to="/login">
                <button className="button-secondary">Vends tes articles</button>
              </Link>
            </>
          ) : (
            <>
              <button
                className="button-deconnect"
                onClick={() => {
                  handleToken();
                }}
              >
                Se déconnecter
              </button>

              <Link to="/publish">
                <button className="button-secondary">Vends tes articles</button>
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="header-bottom-container">
        <div className="header-sort-container">
          <span> Trier par prix :</span>
          <Switch onChange={handleToggleSort} checked={sortByPriceAscending} />
        </div>
        <div>
          <input
            className="header-search-input"
            type="text"
            value={search}
            placeholder="Rechercher des articles"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
