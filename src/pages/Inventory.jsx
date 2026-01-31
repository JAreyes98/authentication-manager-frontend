// Opción A: Export default al final
function Inventory() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">API Inventory</h1>
      <p className="text-slate-400">Aquí irá la tabla conectada al Auth Service.</p>
    </div>
  );
}

export default Inventory; // <--- ESTO ES LO QUE FALTA