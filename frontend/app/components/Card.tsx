import React from "react";

type CardProps = {
  title: string;
  description: string;
  buttonLabel?: string;
  instructor: string;
  duration: string;
};

const Card: React.FC<CardProps> = ({
  title,
  description,
  duration,
  instructor,
}) => {
  return (
    <div className="flex px-3 py-3">
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-purple-300  min-h-60 max-h-100">
        <img
          className="w-full max-h-60 max-w-50"
          src="https://www.towson.edu/diar/images/cps-it-m.jpg"
          alt="Sunset in the mountains"
        />

        <div className="px-6 py-4">
          <div className="font-bold text-black text-xl mb-2">{title}</div>
          <p className="text-gray-600 text-base">{description}</p>
        </div>

        <div className="px-6 py-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            {instructor}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            {duration}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
