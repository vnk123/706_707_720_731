import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Singleorder from "./orderitem";
import React from 'react';

function Order() {
    const param = useParams();
    const [ord, setord] = useState([]);

    useEffect(() => {
        console.log(param.user);
        const getHistory = async () => {
            const res = await fetch("http://localhost:5003/history/" + param.user);
            const json = await res.json();
            setord([...json].reverse());
        };
        getHistory();
    }, [param.user]); // Add param.user as a dependency

    return (
        <div>
            <div class="flex flex-col text-center w-full mb-5">
                <h1 class="text-2xl font-medium title-font text-gray-900 tracking-widest">YOUR ORDERS</h1>
            </div>
            {ord.map((n) => (
                <Singleorder key={n._id} data={n}/>
            ))}
        </div>
    );
}

export default Order;
