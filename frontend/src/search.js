import { useEffect, useState, useCallback } from "react";
import Display from "./display";
import { useNavigate } from "react-router-dom";

function Search() {
    const nav= useNavigate();
    const [query, setQuery] = useState("");
    const [plist, setPlist] = useState([]);

    const getProducts = useCallback(async () => {
        console.log("called", query);
        try {
            const res = await fetch(query ? `http://localhost:5002/product/${query}` : 'http://localhost:5002/product');
            const json = await res.json();
            if (res.ok) {
                setPlist([...json]);
            }
            if (query) {
                nav(`/search/${query}`);
            } else {
                nav("/");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [query, nav]);

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        getProducts();
    };

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit}>   
                <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative mx-72">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input type="search" onChange={handleChange} value={query} className="block w-full p-4 pl-10 text-xl text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500" placeholder="Search for ..." />
                    <button type="submit" className="text-white absolute right-2.5 bottom-2.5 my-1 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Search</button>
                </div>
            </form>
            <div className="flex justify-center container px-5 py-5 mx-auto w-full">
                <div className="grid grid-cols-2 gap-2 items-center lg:grid lg:grid-cols-4 lg:gap-4">
                    {plist.map((n) => (
                        <Display key={n._id} name={n.name} imgsrc={n.imgsrc} desc={n.desc} price={n.price} id={n._id} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Search;
