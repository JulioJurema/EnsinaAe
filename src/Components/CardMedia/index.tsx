import React from "react";

interface CardMediaProps {
  cat: string;
  media: number;
  max: number;
}

const CardMedia: React.FC<CardMediaProps> = (props) => {
  return (
    <div className="bg-[white] rounded-[35px] shadow-[0_6px_25px_rgba(0,0,0,0.15)] w-[15em] h-[14em] flex items-center justify-center">
      <div className="bg-[white] rounded-[35px] shadow-[0_6px_25px_rgba(0,0,0,0.15)] w-[100%] h-[85%] mb-[15%] p-[2em] flex flex-col justify-between">
        <h3 className="text-[20px] font-[600] text-[rgba(0,0,0,0.9)] capitalize">
          {props.cat}
        </h3>
        <div className="flex justify-between items-end mt-[10px]">
          <p className="text-[16px] w-[50%] text-[rgba(0,0,0,0.6)]">Média de acertos</p>
          <span className="text-[40px] font-[700] text-[rgba(0,0,0,0.8)] leading-[1]">
            {props.media}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardMedia;
