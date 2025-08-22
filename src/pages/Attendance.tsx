import { useState } from "react";
import { Calendar, Clock, Users, TrendingUp, CheckCircle, XCircle } from "lucide-react";
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

const myAttendance = [
  {
    id: 1,
    date: "2024-01-22",
    checkIn: "09:00 AM",
    checkOut: "06:00 PM",
    workingHours: "9h 0m",
    status: "Present",
    overtime: "0h 0m"
  },
  {
    id: 2,
    date: "2024-01-21",
    checkIn: "09:15 AM",
    checkOut: "06:15 PM",
    workingHours: "9h 0m",
    status: "Late",
    overtime: "0h 0m"
  },
  {
    id: 3,
    date: "2024-01-20",
    checkIn: "08:45 AM",
    checkOut: "05:45 PM",
    workingHours: "9h 0m",
    status: "Present",
    overtime: "0h 0m"
  },
  {
    id: 4,
    date: "2024-01-19",
    checkIn: "-",
    checkOut: "-",
    workingHours: "-",
    status: "Absent",
    overtime: "-"
  },
];

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const getStatusBadge = (status: string) => {
    const variants = {
      Present: "bg-success text-success-foreground",
      Late: "bg-warning text-warning-foreground", 
      Absent: "bg-error text-error-foreground",
    };
    return variants[status as keyof typeof variants] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">My Attendance</h1>
          <p className="text-muted-foreground mt-1">Track your attendance and working hours</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 sm:flex-none">View History</Button>
          <Button className="bg-gradient-primary hover:shadow-medium transition-all duration-300 flex-1 sm:flex-none">
            Mark Attendance
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatsCard
          title="This Month"
          value="22/24"
          icon={CheckCircle}
          change="92% attendance"
          changeType="positive"
        />
        <StatsCard
          title="Late Days"
          value={3}
          icon={Clock}
          change="This month"
          changeType="neutral"
        />
        <StatsCard
          title="Absent Days"
          value={2}
          icon={XCircle}
          change="This month"
          changeType="neutral"
        />
        <StatsCard
          title="Avg Working Hours"
          value="8.5h"
          icon={TrendingUp}
          change="Daily average"
          changeType="positive"
        />
      </div>

      {/* Date Filter */}
      <Card className="shadow-card">
        <CardContent className="p-4 lg:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2 flex-shrink-0">
              <Calendar size={18} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Date:</span>
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground flex-1 sm:flex-none"
            />
            <div className="flex gap-2 overflow-x-auto">
              <Button variant="outline" size="sm" className="whitespace-nowrap">Today</Button>
              <Button variant="outline" size="sm" className="whitespace-nowrap">This Week</Button>
              <Button variant="outline" size="sm" className="whitespace-nowrap">This Month</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock size={20} className="text-primary" />
            My Attendance History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Working Hours</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Overtime</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myAttendance.map((record) => (
                <TableRow key={record.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{new Date(record.date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-muted-foreground">{record.checkIn}</TableCell>
                  <TableCell className="text-muted-foreground">{record.checkOut}</TableCell>
                  <TableCell className="font-medium">{record.workingHours}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(record.status)}>
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{record.overtime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Clock In/Out Section */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg lg:text-xl">Quick Clock In/Out</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div className="text-center p-4 lg:p-6 bg-gradient-card rounded-lg">
              <Clock size={36} className="lg:w-12 lg:h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg lg:text-xl font-semibold mb-2">Current Time</h3>
              <p className="text-2xl lg:text-3xl font-bold text-primary">{new Date().toLocaleTimeString()}</p>
              <Button className="mt-4 w-full bg-success hover:bg-success/90">
                Clock In
              </Button>
            </div>
            <div className="text-center p-4 lg:p-6 bg-gradient-card rounded-lg">
              <TrendingUp size={36} className="lg:w-12 lg:h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg lg:text-xl font-semibold mb-2">Today's Hours</h3>
              <p className="text-2xl lg:text-3xl font-bold text-primary">7h 30m</p>
              <Button className="mt-4 w-full bg-error hover:bg-error/90">
                Clock Out
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}