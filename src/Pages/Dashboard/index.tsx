import React from "react";
import CardMedia from "../../Components/CardMedia";
import CardBoasVindas from "../../Components/CardBoasVindas";
import CardListagemDisc from "../../Components/CardListagemDisc";

const Dashboard: React.FC = () => {
    const [relogio, setRelogio] = React.useState(new Date().toLocaleTimeString());




    React.useEffect(() => {
    const timer = setInterval(() => {
        setRelogio(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
    }, []);



    return(   
        <section className="flex justify-center h-[100vh] w-[100%] bg-[var(--verde-terciario)]">
            <div className="flex content-between flex-col h-[100%] w-[100%] max-w-[1500px]">
                <div className="header w-[100%] h-[auto]">
                    <div className="flex flex-row justify-center content-center text-center h-[3em]">
                        <span className="h-[2.6em] w-[7em] mt-[1em] p-[0.5em] rounded-[2em] content-center text-center bg-[white] shadow-[0_6px_25px_rgba(0,0,0,0.15)]">{relogio}</span>
                    </div>
                    <div className="line2 w-[100%] pl-[4em] h-[auto] pt-[6em] pb-[3em]">
                        <h2 className="text-[30px] text-[var(--texto-preto-primario)]">Dashboard</h2>
                    </div>
                </div>
                <div className="flex flex-col Body w-[100%] h-[100%]">
                    <div className="flex line1 w-[100%] h-[55%] bg-[#999] px-[2em] pt-[2em] pb-[1.5em]">
                        <CardBoasVindas />
                        <CardListagemDisc />
                    </div>
                    <div className="flex justify-between items-center content-between w-[100%] h-[35%]">
                        <CardMedia cat="portugues" media={5} max={14}/>
                        <CardMedia cat="matematica" media={1} max={14}/>
                        <CardMedia cat="ciencias" media={7} max={14}/>
                        <CardMedia cat="historia" media={3} max={14}/>
                        <CardMedia cat="geografia" media={2} max={14}/>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Dashboard;


