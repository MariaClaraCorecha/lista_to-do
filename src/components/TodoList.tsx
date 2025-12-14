import { useState, useEffect } from "react";
import "./TodoList.css";

interface Tarefa {
  texto: string;
  concluida: boolean;
}

function TodoList() {
  const [tarefa, setTarefa] = useState<string>("");
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  //  Carregar tarefas do localStorage ao abrir o app
  useEffect(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");

    if (tarefasSalvas) {
      setTarefas(JSON.parse(tarefasSalvas));
    }
  }, []);

  //  Salvar tarefas no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  function adicionarTarefa() { // Função para adicionar uma nova tarefa
    if (tarefa.trim() === "") return; // Evita adicionar tarefas vazias

    setTarefas([ // Adiciona a nova tarefa à lista
      ...tarefas,
      { texto: tarefa, concluida: false }
    ]);

    setTarefa("");
  }

  function removerTarefa(index: number) { // Função para remover uma tarefa
    const novaLista = tarefas.filter((_, i) => i !== index);  // Filtra a tarefa a ser removida
    setTarefas(novaLista);
  }

  function alternarConclusao(index: number) { // Função para alternar o status de conclusão
    const novaLista = tarefas.map((item, i) => // Mapeia a lista de tarefas
      i === index
        ? { ...item, concluida: !item.concluida }
        : item
    );

    setTarefas(novaLista);
  }

  return (
    <div className="todo-container">
      <h2>Minha Lista de Tarefas</h2>

      <div className="todo-input">
        <input
          type="text"
          placeholder="Digite uma tarefa"
          value={tarefa}
          onChange={(e) => setTarefa(e.target.value)}
        />

        <button onClick={adicionarTarefa}>Adicionar</button>
      </div>

      <p>Total de tarefas: {tarefas.length}</p>

      <ul className="todo-list">
        {tarefas.map((item, index) => (
          <li
            key={index}
            style={{
              textDecoration: item.concluida ? "line-through" : "none",
              opacity: item.concluida ? 0.6 : 1,
            }}
          >
            <span onClick={() => alternarConclusao(index)}>
              {item.texto}
            </span>

            <button onClick={() => removerTarefa(index)}></button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;


