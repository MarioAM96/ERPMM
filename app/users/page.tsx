import { columns } from "@/app/users/columns";
import DataTable from "@/app/users/data-table";
import { users } from "@/app/users/users";

export default async function Home() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <DataTable data={users} columns={columns} />
    </div>
  );
}