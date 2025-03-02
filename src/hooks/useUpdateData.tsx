"use client";
import {headers} from "next/headers";
import {useState, useEffect, use} from "react";

const exPayload = {
    limit: 0,
    page: 0,
    typeProduct: [],
    categories: [],
    stock: "",
    expiration: "",
    businessStatus: "",
    textSearch: ""
};
const useUpdateData = ({
    url,
    isAuthenticated = true,
    payload = {},
    dependence = []
}: {
    url: string;
    isAuthenticated: boolean;
    payload: any;
    dependence: Array<any>;
}) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    let authenticated = null;
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
            const {data} = await axios.put(url, payload, authenticated);
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

export default useUpdateData;
