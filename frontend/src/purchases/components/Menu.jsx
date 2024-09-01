import MenuItem from "./MenuItem";

function Menu() {
  const tickets = [
    { type: "ADULT", unitPrice: 24.5, quantity: 0 },
    { type: "CHILD", unitPrice: 15.5, quantity: 0 },
  ];

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {tickets.map((ticket, index) => (
        <MenuItem ticket={ticket} key={"t-" + index} />
      ))}
    </ul>
  );
}

export default Menu;
