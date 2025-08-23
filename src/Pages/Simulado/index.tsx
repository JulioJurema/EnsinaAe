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
  nome: string;
}

interface SimuladoProps {
  simulado: boolean;
}

const Simulado: React.FC<SimuladoProps> = ({ simulado }) => {
  const [started, setStarted] = useState(false);
  const [questoes, setQuestoes] = useState<Question[]>([]);
  const [respostas, setRespostas] = useState<{ [id: string]: string }>({});
  const [running, setRunning] = useState(false);
  const [finalizado, setFinalizado] = useState(false);
  const [tempo, setTempo] = useState(0);
  const [mostrarCorretas, setMostrarCorretas] = useState(false);
  const [userID, setUserID] = useState();

  //Zerar informações para iniciar
  useEffect(() => {
    setStarted(false);
    setQuestoes([]);
    setRespostas({});
    setRunning(false);
    setFinalizado(false);
    setTempo(0);
    setMostrarCorretas(false);
  }, [simulado]);

  //iniciar tempo
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (running) {
      interval = setInterval(() => setTempo((prev) => prev + 1), 1000);
    }
    return () => interval && clearInterval(interval);
  }, [running]);

  function formatarTempo(segundos: number): string {
    const m = Math.floor(segundos / 60).toString().padStart(2, "0");
    const s = (segundos % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }
  //buscar uid no localstorage
  const logLocalStorage = () => {
    const userData = localStorage.getItem("user"); // supondo que você salvou como "user"
    if (userData) {
      const user = JSON.parse(userData);
      setUserID(user.uid);
      console.log("UID:", userID);
    } else {
      console.log("Nenhum usuário encontrado no localStorage");
    }
  };

  //buscar e escolher questões no banco
  async function buscarQuestoes() {
    try {
      const disciplinas = [
        { nome: "portugues", qtd: 10 },
        { nome: "matematica", qtd: 10 },
        { nome: "ciencias", qtd: 10 },
        { nome: "historia", qtd: 5 },
        { nome: "geografia", qtd: 5 },
      ];

      let todasQuestoes: Question[] = [];

      for (const disc of disciplinas) {
        const colRef = collection(db, "Questions", disc.nome, "questoes");
        const snapshot = await getDocs(colRef);
        const lista: Question[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          categoria: disc.nome,
          ...(doc.data() as Omit<Question, "id">),
        }));
        // embaralha e pega só a quantidade necessária
        const selecionadas = lista.sort(() => Math.random() - 0.5).slice(0, disc.qtd);
        todasQuestoes = [...todasQuestoes, ...selecionadas];
      }

      setQuestoes(todasQuestoes);
    } catch (error) {
      console.error("Erro ao buscar questões:", error);
    }
  }

  //Iniciar simulado e buscar questões
  function iniciar() {
    setStarted(true);
    if (simulado) buscarQuestoes();
    setTempo(0);
    setRunning(true);
    setMostrarCorretas(false);
  }

  //finalizar simulado e calcular acertos por disciplina
  function finalizar() {
    setRunning(false);
    setFinalizado(true);
    setMostrarCorretas(true);
    logLocalStorage();

    const acertosPorDisciplina: Record<string, number> = {};
    const totalPorDisciplina: Record<string, number> = {};

    questoes.forEach((q) => {
      if (!totalPorDisciplina[q.categoria]) {
        totalPorDisciplina[q.categoria] = 0;
        acertosPorDisciplina[q.categoria] = 0;
      }
      totalPorDisciplina[q.categoria]++;
      if (respostas[q.id] === q.correta) {
        acertosPorDisciplina[q.categoria]++;
      }
    });

    console.log("Resultado por disciplina:");
    Object.keys(totalPorDisciplina).forEach((disc) => {
      console.log(
        `${disc.toUpperCase()}: ${acertosPorDisciplina[disc]} de ${totalPorDisciplina[disc]}`
      );
    });
  }
  //reiniciar simulado
  function novoSimulado() {
    setStarted(false);
    setQuestoes([]);
    setRespostas({});
    setRunning(false);
    setFinalizado(false);
    setTempo(0);
    setMostrarCorretas(false);
  }

  function atualizarResposta(id: string, valor: string) {
    setRespostas((prev) => ({ ...prev, [id]: valor }));
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

            <div className="ml-[2em] mr-[2em] overflow-auto scrollbar-none h-[auto] max-h-[80%]">
              {questoes.map((questao, i) => (
                <QuestionCard
                  key={questao.id}
                  numero={i + 1}
                  categoria={questao.categoria}
                  enunciado={questao.enunciado}
                  textoQuestao={questao.textoQuestao}
                  perguntaFinal={questao.perguntaFinal}
                  alternativas={questao.alternativas}
                  correta={questao.correta}
                  mostrarCorreta={mostrarCorretas}
                  respostaSelecionada={respostas[questao.id] || ""}
                  onResponder={(valor) => atualizarResposta(questao.id, valor)}
                />
              ))}
            </div>

            <div className="max-w-[1200px] w-full bg-[#333] shadow-md p-[2em] flex justify-center gap-[1em]">
              {!finalizado ? (
                <button
                  className="px-[2em] py-[1em] bg-red-500 text-white rounded"
                  onClick={finalizar}
                >
                  Finalizar
                </button>
              ) : (
                <>
                  <button
                    className="px-[2em] py-[1em] bg-blue-500 text-white rounded"
                    onClick={() => setMostrarCorretas(true)}
                  >
                    Conferir respostas
                  </button>
                  <button
                    className="px-[2em] py-[1em] bg-green-500 text-white rounded"
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
