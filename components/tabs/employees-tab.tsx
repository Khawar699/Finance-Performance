"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, Mail, Phone, Edit, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

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
  onEmployeeAdd?: (employee: Employee) => void
}

export function EmployeesTab({ employees, onEmployeeSelect, onEmployeeEdit, onEmployeeAdd }: EmployeesTabProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [performanceFilter, setPerformanceFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
    performance: 85,
    attendance: 95,
    tasksCompleted: 0,
    totalTasks: 0,
    lateComings: 0,
  })

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.email && newEmployee.position && newEmployee.department) {
      const employee = {
        id: Math.max(...employees.map((emp) => emp.id)) + 1,
        name: newEmployee.name,
        position: newEmployee.position,
        department: newEmployee.department,
        email: newEmployee.email,
        avatar: "/placeholder.svg?height=40&width=40",
        performance: newEmployee.performance,
        attendance: newEmployee.attendance,
        tasksCompleted: newEmployee.tasksCompleted,
        totalTasks: newEmployee.totalTasks,
        lateComings: newEmployee.lateComings,
        status: "active",
      }

      if (onEmployeeAdd) {
        onEmployeeAdd(employee)
      }

      setNewEmployee({
        name: "",
        email: "",
        position: "",
        department: "",
        performance: 85,
        attendance: 95,
        tasksCompleted: 0,
        totalTasks: 0,
        lateComings: 0,
      })
      setIsAddDialogOpen(false)
    }
  }

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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Employee Directory</CardTitle>
              <CardDescription>Manage and view all team members</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Employee
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Employee</DialogTitle>
                  <DialogDescription>Create a new employee profile for the team.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="newName">Full Name</Label>
                      <Input
                        id="newName"
                        value={newEmployee.name}
                        onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                        placeholder="Enter full name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="newEmail">Email</Label>
                      <Input
                        id="newEmail"
                        type="email"
                        value={newEmployee.email}
                        onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="newPosition">Position</Label>
                      <Input
                        id="newPosition"
                        value={newEmployee.position}
                        onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                        placeholder="Enter job position"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="newDepartment">Department</Label>
                      <Select
                        value={newEmployee.department}
                        onValueChange={(value) => setNewEmployee({ ...newEmployee, department: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Accounting">Accounting</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="HR">Human Resources</SelectItem>
                          <SelectItem value="IT">Information Technology</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="newPerformance">Performance (%)</Label>
                      <Input
                        id="newPerformance"
                        type="number"
                        min="0"
                        max="100"
                        value={newEmployee.performance}
                        onChange={(e) =>
                          setNewEmployee({ ...newEmployee, performance: Number.parseInt(e.target.value) || 0 })
                        }
                        placeholder="85"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="newAttendance">Attendance (%)</Label>
                      <Input
                        id="newAttendance"
                        type="number"
                        min="0"
                        max="100"
                        value={newEmployee.attendance}
                        onChange={(e) =>
                          setNewEmployee({ ...newEmployee, attendance: Number.parseInt(e.target.value) || 0 })
                        }
                        placeholder="95"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="newLateComings">Late Comings</Label>
                      <Input
                        id="newLateComings"
                        type="number"
                        min="0"
                        value={newEmployee.lateComings}
                        onChange={(e) =>
                          setNewEmployee({ ...newEmployee, lateComings: Number.parseInt(e.target.value) || 0 })
                        }
                        placeholder="2"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="newTasksCompleted">Tasks Completed</Label>
                      <Input
                        id="newTasksCompleted"
                        type="number"
                        min="0"
                        value={newEmployee.tasksCompleted}
                        onChange={(e) =>
                          setNewEmployee({ ...newEmployee, tasksCompleted: Number.parseInt(e.target.value) || 0 })
                        }
                        placeholder="20"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="newTotalTasks">Total Tasks</Label>
                      <Input
                        id="newTotalTasks"
                        type="number"
                        min="0"
                        value={newEmployee.totalTasks}
                        onChange={(e) =>
                          setNewEmployee({ ...newEmployee, totalTasks: Number.parseInt(e.target.value) || 0 })
                        }
                        placeholder="25"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddEmployee}>Add Employee</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
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
