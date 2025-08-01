"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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

interface EditEmployeeDialogProps {
  employee: Employee | null
  isOpen: boolean
  onClose: () => void
  onSave: (updatedEmployee: Employee) => void
}

export function EditEmployeeDialog({ employee, isOpen, onClose, onSave }: EditEmployeeDialogProps) {
  const [formData, setFormData] = useState<Employee | null>(employee)

  // Update form data when employee prop changes
  useState(() => {
    setFormData(employee)
  }, [employee])

  if (!formData) return null

  const handleSave = () => {
    if (formData) {
      onSave(formData)
      onClose()
    }
  }

  const handleInputChange = (field: keyof Employee, value: string | number) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Employee Details</DialogTitle>
          <DialogDescription>Update employee information and performance metrics.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter full name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => handleInputChange("position", e.target.value)}
                placeholder="Enter job position"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="department">Department</Label>
              <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
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
              <Label htmlFor="performance">Performance (%)</Label>
              <Input
                id="performance"
                type="number"
                min="0"
                max="100"
                value={formData.performance}
                onChange={(e) => handleInputChange("performance", Number.parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="attendance">Attendance (%)</Label>
              <Input
                id="attendance"
                type="number"
                min="0"
                max="100"
                value={formData.attendance}
                onChange={(e) => handleInputChange("attendance", Number.parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lateComings">Late Comings</Label>
              <Input
                id="lateComings"
                type="number"
                min="0"
                value={formData.lateComings}
                onChange={(e) => handleInputChange("lateComings", Number.parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="tasksCompleted">Tasks Completed</Label>
              <Input
                id="tasksCompleted"
                type="number"
                min="0"
                value={formData.tasksCompleted}
                onChange={(e) => handleInputChange("tasksCompleted", Number.parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="totalTasks">Total Tasks</Label>
              <Input
                id="totalTasks"
                type="number"
                min="0"
                value={formData.totalTasks}
                onChange={(e) => handleInputChange("totalTasks", Number.parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="on-leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
