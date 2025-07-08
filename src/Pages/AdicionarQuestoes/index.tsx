import { useEffect, useState } from 'react';
import { db } from '../../../Firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import './style.css';

const AddQuestion: React.FC = () => {
  const [categorias, setCategorias] = useState<string[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [enunciado, setEnunciado] = useState('');
  const [imagem1, setImagem1] = useState('');
  const [imagem2, setImagem2] = useState('');
  const [alternativas, setAlternativas] = useState<{ [key: string]: string }>({
    A: '', B: '', C: '', D: '', E: ''
  });
  const [correta, setCorreta] = useState('');
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const fetchCategorias = async () => {
      const snapshot = await getDocs(collection(db, 'Questions'));
      const nomes = snapshot.docs.map(doc => doc.id);
      setCategorias(nomes);
    };

    fetchCategorias();
  }, []);

  const handleAddQuestion = async () => {
    if (!categoriaSelecionada || !enunciado || !correta) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    setCarregando(true);

    const data = {
      enunciado,
      alternativas,
      correta,
      categoria: categoriaSelecionada,
      imagem1: imagem1 || null,
      imagem2: imagem2 || null,
      criadoEm: new Date()
    };

    try {
      await addDoc(collection(db, 'Questions', categoriaSelecionada, 'questoes'), data);
      alert('Questão adicionada com sucesso!');

      setCategoriaSelecionada('');
      setEnunciado('');
      setImagem1('');
      setImagem2('');
      setAlternativas({ A: '', B: '', C: '', D: '', E: '' });
      setCorreta('');
    } catch (error) {
      console.error('Erro ao adicionar questão:', error);
      alert('Erro ao adicionar a questão.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="add-question-container">
      <h2>Adicionar Nova Questão</h2>

      <div className="row-group">
        <label>Categoria:</label>
        <select
          value={categoriaSelecionada}
          onChange={(e) => setCategoriaSelecionada(e.target.value)}
        >
          <option value="">Selecione uma categoria</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="row-group-full">
        <label>Enunciado:</label>
        <textarea
          value={enunciado}
          onChange={(e) => setEnunciado(e.target.value)}
          rows={6}
          placeholder="Digite o enunciado com quebras de linha"
        />
      </div>

      <div className="row-group">
        <label>Link da Imagem 1:</label>
        <input
          type="text"
          value={imagem1}
          onChange={(e) => setImagem1(e.target.value)}
          placeholder="Link da imagem (opcional)"
        />
      </div>

      <div className="row-group">
        <label>Link da Imagem 2:</label>
        <input
          type="text"
          value={imagem2}
          onChange={(e) => setImagem2(e.target.value)}
          placeholder="Link da imagem (opcional)"
        />
      </div>

      <div className="row-group-full">
        <label>Alternativas:</label>
        <div className="alternativas-container">
          {['A', 'B', 'C', 'D', 'E'].map((letra) => (
            <div className="alternativa-item" key={letra}>
              <input
                type="text"
                placeholder={`Alternativa ${letra}`}
                value={alternativas[letra]}
                onChange={(e) =>
                  setAlternativas({ ...alternativas, [letra]: e.target.value })
                }
              />
              <label className="radio-label">
                <input
                  type="radio"
                  name="correta"
                  value={letra}
                  checked={correta === letra}
                  onChange={(e) => setCorreta(e.target.value)}
                />
                Correta
              </label>
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleAddQuestion} disabled={carregando}>
        {carregando ? 'Salvando...' : 'Salvar Questão'}
      </button>
    </div>
  );
};

export default AddQuestion;
