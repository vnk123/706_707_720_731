import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Item(props) {
  const [prod, setProd] = useState({});
  const loc = useLocation();

  useEffect(() => {
    const getProd = async () => {
      const res = await fetch(`http://localhost:5002/getproduct/${props.id}`);
      const json = await res.json();
      setProd(json);
    };
    getProd();
  }, [props.id]); // Include props.id in the dependency array

  const removeItem = async () => {
    const user = localStorage.user;
    const id = props.id;
    const res = await fetch("http://localhost:5003/delcart", {
      method: "POST",
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ user, id })
    });
    if (res.ok) {
      alert("Item removed");
      props.setR(!props.r);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-4 w-[75%] rounded-lg shadow-xl hover:scale-[1.1] bg-white">
        <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left w-full">
          <img alt={prod.name} className="flex-shrink-0 rounded-lg h-24 aspect-[1] object-cover object-center sm:mb-0 mb-4" src={prod.imgsrc} />
          <div className="w-full sm:pl-8">
            <h2 className="title-font font-medium text-lg text-gray-900">{prod.name}</h2>
            <h3 className="text-black font-medium text-md mb-3">Rs {prod.price} &nbsp; x{props.quan}</h3>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-900">Item price: Rs {prod.price * props.quan}</span>
              {!loc.pathname.startsWith('/order') && <button onClick={removeItem} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Remove</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
