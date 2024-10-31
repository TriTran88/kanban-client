import "./App.css";
import KanbanBoard from "./components/kanban-board";
function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-center text-3xl font-bold mb-6">
          Kanban Ticket Management
        </h1>
        <KanbanBoard />
      </div>
    </div>
  );
}

export default App;
