import React from "react";
import CardMedia from "../../Components/CardMedia";

const Dashboard: React.FC = () => {
    return(   
        <section className="flex justify-center h-[100vh] w-[100%]">
            <div className="flex content-between flex-col h-[100%] w-[100%] max-w-[1500px] bg-[#aaa]">
                <div className="header w-[100%] h-[auto] bg-[#ccc]">
                    <div className="flex flex-col justify-center text-center h-[3em]">
                        <span>hora:minuto:segundo</span>
                    </div>
                    <div className="line2 w-[100%] pl-[4em] h-[auto] pt-[6em] pb-[3em] bg-[#eee]">
                        <h2 className="text-[30px] text-[var(--texto-preto-primario)]">Dashboard</h2>
                    </div>
                </div>
                <div className="flex flex-col Body w-[100%] h-[100%]">
                    <div className="line1 w-[100%] h-[55%] bg-[#999]">
                        
                    </div>
                    <div className="flex justify-center items-center content-between w-[100%] h-[35%] bg-[#ccc]">
                        <CardMedia cat="portugues" media={22.5} max={14}/>
                        <CardMedia cat="matematica" media={22.5} max={14}/>
                        <CardMedia cat="ciencias" media={22.5} max={14}/>
                        <CardMedia cat="historia" media={22.5} max={14}/>
                        <CardMedia cat="geografia" media={22.5} max={14}/>
                    </div>
                </div>
            </div>
            
        </section>
    )
};

export default Dashboard;


