import { LayoutGridIcon, PackageIcon, ShoppingBasketIcon } from "lucide-react";
import SideBarButton from "./sidebar-button";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white">
      <div className="px-32 py-6">
        <h1 className="text-2xl font-bold">STOCKLY</h1>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <SideBarButton href="/">
          <LayoutGridIcon size={20} />
          Dashboar
        </SideBarButton>

        <SideBarButton href="/products">
          <PackageIcon size={20} />
          Produtos
        </SideBarButton>

        <SideBarButton href="/sales">
          <ShoppingBasketIcon size={20} />
          Vendas
        </SideBarButton>
      </div>
    </div>
  );
};

export default Sidebar;
