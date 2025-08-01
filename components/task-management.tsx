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
import { Label } from "@/components/ui/label"
import { Plus, Calendar, User, CheckCircle, Clock, AlertCircle } from "lucide-react"

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
  status: "pending" | "in-progress" | "completed" | "overdue"
  dueDate: string
  createdDate: string
}

interface TaskManagementProps {
  employees: Employee[]
}

// Mock tasks data
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
    status: "completed",
    dueDate: "2024-02-10",
    createdDate: "2024-01-28",
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
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
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
      case "completed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Completed
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

  const getEmployeeName = (employeeId: number) => {
    const employee = employees.find((emp) => emp.id === employeeId)
    return employee ? employee.name : "Unknown"
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
            {tasks.map((task) => (
              <div key={task.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium text-lg">{task.title}</h3>
                    <p className="text-gray-600 text-sm">{task.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getPriorityBadge(task.priority)}
                    {getStatusBadge(task.status)}
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
                  </div>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(task.status)}
                    <span>Created: {new Date(task.createdDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
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
              const completedTasks = employeeTasks.filter((task) => task.status === "completed").length
              const pendingTasks = employeeTasks.filter((task) => task.status === "pending").length
              const inProgressTasks = employeeTasks.filter((task) => task.status === "in-progress").length

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
                      <div className="text-lg font-semibold text-green-600">{completedTasks}</div>
                      <div className="text-xs text-gray-500">Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-blue-600">{inProgressTasks}</div>
                      <div className="text-xs text-gray-500">In Progress</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-orange-600">{pendingTasks}</div>
                      <div className="text-xs text-gray-500">Pending</div>
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
