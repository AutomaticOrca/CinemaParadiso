import { useDispatch, useSelector } from "react-redux";
import UpdateItemQuantity from "./UpdateItemQuantity";

function MenuItem({ type, currentQuantity, unitPrice }) {
  const dispatch = useDispatch();

  return (
    <li>
      {type} ${unitPrice} each{" "}
      <UpdateItemQuantity type={type} currentQuantity={currentQuantity} />
    </li>
  );
}

export default MenuItem;
