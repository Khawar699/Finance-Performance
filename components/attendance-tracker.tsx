"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import { format } from "date-fns"

interface Employee {
  id: number
  name: string
  position: string
  attendance: number
  lateComings: number
}

interface AttendanceTrackerProps {
  employees: Employee[]
  period: string
}

// Mock attendance data
const generateAttendanceData = (employeeId: number) => {
  const data = []
  const today = new Date()

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    const random = Math.random()
    let status = "present"
    let timeIn = "09:00"

    if (random < 0.05) {
      status = "absent"
      timeIn = "-"
    } else if (random < 0.15) {
      status = "late"
      timeIn = "09:" + (15 + Math.floor(Math.random() * 45)).toString().padStart(2, "0")
    } else {
      timeIn = "08:" + (45 + Math.floor(Math.random() * 15)).toString().padStart(2, "0")
    }

    data.push({
      date: format(date, "yyyy-MM-dd"),
      status,
      timeIn,
      timeOut: status === "absent" ? "-" : "17:" + (30 + Math.floor(Math.random() * 30)).toString().padStart(2, "0"),
    })
  }

  return data
}

export function AttendanceTracker({ employees, period }: AttendanceTrackerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null)

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
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Present
          </Badge>
        )
      case "late":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Late
          </Badge>
        )
      case "absent":
        return <Badge variant="destructive">Absent</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Attendance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Summary - {period.charAt(0).toUpperCase() + period.slice(1)}</CardTitle>
          <CardDescription>Track daily attendance and punctuality</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {employees.map((employee) => {
              const attendanceData = generateAttendanceData(employee.id)
              const presentDays = attendanceData.filter((d) => d.status === "present").length
              const lateDays = attendanceData.filter((d) => d.status === "late").length
              const absentDays = attendanceData.filter((d) => d.status === "absent").length

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
                        <p className="text-sm text-gray-600">{employee.position}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedEmployee(selectedEmployee === employee.id ? null : employee.id)}
                    >
                      {selectedEmployee === employee.id ? "Hide Details" : "View Details"}
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{presentDays}</div>
                      <div className="text-xs text-green-700">Present Days</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">{lateDays}</div>
                      <div className="text-xs text-yellow-700">Late Days</div>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">{absentDays}</div>
                      <div className="text-xs text-red-700">Absent Days</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{employee.attendance}%</div>
                      <div className="text-xs text-blue-700">Attendance Rate</div>
                    </div>
                  </div>

                  {selectedEmployee === employee.id && (
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-3">Last 30 Days Attendance</h4>
                      <div className="grid gap-2 max-h-60 overflow-y-auto">
                        {attendanceData.reverse().map((record, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(record.status)}
                              <span className="text-sm">{format(new Date(record.date), "MMM dd, yyyy")}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-sm">In: {record.timeIn}</span>
                              <span className="text-sm">Out: {record.timeOut}</span>
                              {getStatusBadge(record.status)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
