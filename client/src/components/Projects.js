import { useQuery } from "@apollo/client";
import ClientRow from "./ClientRow";
import { GET_PROJECTS } from "./quaries/projectQueries";
import Spinner from "./Spinner";
import ProjectCard from "./ProjectCard";

export default function Clients() {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  if (loading) return <Spinner />;
  if (error) return <p>error...</p>;
  return (
    <>
      {data.projects.length > 0 ? (
        <div className="row mt-4">
          {data.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p>No projects to show</p>
      )}
    </>
  );
}
