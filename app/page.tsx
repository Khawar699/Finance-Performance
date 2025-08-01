"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { DashboardContent } from "@/components/dashboard-content"
import { EmployeeDetails } from "@/components/employee-details"
import { EditEmployeeDialog } from "@/components/edit-employee-dialog"

// Type definition for Employee
type Employee = {
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

// Type definition for AttendanceEntry
type AttendanceEntry = {
  id: string
  employeeId: number
  date: string
  status: "present" | "late" | "absent"
  timeIn: string
  timeOut: string
  notes?: string
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Max Hamilton",
      position: "Senior Accountant",
      department: "Accounting",
      email: "max.hamilton@company.com",
      avatar: "/placeholder.svg?height=40&width=40",
      performance: 92,
      attendance: 96,
      tasksCompleted: 28,
      totalTasks: 30,
      lateComings: 2,
      status: "active",
    },
    {
      id: 2,
      name: "Bilawal Ali",
      position: "Financial Analyst",
      department: "Finance",
      email: "bilawal.ali@company.com",
      avatar: "/placeholder.svg?height=40&width=40",
      performance: 88,
      attendance: 94,
      tasksCompleted: 25,
      totalTasks: 28,
      lateComings: 3,
      status: "active",
    },
    {
      id: 3,
      name: "Arthur Andersen",
      position: "Junior Accountant",
      department: "Accounting",
      email: "arthur.andersen@company.com",
      avatar: "/placeholder.svg?height=40&width=40",
      performance: 85,
      attendance: 98,
      tasksCompleted: 22,
      totalTasks: 25,
      lateComings: 1,
      status: "active",
    },
    {
      id: 4,
      name: "Peter Parker",
      position: "Budget Analyst",
      department: "Finance",
      email: "peter.parker@company.com",
      avatar: "/placeholder.svg?height=40&width=40",
      performance: 90,
      attendance: 92,
      tasksCompleted: 26,
      totalTasks: 29,
      lateComings: 4,
      status: "active",
    },
    {
      id: 5,
      name: "Robert Shiller",
      position: "Accounts Payable Specialist",
      department: "Accounting",
      email: "robert.shiller@company.com",
      avatar: "/placeholder.svg?height=40&width=40",
      performance: 87,
      attendance: 95,
      tasksCompleted: 24,
      totalTasks: 27,
      lateComings: 2,
      status: "active",
    },
    {
      id: 6,
      name: "Barry Johnson",
      position: "Tax Specialist",
      department: "Accounting",
      email: "barry.johnson@company.com",
      avatar: "/placeholder.svg?height=40&width=40",
      performance: 91,
      attendance: 97,
      tasksCompleted: 27,
      totalTasks: 29,
      lateComings: 1,
      status: "active",
    },
    {
      id: 7,
      name: "Moaaz Ahmed",
      position: "Financial Controller",
      department: "Finance",
      email: "moaaz.ahmed@company.com",
      avatar: "/placeholder.svg?height=40&width=40",
      performance: 95,
      attendance: 99,
      tasksCompleted: 31,
      totalTasks: 32,
      lateComings: 0,
      status: "active",
    },
  ])

  // Add attendance records state
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceEntry[]>([])

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee)
    setIsEditDialogOpen(true)
  }

  const handleSaveEmployee = (updatedEmployee: Employee) => {
    setEmployees((prevEmployees) => prevEmployees.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp)))
  }

  // Add attendance handlers
  const handleAddAttendance = (entry: AttendanceEntry) => {
    setAttendanceRecords((prev) => [...prev, entry])
  }

  const handleUpdateAttendance = (entry: AttendanceEntry) => {
    setAttendanceRecords((prev) => prev.map((record) => (record.id === entry.id ? entry : record)))
  }

  // Add employee handler
  const handleAddEmployee = (newEmployee: Employee) => {
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee])
  }

  if (selectedEmployee) {
    const employee = employees.find((emp) => emp.id === selectedEmployee)
    if (employee) {
      return <EmployeeDetails employee={employee} onBack={() => setSelectedEmployee(null)} />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header employees={employees} onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto">
          <DashboardContent
            activeTab={activeTab}
            employees={employees}
            onEmployeeSelect={setSelectedEmployee}
            onEmployeeEdit={handleEditEmployee}
            onEmployeeAdd={handleAddEmployee}
            attendanceRecords={attendanceRecords}
            onAddAttendance={handleAddAttendance}
            onUpdateAttendance={handleUpdateAttendance}
          />
        </main>
      </div>

      {/* Edit Employee Dialog */}
      <EditEmployeeDialog
        employee={editingEmployee}
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false)
          setEditingEmployee(null)
        }}
        onSave={handleSaveEmployee}
      />
    </div>
  )
}
