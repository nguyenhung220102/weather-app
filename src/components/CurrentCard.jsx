import React from "react";

const CurrentCard = ({ card }) => {
    return (
        <div className='w-full p-10 h-60 bg-primary-700 rounded-lg flex flex-row justify-between items-center text-white'>
            <div className='flex flex-col justify-between gap-5'>
                <span className='font-bold text-lg'>
                    {card.location} ({card.time})
                </span>
                <span className='text-base'>Temperature: {card.temp} ℃</span>
                <span className='text-base'>Wind: {card.wind} km/h</span>
                <span className='text-base'>Humidity: {card.humid} %</span>
            </div>
            <div className='flex flex-col justify-around items-center'>
                <img src={card.image} alt='image' className="w-24"/>
                <span className='text-base self-center' >{card.condition}</span>
            </div>
        </div>
    );
};

export default CurrentCard;
