"use client";
import axios from "axios";
import {useEffect, useState} from "react";

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

const exPayload2 = {
    limit: 0,
    page: 0,
    typeProduct: [],
    categories: [],
    stock: "",
    expiration: "",
    businessStatus: "",
    textSearch: ""
};
const useFetchData = ({
    url,
    isAuthenticated = true,
    payload = {},
    dependence = []
}: {
    url: string;
    isAuthenticated?: boolean;
    payload?: any;
    dependence?: Array<any>;
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
            const {data} = await axios.get(url, authenticated);
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
