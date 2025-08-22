import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  GraduationCap,
  FileText,
  Edit,
  Download
} from "lucide-react";

export default function Profile() {
  // Dummy employee data
  const employeeData = {
    id: "EMP001",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@guc.edu.eg",
    phone: "+20 123 456 7890",
    address: "5th Settlement, New Cairo, Egypt",
    position: "Software Engineer",
    department: "IT Department",
    employeeId: "GUC2024001",
    joinDate: "January 15, 2024",
    status: "Active",
    manager: "Dr. Sarah Ahmed",
    salary: "₹50,000",
    avatar: "/placeholder.svg",
    dateOfBirth: "March 12, 1995",
    nationality: "Egyptian",
    education: "Bachelor's in Computer Science",
    emergencyContact: "+20 111 222 3333",
    bankAccount: "1234567890",
    documents: [
      { name: "Employment Contract", type: "PDF", uploadDate: "Jan 15, 2024" },
      { name: "ID Copy", type: "PDF", uploadDate: "Jan 15, 2024" },
      { name: "CV", type: "PDF", uploadDate: "Jan 15, 2024" },
      { name: "Certificates", type: "PDF", uploadDate: "Jan 15, 2024" }
    ]
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Employee Profile</h1>
          <p className="text-muted-foreground">View and manage your profile information</p>
        </div>
        <Button className="w-full md:w-auto">
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center pb-4">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={employeeData.avatar} alt={employeeData.name} />
                <AvatarFallback className="text-xl bg-primary/10 text-primary">
                  {employeeData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">{employeeData.name}</CardTitle>
              <p className="text-muted-foreground">{employeeData.position}</p>
              <Badge variant="secondary" className="mt-2">
                {employeeData.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{employeeData.employeeId}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm break-all">{employeeData.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{employeeData.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{employeeData.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Joined {employeeData.joinDate}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" value={employeeData.name} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" value={employeeData.dateOfBirth} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input id="nationality" value={employeeData.nationality} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergency">Emergency Contact</Label>
                  <Input id="emergency" value={employeeData.emergencyContact} readOnly />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="mr-2 h-5 w-5" />
                Job Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" value={employeeData.position} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" value={employeeData.department} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manager">Manager</Label>
                  <Input id="manager" value={employeeData.manager} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary</Label>
                  <Input id="salary" value={employeeData.salary} readOnly />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Education & Banking */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="education">Highest Qualification</Label>
                  <Input id="education" value={employeeData.education} readOnly />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Banking Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="bank">Bank Account</Label>
                  <Input id="bank" value={employeeData.bankAccount} readOnly />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {employeeData.documents.map((doc, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">Uploaded on {doc.uploadDate}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}