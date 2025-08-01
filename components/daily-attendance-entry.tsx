"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, AlertTriangle, Clock } from "lucide-react"

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

interface DailyAttendanceEntryProps {
  employees: Employee[]
  attendanceRecords: AttendanceEntry[]
  onAddAttendance: (entry: AttendanceEntry) => void
  onUpdateAttendance: (entry: AttendanceEntry) => void
}

export function DailyAttendanceEntry({
  employees,
  attendanceRecords,
  onAddAttendance,
  onUpdateAttendance,
}: DailyAttendanceEntryProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [bulkEntry, setBulkEntry] = useState(false)

  const getTodayAttendance = () => {
    return attendanceRecords.filter((record) => record.date === selectedDate)
  }

  const getEmployeeAttendance = (employeeId: number) => {
    return attendanceRecords.find((record) => record.employeeId === employeeId && record.date === selectedDate)
  }

  const handleAttendanceEntry = (
    employeeId: number,
    status: "present" | "late" | "absent",
    timeIn = "",
    timeOut = "",
  ) => {
    const existingEntry = getEmployeeAttendance(employeeId)

    const entry: AttendanceEntry = {
      id: existingEntry?.id || `${employeeId}-${selectedDate}-${Date.now()}`,
      employeeId,
      date: selectedDate,
      status,
      timeIn: status === "absent" ? "-" : timeIn,
      timeOut: status === "absent" ? "-" : timeOut,
    }

    if (existingEntry) {
      onUpdateAttendance(entry)
    } else {
      onAddAttendance(entry)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "late":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "absent":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-100 text-green-800">On Time</Badge>
      case "late":
        return <Badge className="bg-yellow-100 text-yellow-800">Late</Badge>
      case "absent":
        return <Badge variant="destructive">Absent</Badge>
      default:
        return <Badge variant="outline">Not Marked</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Date Selection and Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Daily Attendance Entry</CardTitle>
              <CardDescription>Mark attendance for each employee</CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="date">Date:</Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-40"
                />
              </div>
              <Button variant="outline" onClick={() => setBulkEntry(!bulkEntry)}>
                {bulkEntry ? "Individual Entry" : "Bulk Entry"}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Individual Employee Attendance Entry */}
      <Card>
        <CardHeader>
          <CardTitle>
            Attendance for{" "}
            {new Date(selectedDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </CardTitle>
          <CardDescription>
            {getTodayAttendance().length} of {employees.length} employees marked
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {employees.map((employee) => {
              const attendance = getEmployeeAttendance(employee.id)

              return (
                <div key={employee.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`/placeholder.svg?height=40&width=40`}
                        alt={employee.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="font-medium">{employee.name}</h3>
                        <p className="text-sm text-gray-600">
                          {employee.position} • {employee.department}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {attendance && getStatusIcon(attendance.status)}
                      {getStatusBadge(attendance?.status || "")}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Status Buttons */}
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={attendance?.status === "present" ? "default" : "outline"}
                          onClick={() => handleAttendanceEntry(employee.id, "present", "09:00", "17:00")}
                          className="flex-1"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Present
                        </Button>
                        <Button
                          size="sm"
                          variant={attendance?.status === "late" ? "secondary" : "outline"}
                          onClick={() => handleAttendanceEntry(employee.id, "late", "09:15", "17:00")}
                          className="flex-1"
                        >
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Late
                        </Button>
                        <Button
                          size="sm"
                          variant={attendance?.status === "absent" ? "destructive" : "outline"}
                          onClick={() => handleAttendanceEntry(employee.id, "absent")}
                          className="flex-1"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Absent
                        </Button>
                      </div>
                    </div>

                    {/* Time In */}
                    <div className="space-y-2">
                      <Label htmlFor={`timeIn-${employee.id}`}>Time In</Label>
                      <Input
                        id={`timeIn-${employee.id}`}
                        type="time"
                        value={attendance?.timeIn === "-" ? "" : attendance?.timeIn || ""}
                        onChange={(e) => {
                          if (attendance) {
                            handleAttendanceEntry(employee.id, attendance.status, e.target.value, attendance.timeOut)
                          }
                        }}
                        disabled={attendance?.status === "absent"}
                      />
                    </div>

                    {/* Time Out */}
                    <div className="space-y-2">
                      <Label htmlFor={`timeOut-${employee.id}`}>Time Out</Label>
                      <Input
                        id={`timeOut-${employee.id}`}
                        type="time"
                        value={attendance?.timeOut === "-" ? "" : attendance?.timeOut || ""}
                        onChange={(e) => {
                          if (attendance) {
                            handleAttendanceEntry(employee.id, attendance.status, attendance.timeIn, e.target.value)
                          }
                        }}
                        disabled={attendance?.status === "absent"}
                      />
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-2">
                      <Label>Quick Actions</Label>
                      <div className="flex flex-col gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAttendanceEntry(employee.id, "present", "09:00", "17:00")}
                          className="text-xs"
                        >
                          Standard Hours
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAttendanceEntry(employee.id, "late", "09:30", "17:00")}
                          className="text-xs"
                        >
                          30min Late
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Today's Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {getTodayAttendance().filter((a) => a.status === "present").length}
              </div>
              <div className="text-sm text-green-700">Present</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {getTodayAttendance().filter((a) => a.status === "late").length}
              </div>
              <div className="text-sm text-yellow-700">Late</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {getTodayAttendance().filter((a) => a.status === "absent").length}
              </div>
              <div className="text-sm text-red-700">Absent</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">{employees.length - getTodayAttendance().length}</div>
              <div className="text-sm text-gray-700">Not Marked</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
