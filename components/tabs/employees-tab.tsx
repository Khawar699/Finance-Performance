"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, Mail, Phone, Edit } from "lucide-react"

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

interface EmployeesTabProps {
  employees: Employee[]
  onEmployeeSelect: (employeeId: number) => void
  onEmployeeEdit?: (employee: Employee) => void
}

export function EmployeesTab({ employees, onEmployeeSelect, onEmployeeEdit }: EmployeesTabProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [performanceFilter, setPerformanceFilter] = useState("all")

  // Filter employees based on search and filters
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter

    const matchesPerformance =
      performanceFilter === "all" ||
      (performanceFilter === "excellent" && employee.performance >= 90) ||
      (performanceFilter === "good" && employee.performance >= 80 && employee.performance < 90) ||
      (performanceFilter === "needs-improvement" && employee.performance < 80)

    return matchesSearch && matchesDepartment && matchesPerformance
  })

  const departments = [...new Set(employees.map((emp) => emp.department))]

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Directory</CardTitle>
          <CardDescription>Manage and view all team members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search employees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={performanceFilter} onValueChange={setPerformanceFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by performance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Performance</SelectItem>
                <SelectItem value="excellent">Excellent (90%+)</SelectItem>
                <SelectItem value="good">Good (80-89%)</SelectItem>
                <SelectItem value="needs-improvement">Needs Improvement (&lt;80%)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={employee.avatar || "/placeholder.svg"}
                    alt={employee.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{employee.name}</h3>
                    <p className="text-sm text-gray-600">{employee.position}</p>
                    <p className="text-xs text-gray-500">{employee.department}</p>
                  </div>
                </div>
                <Badge
                  variant={
                    employee.performance >= 90 ? "default" : employee.performance >= 80 ? "secondary" : "destructive"
                  }
                >
                  {employee.performance}%
                </Badge>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{employee.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-green-600">{employee.attendance}%</div>
                  <div className="text-xs text-gray-500">Attendance</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-blue-600">
                    {employee.tasksCompleted}/{employee.totalTasks}
                  </div>
                  <div className="text-xs text-gray-500">Tasks</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-red-600">{employee.lateComings}</div>
                  <div className="text-xs text-gray-500">Late</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-transparent"
                  variant="outline"
                  onClick={() => onEmployeeSelect(employee.id)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                {onEmployeeEdit && (
                  <Button variant="outline" size="sm" onClick={() => onEmployeeEdit(employee)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">No employees found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
