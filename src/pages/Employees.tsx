import { useState } from "react";
import { Search, Plus, Filter, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockEmployees = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@company.com",
    phone: "+1 234 567 8900",
    department: "Engineering",
    role: "Senior Developer",
    salary: 75000,
    joinDate: "2022-01-15",
    status: "Active",
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    phone: "+1 234 567 8901",
    department: "Marketing",
    role: "Marketing Manager",
    salary: 65000,
    joinDate: "2021-06-20",
    status: "Active",
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    phone: "+1 234 567 8902",
    department: "Sales",
    role: "Sales Representative",
    salary: 55000,
    joinDate: "2023-03-10",
    status: "Active",
    avatar: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@company.com",
    phone: "+1 234 567 8903",
    department: "HR",
    role: "HR Specialist",
    salary: 60000,
    joinDate: "2022-09-01",
    status: "On Leave",
    avatar: "/placeholder.svg"
  },
];

export default function Employees() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const filteredEmployees = mockEmployees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Employees</h1>
          <p className="text-muted-foreground mt-1">Manage your team members</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-medium transition-all duration-300 self-start sm:self-auto">
          <Plus size={18} className="mr-2" />
          Add Employee
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card">
        <CardContent className="p-4 lg:p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2 flex-1 sm:flex-none">
                <Filter size={18} />
                <span className="sm:inline">Filter</span>
              </Button>
              <Button variant="outline" className="flex-1 sm:flex-none">Export</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employees Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg lg:text-xl">Employee Directory ({filteredEmployees.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Employee</TableHead>
                  <TableHead className="hidden sm:table-cell">Department</TableHead>
                  <TableHead className="hidden md:table-cell">Role</TableHead>
                  <TableHead className="hidden lg:table-cell">Salary</TableHead>
                  <TableHead className="hidden lg:table-cell">Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id} className="hover:bg-muted/30">
                    <TableCell className="min-w-[200px]">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 lg:h-10 lg:w-10 flex-shrink-0">
                          <AvatarImage src={employee.avatar} alt={employee.name} />
                          <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="font-medium text-foreground truncate">{employee.name}</p>
                          <p className="text-xs lg:text-sm text-muted-foreground truncate">{employee.email}</p>
                          {/* Mobile: Show department and role */}
                          <div className="sm:hidden mt-1 space-y-1">
                            <Badge variant="secondary" className="text-xs">{employee.department}</Badge>
                            <p className="text-xs text-muted-foreground">{employee.role}</p>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="secondary">{employee.department}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">{employee.role}</TableCell>
                    <TableCell className="hidden lg:table-cell font-medium">${employee.salary.toLocaleString()}</TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">
                      {new Date(employee.joinDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={employee.status === "Active" ? "default" : "secondary"}
                        className={`text-xs ${employee.status === "Active" ? "bg-success text-success-foreground" : ""}`}
                      >
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Employee
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Employee
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}