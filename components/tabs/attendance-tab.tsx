"use client"

import { AttendanceTracker } from "@/components/attendance-tracker"

interface Employee {
  id: number
  name: string
  position: string
  attendance: number
  lateComings: number
}

interface AttendanceEntry {
  id: string
  employeeId: number
  date: string
  status: "present" | "late" | "absent"
  timeIn: string
  timeOut: string
  notes?: string
}

interface AttendanceTabProps {
  employees: Employee[]
  period: string
  attendanceRecords: AttendanceEntry[]
}

export function AttendanceTab({ employees, period, attendanceRecords }: AttendanceTabProps) {
  return <AttendanceTracker employees={employees} period={period} attendanceRecords={attendanceRecords} />
}
