"use client";

import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";

import { DataTableColumnHeader } from "@/app/users/data-table-column-header";
import { DataTableRowActions } from "@/app/users/data-table-row-actions";
import { usersRole, usersStatus } from "@/app/users/definitions";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"ID"} />,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("id")}</div>;
    },
  },
  {
    accessorKey: "userName",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"User"} />,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("userName")}</div>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"Email"} />,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"Phone"} />,
  },
  {
    accessorKey: "location",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"Location"} />,
  },
  {
    accessorKey: "role",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"Role"} />,
    cell: ({ row }) => {
      const role = usersRole.find((role) => role.value === row.getValue("role"));

      if (!role) {
        // If a value is not what you expect or does not exist you can return null.
        return null;
      }

      return <span>{role.label}</span>;
    },
  },
  {
    accessorKey: "rtn",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"RTN"} />,
  },
  {
    accessorKey: "otherInformation",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"Other Info"} />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"Status"} />,
    cell: ({ row }) => {
      const status = usersStatus.find((status) => status.value === row.getValue("status"));

      if (!status) {
        return null;
      }

      return (
        <div
          className={clsx("flex w-[100px] items-center", {
            "text-red-500": status.value === "inactive",
            "text-green-500": status.value === "active",
          })}>
          {status.icon && <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
