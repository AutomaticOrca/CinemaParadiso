import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "./MenuItem";
import {
  getCurrentPurchase,
  initializeCurrentPurchase,
} from "../../shared/store/cartSlice";

function Menu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sessionid } = useParams();

  const handleClickCheckout = () => {
    navigate(`/checkout/${sessionid}`);
  };

  useEffect(() => {
    const sessionId = "session1";
    const userId = "user1";
    dispatch(initializeCurrentPurchase(sessionId, userId));
  }, [dispatch]);

  const { sessionId, userId, originUnitPrice, tickets, status } =
    useSelector(getCurrentPurchase);

  if (!tickets || !tickets["NORMAL"] || !tickets["DISCOUNTED"]) {
    return null;
  }

  const total =
    tickets["NORMAL"].quantity * tickets["NORMAL"].unitPrice +
    tickets["DISCOUNTED"].quantity * tickets["DISCOUNTED"].unitPrice;

  return (
    <ul className="divide-ypx-2">
      {Object.keys(tickets).map((type, index) => (
        <MenuItem
          type={type}
          currentQuantity={tickets[type].quantity}
          unitPrice={tickets[type].unitPrice}
          key={"t-" + index}
        />
      ))}
      {/* Total Section */}
      <div className="border-t border-dotted border-gray-600">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-semibold">NORMAL</span>
          <span className="text-sm">
            ${tickets["NORMAL"].quantity * tickets["NORMAL"].unitPrice}{" "}
          </span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-sm font-semibold">DISCOUNTED</span>
          <span className="text-sm">
            ${tickets["DISCOUNTED"].quantity * tickets["DISCOUNTED"].unitPrice}
          </span>
        </div>
        <div className="border-t border-dotted border-gray-600 mb-4"></div>
        <div className="flex justify-between">
          <span className="text-lg font-bold text-red-400">TOTAL</span>
          <span className="text-lg font-bold">${total}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="mt-6 flex justify-end">
        <button
          className={`${
            total > 0
              ? "bg-rose-400 text-white"
              : "bg-gray-300 text-gray-700 cursor-not-allowed"
          } text-lg font-bold font-italiana py-2 px-4`}
          disabled={total <= 0}
          onClick={handleClickCheckout}
        >
          CHECKOUT
        </button>
      </div>

      {/* Displaying sessionId, userId, originUnitPrice, tickets, status for testing */}
      <div className="test-display text-gray-300">
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
