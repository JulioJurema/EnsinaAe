import React from "react";

interface CardMediaProps{
    cat: string;
    media: number
    max: number

}

const CardMedia: React.FC<CardMediaProps> = (props) => {
    return(   
        <section className=" m-auto h-[12em] w-[15em] rounded-[1em] pb-[1.5em] shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
            <div className="flex justify-center items-center h-[100%] w-[100%] rounded-[1em] shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                <p>{props.cat}</p>
            </div>
            
        </section>
    )
};

export default CardMedia;


