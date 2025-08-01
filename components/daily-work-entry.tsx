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
import { Plus, Calendar, Clock, CheckCircle } from "lucide-react"

interface Employee {
  id: number
  name: string
  position: string
}

interface WorkEntry {
  id: number
  employeeId: number
  date: string
  tasks: string[]
  hoursWorked: number
  description: string
  status: "submitted" | "approved" | "pending"
  submittedAt: string
}

interface DailyWorkEntryProps {
  employees: Employee[]
}

// Mock work entries data
const mockWorkEntries: WorkEntry[] = [
  {
    id: 1,
    employeeId: 1,
    date: "2024-02-08",
    tasks: ["Financial report preparation", "Budget analysis", "Client meeting"],
    hoursWorked: 8,
    description: "Completed monthly financial report and attended client meeting for budget discussion.",
    status: "approved",
    submittedAt: "2024-02-08T17:30:00",
  },
  {
    id: 2,
    employeeId: 2,
    date: "2024-02-08",
    tasks: ["Data analysis", "Variance report", "Team meeting"],
    hoursWorked: 7.5,
    description: "Analyzed quarterly data and prepared variance report for management review.",
    status: "submitted",
    submittedAt: "2024-02-08T18:00:00",
  },
]

export function DailyWorkEntry({ employees }: DailyWorkEntryProps) {
  const [workEntries, setWorkEntries] = useState<WorkEntry[]>(mockWorkEntries)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null)
  const [newEntry, setNewEntry] = useState({
    employeeId: "",
    date: new Date().toISOString().split("T")[0],
    tasks: "",
    hoursWorked: "",
    description: "",
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Approved
          </Badge>
        )
      case "submitted":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Submitted
          </Badge>
        )
      default:
        return <Badge variant="outline">Pending</Badge>
    }
  }

  const handleAddEntry = () => {
    if (newEntry.employeeId && newEntry.tasks && newEntry.hoursWorked && newEntry.description) {
      const entry: WorkEntry = {
        id: workEntries.length + 1,
        employeeId: Number.parseInt(newEntry.employeeId),
        date: newEntry.date,
        tasks: newEntry.tasks.split(",").map((task) => task.trim()),
        hoursWorked: Number.parseFloat(newEntry.hoursWorked),
        description: newEntry.description,
        status: "submitted",
        submittedAt: new Date().toISOString(),
      }

      setWorkEntries([...workEntries, entry])
      setNewEntry({
        employeeId: "",
        date: new Date().toISOString().split("T")[0],
        tasks: "",
        hoursWorked: "",
        description: "",
      })
      setIsDialogOpen(false)
    }
  }

  const getEmployeeName = (employeeId: number) => {
    const employee = employees.find((emp) => emp.id === employeeId)
    return employee ? employee.name : "Unknown"
  }

  const getEmployeeEntries = (employeeId: number) => {
    return workEntries.filter((entry) => entry.employeeId === employeeId)
  }

  const approveEntry = (entryId: number) => {
    setWorkEntries((entries) =>
      entries.map((entry) => (entry.id === entryId ? { ...entry, status: "approved" } : entry)),
    )
  }

  return (
    <div className="space-y-6">
      {/* Daily Work Entry Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Daily Work Entry</CardTitle>
              <CardDescription>Track daily work activities and hours for each employee</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Work Entry
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add Daily Work Entry</DialogTitle>
                  <DialogDescription>Record daily work activities and hours for an employee.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="employee">Employee</Label>
                    <Select
                      value={newEntry.employeeId}
                      onValueChange={(value) => setNewEntry({ ...newEntry, employeeId: value })}
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
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newEntry.date}
                        onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="hours">Hours Worked</Label>
                      <Input
                        id="hours"
                        type="number"
                        step="0.5"
                        min="0"
                        max="12"
                        value={newEntry.hoursWorked}
                        onChange={(e) => setNewEntry({ ...newEntry, hoursWorked: e.target.value })}
                        placeholder="8.0"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tasks">Tasks (comma-separated)</Label>
                    <Input
                      id="tasks"
                      value={newEntry.tasks}
                      onChange={(e) => setNewEntry({ ...newEntry, tasks: e.target.value })}
                      placeholder="Task 1, Task 2, Task 3"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Work Description</Label>
                    <Textarea
                      id="description"
                      value={newEntry.description}
                      onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
                      placeholder="Describe the work completed today..."
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddEntry}>
                    Add Entry
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Employee Work Entries */}
      <div className="grid gap-6">
        {employees.map((employee) => {
          const employeeEntries = getEmployeeEntries(employee.id)
          const totalHours = employeeEntries.reduce((sum, entry) => sum + entry.hoursWorked, 0)
          const avgHours = employeeEntries.length > 0 ? (totalHours / employeeEntries.length).toFixed(1) : "0"

          return (
            <Card key={employee.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={`/placeholder.svg?height=40&width=40`}
                      alt={employee.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <CardTitle className="text-lg">{employee.name}</CardTitle>
                      <CardDescription>{employee.position}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold">{employeeEntries.length}</div>
                      <div className="text-gray-500">Entries</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">{totalHours}h</div>
                      <div className="text-gray-500">Total Hours</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">{avgHours}h</div>
                      <div className="text-gray-500">Avg/Day</div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {employeeEntries.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No work entries recorded yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {employeeEntries.slice(0, 5).map((entry) => (
                      <div key={entry.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(entry.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{entry.hoursWorked} hours</span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <h4 className="font-medium">Tasks Completed:</h4>
                              <div className="flex flex-wrap gap-1">
                                {entry.tasks.map((task, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {task}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-gray-700">{entry.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(entry.status)}
                            {entry.status === "submitted" && (
                              <Button size="sm" variant="outline" onClick={() => approveEntry(entry.id)}>
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 border-t pt-2">
                          Submitted: {new Date(entry.submittedAt).toLocaleString()}
                        </div>
                      </div>
                    ))}
                    {employeeEntries.length > 5 && (
                      <Button variant="outline" className="w-full bg-transparent">
                        View All {employeeEntries.length} Entries
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
