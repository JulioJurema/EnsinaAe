import React, { useEffect, useState } from "react";
import CardMedia from "../../Components/CardMedia";
import CardBoasVindas from "../../Components/CardBoasVindas";
import CardListagemDisc from "../../Components/CardListagemDisc";
import { db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore"; // ✅ IMPORTAÇÃO CORRETA

const Dashboard: React.FC = () => {
    const [relogio, setRelogio] = useState(new Date().toLocaleTimeString());
    const [userID, setUserID] = useState<string | null>(null);
    const [userName, setUserName] = useState<string>("");
    const [userData, setUserData] = useState<any>(null);

    const [mediaMatematica, setMediaMatematica] = useState<number>(0);
    const [mediaPortugues, setMediaPortugues] = useState<number>(0);
    const [mediaCiencias, setMediaCiencias] = useState<number>(0);
    const [mediaHistoria, setMediaHistoria] = useState<number>(0);
    const [mediaGeografia, setMediaGeografia] = useState<number>(0);


  // Atualiza o relógio a cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setRelogio(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Busca dados do usuário no localStorage ao carregar
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user.uid) setUserID(user.uid);
        if (user.nome) setUserName(user.nome);
        console.log("Usuário encontrado:", user.uid, user.nome);
      } catch (error) {
        console.error("Erro ao ler usuário do localStorage:", error);
      }
    } else {
      console.log("Nenhum usuário encontrado no localStorage");
    }
  }, []);

  // Busca os dados do usuário no Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userID) return;
  
      try {
        const userDocRef = doc(db, "Users", userID);
        const userSnap = await getDoc(userDocRef);
  
        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserData(data);
  
          console.log("Dados completos do usuário:", data);
  
          // ✅ Garante que existe o campo 'relatorio'
          if (data.relatorio && typeof data.relatorio[0] === "object") {
            const relatorio = data.relatorio[0];
  
            // Função auxiliar para calcular média
            const calcularMedia = (arr: number[]) => {
              if (!arr || arr.length === 0) return 0;
              const soma = arr.reduce((a, b) => a + b, 0);
              return Math.round(soma / arr.length);
            };
  
            // Calcula médias de cada disciplina, se existirem
            if (relatorio.matematica)
              setMediaMatematica(calcularMedia(relatorio.matematica));
            if (relatorio.portugues)
              setMediaPortugues(calcularMedia(relatorio.portugues));
            if (relatorio.ciencias)
              setMediaCiencias(calcularMedia(relatorio.ciencias));
            if (relatorio.historia)
              setMediaHistoria(calcularMedia(relatorio.historia));
            if (relatorio.geografia)
              setMediaGeografia(calcularMedia(relatorio.geografia));
  
            console.log("Médias calculadas:", {
              matematica: calcularMedia(relatorio.matematica || []),
              portugues: calcularMedia(relatorio.portugues || []),
              ciencias: calcularMedia(relatorio.ciencias || []),
              historia: calcularMedia(relatorio.historia || []),
              geografia: calcularMedia(relatorio.geografia || []),
            });
          } else {
            console.warn("Relatório não encontrado no documento do usuário");
          }
        } else {
          console.warn("Usuário não encontrado no Firestore");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };
  
    fetchUserData();
  }, [userID]);

  const gerarRanking = () => {
    const disciplinas = [
      { nome: "Matemática", media: mediaMatematica },
      { nome: "Português", media: mediaPortugues },
      { nome: "Ciências", media: mediaCiencias },
      { nome: "História", media: mediaHistoria },
      { nome: "Geografia", media: mediaGeografia },
    ];
  
    return disciplinas.sort((a, b) => b.media - a.media);
  };
  
  const ranking = gerarRanking(); 
  

  return (
    <section className="flex justify-center h-[100vh] w-[100%] bg-[var(--verde-terciario)]">
      <div className="flex content-between flex-col h-[100%] w-[100%] max-w-[1500px]">
        {/* Cabeçalho */}
        <div className="header w-[100%] h-[auto]">
          <div className="flex flex-row justify-center content-center text-center h-[3em]">
            <span className="h-[2.6em] w-[7em] mt-[1em] p-[0.5em] rounded-[2em] content-center text-center bg-[white] shadow-[0_6px_25px_rgba(0,0,0,0.15)]">
              {relogio}
            </span>
          </div>
          <div className="line2 w-[100%] pl-[4em] h-[auto] pt-[6em] pb-[3em]">
            <h2 className="text-[30px] text-[var(--texto-preto-primario)]">
              Dashboard
            </h2>
          </div>
        </div>

        {/* Corpo */}
        <div className="flex flex-col Body w-[100%] h-[100%]">
          <div className="flex line1 w-[100%] h-[55%] pb-[1.5em] mb-[1.5em] justify-between">
            <CardBoasVindas nome={userName || "Usuário"} diasSemFaltas={56} urso="feliz" />

            <CardListagemDisc
              pos1={ranking[0]?.nome}
              pos2={ranking[1]?.nome}
              pos3={ranking[2]?.nome}
              pos4={ranking[3]?.nome}
              pos5={ranking[4]?.nome}
            />
          </div>

          <div className="flex justify-between items-center content-between w-[100%] h-[35%]">
            <CardMedia cat="portugues" media={mediaPortugues} max={14} />
            <CardMedia cat="matematica" media={mediaMatematica} max={14} />
            <CardMedia cat="ciencias" media={mediaCiencias} max={14} />
            <CardMedia cat="historia" media={mediaHistoria} max={14} />
            <CardMedia cat="geografia" media={mediaGeografia} max={14} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
