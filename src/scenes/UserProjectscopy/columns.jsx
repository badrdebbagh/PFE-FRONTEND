import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "../../componentsShadn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../componentsShadn/ui/dropdown-menu";
import { getProjectRoles } from "../../state/authentication/Action";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../componentsShadn/ui/select";

const useProjectColumns = () => {
  const { projectRoles } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const loadRoles = () => {
    dispatch(getProjectRoles());
  };

  const columns = [
    {
      accessorKey: "id",
      header: "id",
    },
    {
      accessorKey: "nom",
      header: "nom",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              {projectRoles.map((projectRole) => (
                <SelectItem key={projectRole} value={projectRole}>
                  {projectRole}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      },
    },
  ];
  return columns;
};

export default useProjectColumns;
