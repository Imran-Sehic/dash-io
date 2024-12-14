import MainLayout from "../layouts/MainLayout";

const About: React.FC = () => {
  return (
    <MainLayout>
      <div className="p-10 flex justify-center items-center text-center">
        <p>Dash.io je projekat u fazi razvoja. Ovo je "about us" stranica!</p>
      </div>
    </MainLayout>
  );
};

export default About;
