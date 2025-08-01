"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Plus, Calendar, User, CheckCircle, Clock, AlertCircle, MoreVertical, Check, AlertTriangle } from "lucide-react"

interface Employee {
  id: number
  name: string
  position: string
  tasksCompleted: number
  totalTasks: number
}

interface Task {
  id: number
  title: string
  description: string
  assignedTo: number
  assignedBy: string
  priority: "low" | "medium" | "high"
  status: "pending" | "in-progress" | "completed-ontime" | "completed-late" | "overdue"
  dueDate: string
  createdDate: string
  completedDate?: string
  completionType?: "ontime" | "late"
}

interface TaskManagementProps {
  employees: Employee[]
}

// Mock tasks data with updated employee names
const mockTasks: Task[] = [
  {
    id: 1,
    title: "Monthly Financial Report",
    description: "Prepare comprehensive monthly financial report for Q4",
    assignedTo: 1,
    assignedBy: "Finance Manager",
    priority: "high",
    status: "in-progress",
    dueDate: "2024-02-15",
    createdDate: "2024-02-01",
  },
  {
    id: 2,
    title: "Budget Analysis",
    description: "Analyze budget variances for the marketing department",
    assignedTo: 2,
    assignedBy: "Finance Manager",
    priority: "medium",
    status: "completed-ontime",
    dueDate: "2024-02-10",
    createdDate: "2024-01-28",
    completedDate: "2024-02-09",
    completionType: "ontime",
  },
  {
    id: 3,
    title: "Invoice Processing",
    description: "Process pending invoices from vendors",
    assignedTo: 3,
    assignedBy: "Finance Manager",
    priority: "high",
    status: "pending",
    dueDate: "2024-02-12",
    createdDate: "2024-02-05",
  },
  {
    id: 4,
    title: "Tax Documentation Review",
    description: "Review and organize tax documentation for audit",
    assignedTo: 6,
    assignedBy: "Finance Manager",
    priority: "medium",
    status: "completed-late",
    dueDate: "2024-02-08",
    createdDate: "2024-01-25",
    completedDate: "2024-02-10",
    completionType: "late",
  },
]

