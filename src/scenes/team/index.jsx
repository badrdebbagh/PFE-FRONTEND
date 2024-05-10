import { useEffect, useState } from "react";
import DataTable from "./data-table";

import {
  activateUser,
  assignProjectToUser,
  getProjects,
  getUser,
  suspendUser,
} from "../../state/authentication/Action";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../../componentsShadn/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../componentsShadn/ui/select";
import { getProjectRoles } from "../../state/authentication/Action";

const Team = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const { user } = useSelector((state) => state.auth);
  const handleSuspendUser = (id) => {
    dispatch(suspendUser(id, jwt));
  };

  const handleActivateUser = (id) => {
    dispatch(activateUser(id, jwt));
  };

  const handleAddUser = () => {
    navigate("/form");
  };

  const columns = [
    {
      accessorKey: "id",
      header: "id",
    },
    {
      accessorKey: "firstName",
      header: "Prenom",
    },
    {
      accessorKey: "lastName",
      header: "Nom",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "suspended",
      header: "Etat",
      cell: ({ row }) => (
        <div className="w-[100px] text-md">
          {row.original.suspended ? "Suspendu" : "Actif"}
        </div>
      ),
    },
    {
      header: () => <div className="text-right">Action</div>,
      id: "actions",
      cell: ({ row }) => {
        const isSuspended = row.original.suspended;
        return (
          <div className="flex justify-end">
            <Button
              onClick={() => {
                if (isSuspended) {
                  handleActivateUser(row.original.id);
                } else {
                  handleSuspendUser(row.original.id);
                }
              }}
              className=" w-[100px]"
              variant="secondary"
            >
              {isSuspended ? "Activer" : "Suspendre"}
            </Button>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(getUser(jwt));
  }, []);

  return (
    <div>
      <div>
        <DataTable columns={columns} data={user} />
      </div>
      <div className=" flex items-center justify-center mt-6">
        <Button onClick={handleAddUser} variant="secondary">
          Add User
        </Button>
      </div>
    </div>
  );
};

export default Team;
