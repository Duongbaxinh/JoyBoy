"use client";
import axios from "axios";
import {headers} from "next/headers";
import {useState, useEffect, use} from "react";

const useFetchData = ({
    url,
    isAuthenticated = true,
    dependence = []
}: {
    url: string;
    isAuthenticated: boolean;
    dependence: Array<any>;
}) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    let authenticated = {};
    if (isAuthenticated) {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) throw new Error("use have login");
        authenticated = {
            headers: {
                Authentication: `Bearer ${accessToken}`
            }
        };
    }
    const handleGetData = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.delete(url, authenticated);
            setData(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };
    useEffect(() => {
        handleGetData();
    }, dependence);

    return [data, isLoading, error];
};

export default useFetchData;
