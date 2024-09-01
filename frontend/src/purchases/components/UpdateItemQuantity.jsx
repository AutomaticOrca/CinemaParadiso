import { useDispatch } from "react-redux";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
} from "../../shared/store/cartSlice";

function UpdateItemQuantity({
  currentQuantity,
  setCurrentQuantity,
  setIsInCart,
}) {
  const increaseItemQuantity = () => {
    setCurrentQuantity(currentQuantity + 1);
  };
  const decreaseItemQuantity = () => {
    setCurrentQuantity(currentQuantity - 1);
    if (currentQuantity === 1) {
      // what is the logic of this part?
      deleteItem();
    }
  };

  const deleteItem = () => {
    setIsInCart(false);
  };

  return (
    <div>
      <button onClick={decreaseItemQuantity}>-</button>
      <span>{currentQuantity}</span>
      <button onClick={increaseItemQuantity}>+</button>
    </div>
  );
}

export default UpdateItemQuantity;
