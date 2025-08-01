"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { CalendarDays, Users, TrendingUp, Clock, Eye } from "lucide-react"

interface Employee {
  id: number
  name: string
  position: string
  department: string
  avatar: string
  performance: number
  attendance: number
  tasksCompleted: number
  totalTasks: number
  lateComings: number
}

interface OverviewTabProps {
  employees: Employee[]
  onEmployeeSelect: (employeeId: number) => void
}

export function OverviewTab({ employees, onEmployeeSelect }: OverviewTabProps) {
  // Calculate summary metrics
  const totalEmployees = employees.length
  const avgPerformance = Math.round(employees.reduce((sum, emp) => sum + emp.performance, 0) / totalEmployees)
  const avgAttendance = Math.round(employees.reduce((sum, emp) => sum + emp.attendance, 0) / totalEmployees)
  const totalLateComings = employees.reduce((sum, emp) => sum + emp.lateComings, 0)
  const totalTasksCompleted = employees.reduce((sum, emp) => sum + emp.tasksCompleted, 0)
  const totalTasks = employees.reduce((sum, emp) => sum + emp.totalTasks, 0)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}</div>
            <p className="text-xs text-muted-foreground">Active team members</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgPerformance}%</div>
            <p className="text-xs text-muted-foreground">+2.5% from last month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgAttendance}%</div>
            <p className="text-xs text-muted-foreground">-1.2% from last month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late Comings</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLateComings}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Team Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Team Performance Overview</CardTitle>
          <CardDescription>Individual employee performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {employees.map((employee) => (
              <div
                key={employee.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={employee.avatar || "/placeholder.svg"}
                    alt={employee.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-lg">{employee.name}</h3>
                    <p className="text-sm text-gray-600">
                      {employee.position} • {employee.department}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-sm font-medium">{employee.performance}%</div>
                    <div className="text-xs text-gray-500">Performance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{employee.attendance}%</div>
                    <div className="text-xs text-gray-500">Attendance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">
                      {employee.tasksCompleted}/{employee.totalTasks}
                    </div>
                    <div className="text-xs text-gray-500">Tasks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{employee.lateComings}</div>
                    <div className="text-xs text-gray-500">Late</div>
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
                  <Button variant="outline" size="sm" onClick={() => onEmployeeSelect(employee.id)}>
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Task Completion Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Task Completion Summary</CardTitle>
          <CardDescription>
            Overall task completion rate: {Math.round((totalTasksCompleted / totalTasks) * 100)}%
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={(totalTasksCompleted / totalTasks) * 100} className="mb-4" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>Completed: {totalTasksCompleted}</span>
            <span>Total: {totalTasks}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
