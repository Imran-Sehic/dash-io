import { Header } from "../components/Header";

const MainLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="h-[100vh] font-rubik">
      <div className="overflow-auto h-screen flex flex-col">
        <Header />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
