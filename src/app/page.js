"use client";
import Card from "@/components/Card";
import CurrentCard from "@/components/CurrentCard";
import Loading from "@/components/Loading";
import Location from "@/components/Location";
import fetcher from "@/helper/Fetcher";
import { Button, ConfigProvider, Spin } from "antd";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Home() {
    const [city, setCity] = useState("");
    const [index, setIndex] = useState(4);
    const [current, setCurrent] = useState({});
    const [weather, setWeather] = useState({});
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        const savedCity = Cookies.get("city");
        if (savedCity) {
            setCity(savedCity);
        } else {
            setCity("Ho Chi Minh");
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await fetcher({
                data_return: true,
                url: `/weathers?city=${city}&range=${index}`,
                method: "GET",
            });
            const currentData = response.current;
            setCurrent({
                location: city,
                time: currentData.last_updated,
                temp: currentData.temp_c.toString(),
                humid: currentData.humidity.toString(),
                wind: currentData.wind_kph.toString(),
                condition: currentData.condition.text,
                image: `https:${currentData.condition.icon}`,
            });
            setWeather(response);
            setForecast(response.forecast.forecastday);
            setLoading(false);
        };
        if (city) {
            fetchData();
        }
    }, [city]);

    const loadMore = () => {
        setIndex((prev) => prev + 4);
    };

    useEffect(() => {
        if (index > 4) {
            const loadMoreData = async () => {
                setLoadingMore(true);
                const response = await fetcher({
                    data_return: true,
                    url: `/weathers?city=${city}&range=${index}`,
                    method: "GET",
                });
                setForecast(response.forecast.forecastday);
                setLoadingMore(false);
            };
            loadMoreData();
        }
    }, [index]);

    if (!current || !city) return <Loading />;
    return (
        <main className='relative flex min-h-screen flex-col items-center justify-between pt-24 xl:px-40 px-10 bg-primary-100 text-black'>
            <div className='w-full flex flex-col sm:flex-row justify-between gap-10'>
                <div className='flex-grow-0 flex-shrink-0 basis-1/3'>
                    <Location setLocation={setCity} />
                </div>
                {loading ? (
                    <Loading />
                ) : (
                    <div className='flex-grow-0 flex-shrink-0 basis-2/3 xl:px-0 px-10'>
                        <div className='w-full h-auto flex flex-col justify-start gap-5'>
                            <div className='w-full h-auto'>
                                <CurrentCard card={current} />
                            </div>
                            <div className='font-bold text-xl'>
                                {index > 14 ? 14 : index}-Day forecast
                            </div>
                            <div className='w-full grid grid-cols-2 xl:grid-cols-4 gap-5'>
                                {forecast.slice(0, index).map((day, i) => (
                                    <Card
                                        key={i}
                                        card={{
                                            location: city,
                                            time: day.date,
                                            temp: day.day.avgtemp_c.toString(),
                                            humid: day.day.avghumidity.toString(),
                                            wind: day.day.maxwind_kph.toString(),
                                            condition: day.day.condition.text,
                                            image: `https:${day.day.condition.icon}`,
                                        }}
                                    />
                                ))}
                            </div>
                            {index <= 14 && (
                                <Button
                                    type='primary'
                                    size='large'
                                    className='font-bold'
                                    onClick={loadMore}
                                >
                                    Load more
                                    {loadingMore ? (
                                        <ConfigProvider
                                            theme={{
                                                token: {
                                                    colorPrimary: "#FFFFFF",
                                                },
                                            }}
                                        >
                                            <Spin
                                                tip='Loading'
                                                size='default'
                                            />
                                        </ConfigProvider>
                                    ) : (
                                        ""
                                    )}
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
