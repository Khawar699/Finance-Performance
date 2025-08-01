"use client"

import { DailyAttendanceEntry } from "@/components/daily-attendance-entry"

interface Employee {
  id: number
  name: string
  position: string
  department: string
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

interface DailyAttendanceTabProps {
  employees: Employee[]
  attendanceRecords: AttendanceEntry[]
  onAddAttendance?: (entry: AttendanceEntry) => void
  onUpdateAttendance?: (entry: AttendanceEntry) => void
}

export function DailyAttendanceTab({
  employees,
  attendanceRecords,
  onAddAttendance,
  onUpdateAttendance,
}: DailyAttendanceTabProps) {
  return (
    <DailyAttendanceEntry
      employees={employees}
      attendanceRecords={attendanceRecords}
      onAddAttendance={onAddAttendance || (() => {})}
      onUpdateAttendance={onUpdateAttendance || (() => {})}
    />
  )
}
