import React from "react";
import "../../App.css";

const Product = () => {
  return (
    <div>
      <div className="split left">
        <div className="centered">
          <img
            className="img-1"
            src="https://i.pinimg.com/736x/86/c1/ac/86c1ac8bac43ea337f7fe9da5c87a7fd.jpg"
            alt="Avatar woman"
          />
        </div>
        <div className="img-container">
          <img
            className="img-3"
            src="https://i.pinimg.com/736x/86/c1/ac/86c1ac8bac43ea337f7fe9da5c87a7fd.jpg"
          />
          <img
            className="img-3"
            src="https://i.pinimg.com/736x/86/c1/ac/86c1ac8bac43ea337f7fe9da5c87a7fd.jpg"
          />
          <img
            className="img-3"
            src="https://i.pinimg.com/736x/86/c1/ac/86c1ac8bac43ea337f7fe9da5c87a7fd.jpg"
          />
          <img
            className="img-3"
            src="https://i.pinimg.com/736x/86/c1/ac/86c1ac8bac43ea337f7fe9da5c87a7fd.jpg"
          />
        </div>
      </div>

      <div className="split right">
        <div className="centered">
          <img src="img_avatar.png" alt="Avatar man" />
          <h2>John Doe</h2>
          <p>Some text here too.</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
