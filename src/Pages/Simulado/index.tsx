import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase"; // ajuste o caminho
import Header from "../../Components/Header/Header";
import QuestionCard from "../../Components/QuestionCard";

interface Question {
  id: string;
  categoria: string;
  enunciado: string;
  textoQuestao: string;
  perguntaFinal: string;
  alternativas: string[];
  correta: string;
}

interface SimuladoProps {
  simulado: boolean;
}

const Simulado: React.FC<SimuladoProps> = ({ simulado }) => {
  const [started, setStarted] = useState(false);
  const [questoes, setQuestoes] = useState<Question[]>([]);

  // Reinicia o estado se mudar o modo
  useEffect(() => {
    setStarted(false);
    setQuestoes([]);
  }, [simulado]);

  async function buscarQuestoes() {
    try {
      const colRef = collection(db, "Questions", "portugues", "questoes");
      const snapshot = await getDocs(colRef);
      const lista: Question[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Question, "id">),
      }));

      const embaralhadas = lista.sort(() => Math.random() - 0.10).slice(0, 10);
      console.log("Questões selecionadas:", embaralhadas);
      setQuestoes(embaralhadas);
    } catch (error) {
      console.error("Erro ao buscar questões:", error);
    }
  }

  function iniciar() {
    setStarted(true);
    if (simulado) buscarQuestoes();
  }

  return (
    <section className="flex simuladoContainer h-full justify-center">
      <div className="max-w-[1200px] ">
        {!started ? (
          <>
            <p>
              {simulado
                ? "Você está no modo simulado. Responda às questões no tempo de prova."
                : "Você está no modo livre. Estude sem se preocupar com o tempo."}
            </p>
            <button onClick={iniciar}>Iniciar</button>
          </>
        ) : (
          <>
            {simulado ? (
              <Header
                titulo="Simulado"
                descricao="Se prepare para o tempo de prova"
                cronometro={true}
              />
            ) : (
              <Header
                titulo="Modo Livre"
                descricao="No modo livre você pode estudar sem se preocupar com o tempo"
                cronometro={false}
              />
            )}

            <div className="ml-[2em] mr-[2em] overflow-auto scrollbar-none max-h-full pb-[8em]">
              {questoes.map((questao) => (
                <QuestionCard
                  key={questao.id}
                  enunciado={questao.enunciado}
                  textoQuestao={questao.textoQuestao}
                  perguntaFinal={questao.perguntaFinal}
                  alternativas={questao.alternativas}
                  correta={questao.correta}
                  categoria={questao.categoria}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Simulado;
