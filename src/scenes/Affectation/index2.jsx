import { useEffect, useState } from "react";
import DataTable from "./data-table";

import {
  assignProjectToUser,
  getProjects,
  getProjectsByUserId,
  getProjectsByUserIdAndDomain,
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
import { jwtDecode } from "jwt-decode";

const Affectation2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const onlyUser = user.filter((user) => user.role === "USER");
  console.log(onlyUser);

  const columns = [
    {
      accessorKey: "firstName",
      header: "Prenom",
      cell: ({ row }) => (
        <Button
          variant="thirdly"
          onClick={() => navigate(`/affectation/${row.original.id}`)}
        >
          {row.original.firstName}
        </Button>
      ),
    },
    {
      accessorKey: "lastName",
      header: "Nom",
    },
    {
      accessorKey: "username",
      header: "Email",
    },
  ];
  return (
    <div>
      <div className="px-8">
        <DataTable columns={columns} data={onlyUser} />
      </div>
    </div>
  );
};

export default Affectation2;
