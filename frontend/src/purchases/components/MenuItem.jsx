import { useState } from "react";
import UpdateItemQuantity from "./UpdateItemQuantity";

function MenuItem({ ticket }) {
  const { type, unitPrice } = ticket;
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const [isInCart, setIsInCart] = useState(currentQuantity > 0);

  const handleAddToCart = () => {
    if (currentQuantity <= 0) {
      setIsInCart(true);
    }
    setCurrentQuantity(currentQuantity + 1);
    console.log(currentQuantity);
  };
  return (
    <li>
      <p>{type}</p>
      <p>${unitPrice}</p>
      {isInCart && (
        <div>
          <UpdateItemQuantity
            currentQuantity={currentQuantity}
            setCurrentQuantity={setCurrentQuantity}
            setIsInCart={setIsInCart}
          />
        </div>
      )}

      {!isInCart && <button onClick={handleAddToCart}>add to cart</button>}
    </li>
  );
}

export default MenuItem;
