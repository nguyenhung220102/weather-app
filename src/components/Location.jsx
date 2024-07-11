"use client";
import fetcher from "@/helper/Fetcher";
import { AutoComplete, Button, Input, Space } from "antd";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { message } from "antd";
const Location = ({ setLocation }) => {
    const [value, setValue] = useState("");
    const [options, setOptions] = useState([]);
    const [cities, setCities] = useState([]);
    const [email, setEmail] = useState("");
    const getPanelValue = async (searchText) => {
        if (!searchText) {
            setOptions([]);
            return;
        }
        let filteredCities = [];
        if (cities.length === 0) {
            const city = await fetcher({
                url: `/cities`,
                data_return: true,
            });
            setCities(city);
            filteredCities = city
                .filter((c) =>
                    c.name.toLowerCase().includes(searchText.toLowerCase())
                )
                .slice(0, 10);
            setOptions(
                filteredCities.map((c) => ({
                    value: c.name,
                    label: `${c.name}, ${c.country}`,
                }))
            );
        } else {
            filteredCities = cities
                .filter((c) =>
                    c.name.toLowerCase().includes(searchText.toLowerCase())
                )
                .slice(0, 10);
        }
        setOptions(
            filteredCities.map((c) => ({
                value: c.name,
                label: `${c.name}, ${c.country}`,
            }))
        );
    };

    const onSelect = (data) => {
        Cookies.set("city", data, { expires: 1 });
        setLocation(data);
    };

    const onChange = (data) => {
        setValue(data);
    };

    const onRegister = async () => {
        const city = Cookies.get("city") || "Ho Chi Minh";
        const postData = { email, city };
        const response = await fetcher({
            url: `/emails`,
            method: "POST",
            body: postData,
            data_return: true,
        });
        if (response === "Email already exists") {
            message.warning("This email is already registered!");
        } else {
            message.success("Register email successfully!");
            setEmail("");
        }
    };

    const getCurrentLocation = async () => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const location = await fetcher({
                    data_return: true,
                    url: `/cities/${latitude + "," + longitude}`,
                });
                Cookies.set("city", location.name, { expires: 1 });
                setLocation(location.name);
            },
            (error) => {
                message.error("Error getting current location");
            }
        );
    };

    return (
        <div className='w-full flex flex-col justify-start md:gap-20 gap-5'>
            <div className='w-full flex flex-col justify-start gap-5'>
                <div className='font-bold text-xl'>Enter a city name</div>
                <AutoComplete
                    options={options}
                    size='large'
                    onSelect={onSelect}
                    onSearch={(text) => getPanelValue(text)}
                    placeholder='E.g., London, New York, Tokyo'
                />
                <div class='relative flex items-center'>
                    <div class='flex-grow border-t border-gray-400'></div>
                    <span class='flex-shrink mx-4 text-gray-400'>or</span>
                    <div class='flex-grow border-t border-gray-400'></div>
                </div>
                <Button
                    type='primary'
                    size='large'
                    className='font-bold'
                    onClick={getCurrentLocation}
                >
                    Use current location
                </Button>
            </div>
            <div className='w-full flex flex-col justify-start gap-5'>
                <div className='font-bold text-xl'>
                    Receive daily weather forecast
                </div>
                <Space.Compact style={{ width: "100%" }}>
                    <Input
                        size='large'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Your email. E.g., test@gmail.com'
                    />
                    <Button
                        size='large'
                        type='primary'
                        className='font-bold'
                        onClick={onRegister}
                    >
                        Register
                    </Button>
                </Space.Compact>
            </div>
        </div>
    );
};

export default Location;
