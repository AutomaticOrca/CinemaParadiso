import { useDispatch } from "react-redux";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
} from "../../shared/store/cartSlice";

function UpdateItemQuantity({ type, currentQuantity }) {
  const dispatch = useDispatch();
  return (
    <div>
      <button
        onClick={() => dispatch(decreaseItemQuantity(type))}
        disabled={currentQuantity === 0}
      >
        -
      </button>
      <span>{currentQuantity}</span>
      <button onClick={() => dispatch(increaseItemQuantity(type))}>+</button>
    </div>
  );
}

export default UpdateItemQuantity;
