import React, { useState } from 'react';
import { db } from '../../../Firebase'; // ajuste o caminho conforme seu projeto
import { collection, addDoc } from 'firebase/firestore';

export default function FormularioQuestao() {
  const [categoria, setCategoria] = useState('');
  const [enunciado, setEnunciado] = useState('');
  const [textoQuestao, setTextoQuestao] = useState('');
  const [perguntaFinal, setPerguntaFinal] = useState('');
  const [alternativas, setAlternativas] = useState(['', '', '', '', '']);
  const [corretaIndex, setCorretaIndex] = useState<number | null>(null);

  const handleAlternativaChange = (index: number, value: string) => {
    const novas = [...alternativas];
    novas[index] = value;
    setAlternativas(novas);
  };

  const handleCorretaChange = (index: number) => {
    setCorretaIndex(index);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dadosQuestao = {
      categoria,
      enunciado,
      textoQuestao,
      perguntaFinal,
      alternativas,
      correta: corretaIndex !== null ? alternativas[corretaIndex] : '',
    };

    try {
      await addDoc(collection(db, 'Questions', categoria, 'questoes'), dadosQuestao);
      alert('Questão salva com sucesso!');
      // Resetar o formulário
      setEnunciado('');
      setTextoQuestao('');
      setPerguntaFinal('');
      setAlternativas(['', '', '', '', '']);
      setCorretaIndex(null);
    } catch (error) {
      console.error('Erro ao adicionar questão:', error);
      alert('Erro ao salvar a questão.');
    }
  };

  return (
    <div style={{ maxHeight: '100vh', overflowY: 'auto', padding: '1rem' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="categoria">Categoria:</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          >
            <option value="">Selecione uma categoria</option>
            <option value="matematica">Matemática</option>
            <option value="portugues">Português</option>
            <option value="ciencias">Ciências</option>
            <option value="historia">História</option>
            <option value="geografia">Geografia</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Enunciado (com marcações):</label>
          <textarea
            value={enunciado}
            onChange={(e) => setEnunciado(e.target.value)}
            rows={4}
            style={{ width: '100%' }}
            placeholder={`Escreva o enunciado...\n\nUse:\n- [link da imagem] para imagens\n- **negrito**\n- __itálico__\n- ~~sublinhado~~`}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Texto da Questão (com marcações):</label>
          <textarea
            value={textoQuestao}
            onChange={(e) => setTextoQuestao(e.target.value)}
            rows={8}
            style={{ width: '100%' }}
            placeholder={`Escreva o texto completo...\n\nUse:\n- [link da imagem] para imagens\n- **negrito**\n- __itálico__\n- ~~sublinhado~~`}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Pergunta da Questão (com marcações):</label>
          <textarea
            value={perguntaFinal}
            onChange={(e) => setPerguntaFinal(e.target.value)}
            rows={3}
            style={{ width: '100%' }}
            placeholder={`Escreva a pergunta...\n\nUse:\n- [link da imagem] para imagens\n- **negrito**\n- __itálico__\n- ~~sublinhado~~`}
          />
        </div>

        <div>
          <p>Alternativas:</p>
          {alternativas.map((alt, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <input
                type="text"
                value={alt}
                onChange={(e) => handleAlternativaChange(index, e.target.value)}
                placeholder={`Alternativa ${String.fromCharCode(65 + index)}`}
                style={{ flex: 1, marginRight: '0.5rem' }}
              />
              <label>
                <input
                  type="checkbox"
                  checked={corretaIndex === index}
                  onChange={() => handleCorretaChange(index)}
                />
                Correta
              </label>
            </div>
          ))}
        </div>

        <button type="submit" style={{ padding: '0.5rem', fontWeight: 'bold' }}>
          Salvar Questão
        </button>
      </form>
    </div>
  );
}
