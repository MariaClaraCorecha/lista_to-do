import { useState } from "react";
import "./TodoList.css";


function TodoList() {  //Função com estado de memoria dos componentes
  const [tarefa, setTarefa] = useState<string>(""); // Estado para armazenar a tarefa atual
  const [tarefas, setTarefas] = useState<string[]>([]);//Estado para armazenar a lista de tarefas

  function adicionarTarefa() { //Função para adicionar tarefa
    if (tarefa.trim() === "") return; //Verifica se a tarefa não está vazia

    setTarefas([...tarefas, tarefa]);//adiciona nova tarefa a lista
    setTarefa("");
  }

  function removerTarefa(index: number) { //Função para remover tarefa
    const novaLista = tarefas.filter((_, i) => i !== index); //Cria uma nova lista sem a tarefa removida
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
        <li key={index}>
          {item}
          <button onClick={() => removerTarefa(index)}></button>
        </li>
      ))}
    </ul>
  </div>
);

}

export default TodoList;
