"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Mail, Phone, Calendar, TrendingUp, Clock, CheckCircle, AlertTriangle } from "lucide-react"

interface Employee {
  id: number
  name: string
  position: string
  department: string
  email: string
  avatar: string
  performance: number
  attendance: number
  tasksCompleted: number
  totalTasks: number
  lateComings: number
  status: string
}

interface EmployeeDetailsProps {
  employee: Employee
  onBack: () => void
}

export function EmployeeDetails({ employee, onBack }: EmployeeDetailsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  // Mock detailed data
  const performanceHistory = [
    { month: "Jan", performance: 88, attendance: 94, tasks: 25 },
    { month: "Feb", performance: 92, attendance: 96, tasks: 28 },
    { month: "Mar", performance: 90, attendance: 92, tasks: 26 },
    { month: "Apr", performance: 94, attendance: 98, tasks: 30 },
  ]

  const recentActivities = [
    {
      date: "2024-02-08",
      activity: "Completed Monthly Financial Report",
      type: "task_completed",
      time: "14:30",
    },
    {
      date: "2024-02-07",
      activity: "Attended Budget Planning Meeting",
      type: "meeting",
      time: "10:00",
    },
    {
      date: "2024-02-06",
      activity: "Late arrival - 9:15 AM",
      type: "late_arrival",
      time: "09:15",
    },
    {
      date: "2024-02-05",
      activity: "Submitted Expense Analysis Report",
      type: "task_completed",
      time: "16:45",
    },
  ]

  const jobDescription = {
    responsibilities: [
      "Prepare monthly and quarterly financial reports",
      "Analyze budget variances and provide recommendations",
      "Maintain accurate accounting records and documentation",
      "Assist in audit preparations and compliance activities",
      "Support month-end and year-end closing processes",
    ],
    kpis: [
      { name: "Report Accuracy", target: 98, current: 96 },
      { name: "Deadline Adherence", target: 95, current: 92 },
      { name: "Process Efficiency", target: 90, current: 94 },
      { name: "Client Satisfaction", target: 85, current: 88 },
    ],
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "task_completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "meeting":
        return <Calendar className="h-4 w-4 text-blue-600" />
      case "late_arrival":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Employee Details</h1>
            <p className="text-gray-600 mt-1">Comprehensive performance overview</p>
          </div>
        </div>

        {/* Employee Profile Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <img src={employee.avatar || "/placeholder.svg"} alt={employee.name} className="w-24 h-24 rounded-full" />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{employee.name}</h2>
                    <p className="text-gray-600 text-lg">{employee.position}</p>
                    <p className="text-gray-500">{employee.department} Department</p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        <span>{employee.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        <span>+1 (555) 123-4567</span>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={
                      employee.performance >= 90 ? "default" : employee.performance >= 80 ? "secondary" : "destructive"
                    }
                  >
                    {employee.performance >= 90
                      ? "Excellent"
                      : employee.performance >= 80
                        ? "Good"
                        : "Needs Improvement"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Overall Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{employee.performance}%</div>
              <Progress value={employee.performance} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{employee.attendance}%</div>
              <Progress value={employee.attendance} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {employee.tasksCompleted}/{employee.totalTasks}
              </div>
              <Progress value={(employee.tasksCompleted / employee.totalTasks) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Late Comings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{employee.lateComings}</div>
              <p className="text-xs text-gray-500 mt-2">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Tabs */}
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="job-description">Job Description</TabsTrigger>
            <TabsTrigger value="activities">Recent Activities</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Monthly performance, attendance, and task completion trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {performanceHistory.map((month, index) => (
                    <div key={index} className="space-y-3">
                      <h4 className="font-medium">{month.month} 2024</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Performance</span>
                            <span>{month.performance}%</span>
                          </div>
                          <Progress value={month.performance} />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Attendance</span>
                            <span>{month.attendance}%</span>
                          </div>
                          <Progress value={month.attendance} />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Tasks</span>
                            <span>{month.tasks}</span>
                          </div>
                          <Progress value={(month.tasks / 30) * 100} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="job-description" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Key Responsibilities</CardTitle>
                  <CardDescription>Primary duties and responsibilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {jobDescription.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Performance Indicators</CardTitle>
                  <CardDescription>Performance metrics and targets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {jobDescription.kpis.map((kpi, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{kpi.name}</span>
                          <span className="font-medium">
                            {kpi.current}% / {kpi.target}%
                          </span>
                        </div>
                        <Progress value={kpi.current} className="h-2" />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Current: {kpi.current}%</span>
                          <span>Target: {kpi.target}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest work activities and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.activity}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <span>{new Date(activity.date).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Reports</CardTitle>
                <CardDescription>Generate and download detailed reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <TrendingUp className="h-6 w-6 mb-2" />
                    <span>Performance Report</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <Calendar className="h-6 w-6 mb-2" />
                    <span>Attendance Report</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <CheckCircle className="h-6 w-6 mb-2" />
                    <span>Task Summary</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <Clock className="h-6 w-6 mb-2" />
                    <span>Time Tracking</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
