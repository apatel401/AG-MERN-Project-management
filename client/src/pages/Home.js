import Clients from "../components/Clients";
import Projects from "../components/Projects";
import AddClientModal from "../components/AddClientModal";

export default function Home() {
  return (
    <>
      <AddClientModal />
      <Projects />
      <Clients />
    </>
  );
}