export function TaskManagement({ employees }: TaskManagementProps) {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "medium",
    dueDate: "",
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed-ontime":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "completed-late":
        return <CheckCircle className="h-4 w-4 text-orange-600" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed-ontime":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Completed On Time
          </Badge>
        )
      case "completed-late":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            Completed Late
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            In Progress
          </Badge>
        )
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>
      default:
        return <Badge variant="outline">Pending</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge variant="secondary">Medium</Badge>
      default:
        return <Badge variant="outline">Low</Badge>
    }
  }

  const handleCreateTask = () => {
    if (newTask.title && newTask.assignedTo && newTask.dueDate) {
      const task: Task = {
        id: tasks.length + 1,
        title: newTask.title,
        description: newTask.description,
        assignedTo: Number.parseInt(newTask.assignedTo),
        assignedBy: "Finance Manager",
        priority: newTask.priority as "low" | "medium" | "high",
        status: "pending",
        dueDate: newTask.dueDate,
        createdDate: new Date().toISOString().split("T")[0],
      }

      setTasks([...tasks, task])
      setNewTask({
        title: "",
        description: "",
        assignedTo: "",
        priority: "medium",
        dueDate: "",
      })
      setIsDialogOpen(false)
    }
  }

  const handleCompleteTask = (taskId: number, completionType: "ontime" | "late") => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: completionType === "ontime" ? "completed-ontime" : "completed-late",
              completedDate: new Date().toISOString().split("T")[0],
              completionType,
            }
          : task,
      ),
    )
  }

  const handleUpdateTaskStatus = (taskId: number, newStatus: Task["status"]) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))
  }

  const getEmployeeName = (employeeId: number) => {
    const employee = employees.find((emp) => emp.id === employeeId)
    return employee ? employee.name : "Unknown"
  }

  const isTaskOverdue = (task: Task) => {
    const today = new Date()
    const dueDate = new Date(task.dueDate)
    return today > dueDate && !task.status.includes("completed")
  }

  return (
    <div className="space-y-6">
      {/* Task Assignment Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Task Management</CardTitle>
              <CardDescription>Assign and track tasks for your team members</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Assign New Task
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Assign New Task</DialogTitle>
                  <DialogDescription>Create and assign a new task to a team member.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Task Title</Label>
                    <Input
                      id="title"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      placeholder="Enter task title"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      placeholder="Enter task description"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="assignee">Assign To</Label>
                    <Select
                      value={newTask.assignedTo}
                      onValueChange={(value) => setNewTask({ ...newTask, assignedTo: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                      <SelectContent>
                        {employees.map((employee) => (
                          <SelectItem key={employee.id} value={employee.id.toString()}>
                            {employee.name} - {employee.position}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={newTask.priority}
                        onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleCreateTask}>
                    Assign Task
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => {
              const isOverdue = isTaskOverdue(task)
              const canComplete = task.status === "pending" || task.status === "in-progress"

              return (
                <div key={task.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <h3 className="font-medium text-lg">{task.title}</h3>
                      <p className="text-gray-600 text-sm">{task.description}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {getPriorityBadge(task.priority)}
                      {getStatusBadge(isOverdue && !task.status.includes("completed") ? "overdue" : task.status)}

                      {/* Task Actions Dropdown */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {canComplete && (
                            <>
                              <DropdownMenuItem onClick={() => handleCompleteTask(task.id, "ontime")}>
                                <Check className="mr-2 h-4 w-4 text-green-600" />
                                Mark Complete (On Time)
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleCompleteTask(task.id, "late")}>
                                <AlertTriangle className="mr-2 h-4 w-4 text-orange-600" />
                                Mark Complete (Late)
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateTaskStatus(task.id, "in-progress")}>
                                <Clock className="mr-2 h-4 w-4 text-blue-600" />
                                Mark In Progress
                              </DropdownMenuItem>
                            </>
                          )}
                          {task.status.includes("completed") && (
                            <DropdownMenuItem onClick={() => handleUpdateTaskStatus(task.id, "pending")}>
                              <Clock className="mr-2 h-4 w-4 text-gray-600" />
                              Reopen Task
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>Assigned to: {getEmployeeName(task.assignedTo)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                      {task.completedDate && (
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4" />
                          <span>Completed: {new Date(task.completedDate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(isOverdue && !task.status.includes("completed") ? "overdue" : task.status)}
                      <span>Created: {new Date(task.createdDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Quick Action Buttons for Pending/In-Progress Tasks */}
                  {canComplete && (
                    <div className="flex gap-2 pt-2 border-t">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCompleteTask(task.id, "ontime")}
                        className="text-green-600 border-green-200 hover:bg-green-50"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Complete On Time
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCompleteTask(task.id, "late")}
                        className="text-orange-600 border-orange-200 hover:bg-orange-50"
                      >
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Complete Late
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUpdateTaskStatus(task.id, "in-progress")}
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        <Clock className="h-4 w-4 mr-1" />
                        In Progress
                      </Button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Employee Task Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Task Summary</CardTitle>
          <CardDescription>Overview of task distribution and completion rates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {employees.map((employee) => {
              const employeeTasks = tasks.filter((task) => task.assignedTo === employee.id)
              const completedOnTime = employeeTasks.filter((task) => task.status === "completed-ontime").length
              const completedLate = employeeTasks.filter((task) => task.status === "completed-late").length
              const pendingTasks = employeeTasks.filter((task) => task.status === "pending").length
              const inProgressTasks = employeeTasks.filter((task) => task.status === "in-progress").length
              const overdueTasks = employeeTasks.filter((task) => isTaskOverdue(task)).length

              return (
                <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <img
                      src={`/placeholder.svg?height=40&width=40`}
                      alt={employee.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-medium">{employee.name}</h3>
                      <p className="text-sm text-gray-600">{employee.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-green-600">{completedOnTime}</div>
                      <div className="text-xs text-gray-500">On Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-orange-600">{completedLate}</div>
                      <div className="text-xs text-gray-500">Late</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-blue-600">{inProgressTasks}</div>
                      <div className="text-xs text-gray-500">In Progress</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-600">{pendingTasks}</div>
                      <div className="text-xs text-gray-500">Pending</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-red-600">{overdueTasks}</div>
                      <div className="text-xs text-gray-500">Overdue</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold">{employeeTasks.length}</div>
                      <div className="text-xs text-gray-500">Total</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
