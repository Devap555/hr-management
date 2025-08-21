import { Users, Clock, Calendar, CheckCircle, UserCheck, UserX, TrendingUp } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const recentActivity = [
  { id: 1, action: "John Doe clocked in", time: "9:00 AM", type: "clock-in" },
  { id: 2, action: "Sarah Wilson submitted leave request", time: "8:45 AM", type: "leave" },
  { id: 3, action: "Mike Johnson clocked out", time: "6:00 PM", type: "clock-out" },
  { id: 4, action: "Emily Davis updated profile", time: "2:30 PM", type: "profile" },
];

const pendingLeaves = [
  { id: 1, employee: "Alice Brown", type: "Sick Leave", dates: "Jan 15-17", status: "pending" },
  { id: 2, employee: "Robert Taylor", type: "Vacation", dates: "Jan 20-25", status: "pending" },
  { id: 3, employee: "Lisa Garcia", type: "Personal", dates: "Jan 18", status: "pending" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Admin</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-medium transition-all duration-300">
          Generate Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Employees"
          value={156}
          icon={Users}
          change="+12 this month"
          changeType="positive"
        />
        <StatsCard
          title="Present Today"
          value={142}
          icon={UserCheck}
          change="91% attendance"
          changeType="positive"
        />
        <StatsCard
          title="On Leave"
          value={8}
          icon={Calendar}
          change="5 approved"
          changeType="neutral"
        />
        <StatsCard
          title="Late Arrivals"
          value={6}
          icon={Clock}
          change="-3 from yesterday"
          changeType="positive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp size={20} className="text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'clock-in' ? 'bg-success' :
                      activity.type === 'clock-out' ? 'bg-warning' :
                      activity.type === 'leave' ? 'bg-primary' : 'bg-muted-foreground'
                    }`} />
                    <span className="text-sm text-foreground">{activity.action}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Leave Requests */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar size={20} className="text-primary" />
              Pending Leave Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingLeaves.map((leave) => (
                <div key={leave.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium text-sm text-foreground">{leave.employee}</p>
                    <p className="text-xs text-muted-foreground">{leave.type} • {leave.dates}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                      Decline
                    </Button>
                    <Button size="sm" className="h-7 px-2 text-xs bg-success hover:bg-success/90">
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users size={24} />
              Add Employee
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Clock size={24} />
              View Attendance
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Calendar size={24} />
              Manage Leaves
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}