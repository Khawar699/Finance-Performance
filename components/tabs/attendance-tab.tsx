"use client"

import { AttendanceTracker } from "@/components/attendance-tracker"

interface Employee {
  id: number
  name: string
  position: string
  attendance: number
  lateComings: number
}

interface AttendanceTabProps {
  employees: Employee[]
  period: string
}

export function AttendanceTab({ employees, period }: AttendanceTabProps) {
  return <AttendanceTracker employees={employees} period={period} />
}
