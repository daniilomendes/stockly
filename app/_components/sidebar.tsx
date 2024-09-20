const Sidebar = () => {
  return (
    <div className="w-64 bg-white">
      {/* Imagem */}
      <div className="px-32 py-6">
        <h1 className="text-2xl font-bold">STOCKLY</h1>
      </div>

      {/* BOTÕES */}
      <div className="flex flex-col gap-2 p-2">
        <button className="px-6 py-3">Dashboard</button>
        <button className="px-6 py-3">Produtos</button>
        <button className="px-6 py-3">Vendas</button>
      </div>
    </div>
  );
};

export default Sidebar;
