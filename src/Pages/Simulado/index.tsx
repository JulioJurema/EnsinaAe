import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
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
  const [running, setRunning] = useState(false);
  const [finalizado, setFinalizado] = useState(false);
  const [tempo, setTempo] = useState(0); // tempo em segundos

  // reinicia estado se mudar modo
  useEffect(() => {
    setStarted(false);
    setQuestoes([]);
    setRunning(false);
    setFinalizado(false);
    setTempo(0);
  }, [simulado]);

  // efeito do cronômetro
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (running) {
      interval = setInterval(() => {
        setTempo((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [running]);

  // formata tempo para mm:ss
  function formatarTempo(segundos: number): string {
    const m = Math.floor(segundos / 60).toString().padStart(2, "0");
    const s = (segundos % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  async function buscarQuestoes() {
    try {
      const colRef = collection(db, "Questions", "portugues", "questoes");
      const snapshot = await getDocs(colRef);
      const lista: Question[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Question, "id">),
      }));

      const embaralhadas = lista.sort(() => Math.random() - 0.5).slice(0, 10);
      console.log("Questões selecionadas:", embaralhadas);
      setQuestoes(embaralhadas);
    } catch (error) {
      console.error("Erro ao buscar questões:", error);
    }
  }

  function iniciar() {
    setStarted(true);
    if (simulado) buscarQuestoes();
    setTempo(0);
    setRunning(true);
  }

  function finalizar() {
    setRunning(false);
    setFinalizado(true);
  }

  function novoSimulado() {
    setStarted(false);
    setQuestoes([]);
    setRunning(false);
    setFinalizado(false);
    setTempo(0);
  }

  return (
    <section className="flex simuladoContainer min-h-screen justify-center">
      <div className="max-w-[1200px] h-[100vh]">
        {!started ? (
          <div className="text-center h-full content-center">
            <p className="mb-[1em]">
              {simulado
                ? "Você está no modo simulado. Responda às questões no tempo de prova."
                : "Você está no modo livre. Estude sem se preocupar com o tempo."}
            </p>
            <button className="text-[20px]" onClick={iniciar}>
              Iniciar
            </button>
          </div>
        ) : (
          <>
            {simulado ? (
              <Header
                titulo="Simulado"
                descricao="Se prepare para o tempo de prova"
                cronometro={true}
                tempo={formatarTempo(tempo)}
              />
            ) : (
              <Header
                titulo="Modo Livre"
                descricao="No modo livre você pode estudar sem se preocupar com o tempo"
                cronometro={false}
                tempo=""
              />
            )}

            {/* Lista de questões com espaço extra para o footer fixo */}
            <div className="ml-[2em] mr-[2em] overflow-auto scrollbar-none max-h-[80vh] ">
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

            {/* FOOTER fixo */}
            <div className="max-w-[1200px] w-full bg-[#333] shadow-md p-4 flex justify-center">
              {!finalizado ? (
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={finalizar}
                >
                  Finalizar
                </button>
              ) : (
                <>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded">
                    Conferir respostas
                  </button>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded"
                    onClick={novoSimulado}
                  >
                    Novo Simulado
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Simulado;
