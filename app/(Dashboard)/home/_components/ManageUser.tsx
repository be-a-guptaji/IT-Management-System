// @app/(Dashboard)/home/_components/ManageUser.tsx

// Components
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SearchBar from "@/components/search/Index";

const ManageUser = () => {
  return (
    <>
      <SearchBar />
      <Table>
        <TableCaption>A list of all Users and Professionals.</TableCaption>
        <TableHeader className="bg-black/20 font-bold dark:bg-black/75">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="w-24 text-center">Edit</TableHead>
            <TableHead className="w-24 text-center">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell className="w-24 text-center">Credit Card</TableCell>
            <TableCell className="w-24 text-center">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default ManageUser;
