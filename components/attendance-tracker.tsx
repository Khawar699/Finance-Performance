"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, XCircle, AlertTriangle, Calendar } from "lucide-react"

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

interface AttendanceTrackerProps {
  employees: Employee[]
  period: string
  attendanceRecords: AttendanceEntry[]
}

export function AttendanceTracker({ employees, period, attendanceRecords }: AttendanceTrackerProps) {
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null)

  const getEmployeeAttendanceData = (employeeId: number) => {
    return attendanceRecords
      .filter((record) => record.employeeId === employeeId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  const calculateAttendanceStats = (employeeId: number) => {
    const records = getEmployeeAttendanceData(employeeId)
    const presentDays = records.filter((r) => r.status === "present").length
    const lateDays = records.filter((r) => r.status === "late").length
    const absentDays = records.filter((r) => r.status === "absent").length
    const totalDays = records.length
    const attendanceRate = totalDays > 0 ? Math.round(((presentDays + lateDays) / totalDays) * 100) : 0

    return { presentDays, lateDays, absentDays, totalDays, attendanceRate }
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
          <CardDescription>Track daily attendance and punctuality based on recorded data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {employees.map((employee) => {
              const stats = calculateAttendanceStats(employee.id)
              const attendanceData = getEmployeeAttendanceData(employee.id)

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
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-gray-600">{stats.totalDays} days recorded</div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedEmployee(selectedEmployee === employee.id ? null : employee.id)}
                      >
                        {selectedEmployee === employee.id ? "Hide Details" : "View Details"}
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{stats.presentDays}</div>
                      <div className="text-xs text-green-700">Present Days</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">{stats.lateDays}</div>
                      <div className="text-xs text-yellow-700">Late Days</div>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">{stats.absentDays}</div>
                      <div className="text-xs text-red-700">Absent Days</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{stats.attendanceRate}%</div>
                      <div className="text-xs text-blue-700">Attendance Rate</div>
                    </div>
                  </div>

                  {selectedEmployee === employee.id && (
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-3">Attendance History</h4>
                      {attendanceData.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No attendance records found</p>
                          <p className="text-sm">Start adding daily attendance to see history</p>
                        </div>
                      ) : (
                        <div className="grid gap-2 max-h-60 overflow-y-auto">
                          {attendanceData.map((record, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div className="flex items-center gap-2">
                                {getStatusIcon(record.status)}
                                <span className="text-sm">
                                  {new Date(record.date).toLocaleDateString("en-US", {
                                    weekday: "short",
                                    month: "short",
                                    day: "2-digit",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="text-sm">In: {record.timeIn}</span>
                                <span className="text-sm">Out: {record.timeOut}</span>
                                {getStatusBadge(record.status)}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
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
