import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "./MenuItem";
import {
  getCurrentPurchase,
  initializeCurrentPurchase,
} from "../../shared/store/cartSlice";

function Menu() {
  const dispatch = useDispatch();

  const { sessionId, userId, originUnitPrice, tickets, status } =
    useSelector(getCurrentPurchase);

  useEffect(() => {
    const sessionId = "session1";
    const userId = "user1";
    dispatch(initializeCurrentPurchase(sessionId, userId));
  }, [dispatch]);

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {Object.keys(tickets).map((type, index) => (
        <MenuItem
          type={type}
          currentQuantity={tickets[type].quantity}
          unitPrice={tickets[type].unitPrice}
          key={"t-" + index}
        />
      ))}

      {/* Displaying sessionId, userId, originUnitPrice, tickets, status for testing */}
      <div className="test-display">
        <p>----test----</p>
        <p>
          <strong>Session ID:</strong> {sessionId}
        </p>
        <p>
          <strong>User ID:</strong> {userId}
        </p>
        <p>
          <strong>Origin Unit Price:</strong> {originUnitPrice}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
        <p>
          <strong>Tickets:</strong>
        </p>
        <ul>
          {Object.keys(tickets).map((type) => (
            <li key={type}>
              {type}: Quantity - {tickets[type].quantity}, Unit Price -{" "}
              {tickets[type].unitPrice}
            </li>
          ))}
        </ul>
      </div>
    </ul>
  );
}

export default Menu;
