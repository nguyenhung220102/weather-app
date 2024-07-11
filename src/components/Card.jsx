import React from "react";

const Card = ({ card }) => {
    return (
        <div className='w-full p-5 h-60 bg-primary-400 hover:bg-primary-700 duration-200 transition-all rounded-lg flex flex-row justify-between items-center text-white'>
            <div className='flex flex-col justify-between h-full'>
                <span className='font-bold text-lg'>({card.time})</span>
                <img src={card.image} alt='image' className="h-14 w-14"/>
                <span className='text-base'>Temperature: {card.temp} ℃</span>
                <span className='text-base'>Wind: {card.wind} km/h</span>
                <span className='text-base'>Humidity: {card.humid} %</span>
            </div>
        </div>
    );
};

export default Card;
