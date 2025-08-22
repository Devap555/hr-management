import { useState } from "react";
import { Calendar, Plus, Filter, CheckCircle, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import StatsCard from "@/components/dashboard/StatsCard";

const mockLeaveRequests = [
  {
    id: 1,
    employee: "Alice Brown",
    avatar: "/placeholder.svg",
    leaveType: "Sick Leave",
    startDate: "2024-01-22",
    endDate: "2024-01-24",
    days: 3,
    reason: "Fever and flu symptoms",
    status: "Pending",
    appliedDate: "2024-01-20"
  },
  {
    id: 2,
    employee: "Robert Taylor",
    avatar: "/placeholder.svg",
    leaveType: "Vacation",
    startDate: "2024-02-01",
    endDate: "2024-02-05",
    days: 5,
    reason: "Family vacation to Europe",
    status: "Approved",
    appliedDate: "2024-01-15"
  },
  {
    id: 3,
    employee: "Lisa Garcia",
    avatar: "/placeholder.svg",
    leaveType: "Personal",
    startDate: "2024-01-25",
    endDate: "2024-01-25",
    days: 1,
    reason: "Personal appointment",
    status: "Pending",
    appliedDate: "2024-01-19"
  },
  {
    id: 4,
    employee: "David Wilson",
    avatar: "/placeholder.svg",
    leaveType: "Emergency",
    startDate: "2024-01-18",
    endDate: "2024-01-19",
    days: 2,
    reason: "Family emergency",
    status: "Rejected",
    appliedDate: "2024-01-17"
  },
];

export default function LeaveRequests() {
  const [statusFilter, setStatusFilter] = useState("All");

  const getStatusBadge = (status: string) => {
    const variants = {
      Pending: "bg-warning text-warning-foreground",
      Approved: "bg-success text-success-foreground",
      Rejected: "bg-error text-error-foreground",
    };
    return variants[status as keyof typeof variants] || "bg-muted text-muted-foreground";
  };

  const getLeaveTypeBadge = (type: string) => {
    const variants = {
      "Sick Leave": "bg-red-100 text-red-800",
      "Vacation": "bg-blue-100 text-blue-800", 
      "Personal": "bg-purple-100 text-purple-800",
      "Emergency": "bg-orange-100 text-orange-800",
    };
    return variants[type as keyof typeof variants] || "bg-gray-100 text-gray-800";
  };

  const filteredRequests = statusFilter === "All" 
    ? mockLeaveRequests 
    : mockLeaveRequests.filter(request => request.status === statusFilter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Leave Requests</h1>
          <p className="text-muted-foreground mt-1">Apply for leave and track your requests</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">View Balance</Button>
          <Button className="bg-gradient-primary hover:shadow-medium transition-all duration-300">
            <Plus size={18} className="mr-2" />
            Apply for Leave
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="Pending Requests"
          value={8}
          icon={Clock}
          change="2 new today"
          changeType="neutral"
        />
        <StatsCard
          title="Approved This Month"
          value={24}
          icon={CheckCircle}
          change="+18% from last month"
          changeType="positive"
        />
        <StatsCard
          title="Rejected"
          value={3}
          icon={XCircle}
          change="Lower than last month"
          changeType="positive"
        />
        <StatsCard
          title="Total Leave Days"
          value={156}
          icon={Calendar}
          change="Used this year"
          changeType="neutral"
        />
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Filter by status:</span>
            <div className="flex gap-2">
              {["All", "Pending", "Approved", "Rejected"].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className={statusFilter === status ? "bg-primary" : ""}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leave Requests Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Leave Applications ({filteredRequests.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id} className="hover:bg-muted/30">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={request.avatar} alt={request.employee} />
                        <AvatarFallback>{request.employee.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-foreground">{request.employee}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getLeaveTypeBadge(request.leaveType)}>
                      {request.leaveType}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium">{request.days} day{request.days > 1 ? 's' : ''}</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs truncate">
                    {request.reason}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(request.appliedDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(request.status)}>
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {request.status === "Pending" && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                          Reject
                        </Button>
                        <Button size="sm" className="h-7 px-2 text-xs bg-success hover:bg-success/90">
                          Approve
                        </Button>
                      </div>
                    )}
                    {request.status !== "Pending" && (
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                        View Details
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Leave Balance Summary */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Leave Balance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-card rounded-lg">
              <h3 className="text-lg font-semibold text-foreground">Annual Leave</h3>
              <p className="text-2xl font-bold text-primary">18/25</p>
              <p className="text-sm text-muted-foreground">Days remaining</p>
            </div>
            <div className="text-center p-4 bg-gradient-card rounded-lg">
              <h3 className="text-lg font-semibold text-foreground">Sick Leave</h3>
              <p className="text-2xl font-bold text-primary">8/12</p>
              <p className="text-sm text-muted-foreground">Days remaining</p>
            </div>
            <div className="text-center p-4 bg-gradient-card rounded-lg">
              <h3 className="text-lg font-semibold text-foreground">Personal Leave</h3>
              <p className="text-2xl font-bold text-primary">5/8</p>
              <p className="text-sm text-muted-foreground">Days remaining</p>
            </div>
            <div className="text-center p-4 bg-gradient-card rounded-lg">
              <h3 className="text-lg font-semibold text-foreground">Emergency Leave</h3>
              <p className="text-2xl font-bold text-primary">3/5</p>
              <p className="text-sm text-muted-foreground">Days remaining</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}