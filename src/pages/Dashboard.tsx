import { Users, Clock, Calendar, CheckCircle, UserCheck, UserX, TrendingUp } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const recentActivity = [
  { id: 1, action: "You clocked in", time: "9:00 AM", type: "clock-in" },
  { id: 2, action: "You submitted leave request", time: "Yesterday", type: "leave" },
  { id: 3, action: "You clocked out", time: "6:00 PM", type: "clock-out" },
  { id: 4, action: "You updated profile", time: "2 days ago", type: "profile" },
];

const myLeaveRequests = [
  { id: 1, type: "Sick Leave", dates: "Jan 15-17", status: "approved" },
  { id: 2, type: "Vacation", dates: "Jan 20-25", status: "pending" },
  { id: 3, type: "Personal", dates: "Jan 18", status: "pending" },
];

export default function Dashboard() {
  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Employee Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, John Doe</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-medium transition-all duration-300 self-start sm:self-auto">
          Clock In/Out
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatsCard
          title="My Attendance"
          value="92%"
          icon={UserCheck}
          change="This month"
          changeType="positive"
        />
        <StatsCard
          title="Hours Worked"
          value="168h"
          icon={Clock}
          change="This month"
          changeType="positive"
        />
        <StatsCard
          title="Leave Balance"
          value={12}
          icon={Calendar}
          change="Days remaining"
          changeType="neutral"
        />
        <StatsCard
          title="Pending Requests"
          value={2}
          icon={TrendingUp}
          change="Leave requests"
          changeType="neutral"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        {/* Recent Activity */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp size={20} className="text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 lg:space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      activity.type === 'clock-in' ? 'bg-success' :
                      activity.type === 'clock-out' ? 'bg-warning' :
                      activity.type === 'leave' ? 'bg-primary' : 'bg-muted-foreground'
                    }`} />
                    <span className="text-sm text-foreground truncate">{activity.action}</span>
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* My Leave Requests */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar size={20} className="text-primary" />
              My Leave Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 lg:space-y-4">
              {myLeaveRequests.map((leave) => (
                <div key={leave.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm text-foreground truncate">{leave.type}</p>
                    <p className="text-xs text-muted-foreground">{leave.dates}</p>
                  </div>
                  <div className="flex gap-2 sm:flex-shrink-0">
                    <Badge className={
                      leave.status === 'approved' ? 'bg-success text-success-foreground' :
                      leave.status === 'pending' ? 'bg-warning text-warning-foreground' :
                      'bg-error text-error-foreground'
                    }>
                      {leave.status}
                    </Badge>
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
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" className="h-16 lg:h-20 flex-col gap-2">
              <Clock size={20} className="lg:w-6 lg:h-6" />
              <span className="text-sm lg:text-base">Mark Attendance</span>
            </Button>
            <Button variant="outline" className="h-16 lg:h-20 flex-col gap-2">
              <Calendar size={20} className="lg:w-6 lg:h-6" />
              <span className="text-sm lg:text-base">Request Leave</span>
            </Button>
            <Button variant="outline" className="h-16 lg:h-20 flex-col gap-2 sm:col-span-2 lg:col-span-1">
              <UserCheck size={20} className="lg:w-6 lg:h-6" />
              <span className="text-sm lg:text-base">Update Profile</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}