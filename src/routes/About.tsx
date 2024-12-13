import MainLayout from "../layouts/MainLayout";

const About: React.FC = () => {
  return (
    <MainLayout>
      <div className="p-10 flex justify-center items-center">
        <p>
          Dash.io is a project still in development. This is the about page!
        </p>
      </div>
    </MainLayout>
  );
};

export default About;
