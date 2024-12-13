import { Header } from "../components/Header";

const MainLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className={`h-[100vh] font-rubik grid`}>
      <div className="overflow-auto h-screen flex flex-col">
        <Header />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
