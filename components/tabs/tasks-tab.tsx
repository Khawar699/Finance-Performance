"use client"

import { TaskManagement } from "@/components/task-management"

interface Employee {
  id: number
  name: string
  position: string
  tasksCompleted: number
  totalTasks: number
}

interface TasksTabProps {
  employees: Employee[]
}

export function TasksTab({ employees }: TasksTabProps) {
  return <TaskManagement employees={employees} />
}
