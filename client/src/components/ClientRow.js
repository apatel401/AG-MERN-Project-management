import { FaTrash } from "react-icons/fa";
import { DELETE_CLIENT } from "./mutations/ClientMutation";
import { useMutation } from "@apollo/client";

export default function ClientRow({ client }) {
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: {id: client.id}
    })
  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
