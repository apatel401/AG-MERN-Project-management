import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "./quaries/projectQueries";
import { UPDATE_PROJECT } from "./mutations/ProjectMutation";

export default function EditprojectForm({ project }) {
  const [name, setName] = useState(project.name);
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState(project.description);

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !status) {
      return alert("Please fill all field");
    }
    updateProject(name, description, status);
  };

  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            id="status"
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="new">Not Started</option>
            <option value="progress">In Progress</option>
            <option value="completed">Complete</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          data-bs-dismiss="modal"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
