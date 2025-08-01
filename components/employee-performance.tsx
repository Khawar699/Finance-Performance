"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface Employee {
  id: number
  name: string
  position: string
  department: string
  performance: number
  attendance: number
  tasksCompleted: number
  totalTasks: number
  lateComings: number
}

interface EmployeePerformanceProps {
  employees: Employee[]
  period: string
}

export function EmployeePerformance({ employees, period }: EmployeePerformanceProps) {
  const getPerformanceTrend = (performance: number) => {
    const previousPerformance = performance + Math.floor(Math.random() * 10) - 5
    const trend = performance - previousPerformance

    if (trend > 2) return { icon: TrendingUp, color: "text-green-600", text: `+${trend.toFixed(1)}%` }
    if (trend < -2) return { icon: TrendingDown, color: "text-red-600", text: `${trend.toFixed(1)}%` }
    return { icon: Minus, color: "text-gray-600", text: "0%" }
  }

  const getPerformanceLevel = (performance: number) => {
    if (performance >= 90) return { level: "Excellent", color: "default" }
    if (performance >= 80) return { level: "Good", color: "secondary" }
    if (performance >= 70) return { level: "Average", color: "outline" }
    return { level: "Needs Improvement", color: "destructive" }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics - {period.charAt(0).toUpperCase() + period.slice(1)}</CardTitle>
          <CardDescription>Individual employee performance against job descriptions and KPIs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {employees.map((employee) => {
              const trend = getPerformanceTrend(employee.performance)
              const level = getPerformanceLevel(employee.performance)
              const TrendIcon = trend.icon

              return (
                <div key={employee.id} className="border rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={`/placeholder.svg?height=50&width=50`}
                        alt={employee.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{employee.name}</h3>
                        <p className="text-gray-600">
                          {employee.position} • {employee.department}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={level.color as any}>{level.level}</Badge>
                      <div className="flex items-center gap-1 text-sm">
                        <TrendIcon className={`h-4 w-4 ${trend.color}`} />
                        <span className={trend.color}>{trend.text}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Overall Performance</span>
                        <span className="font-medium">{employee.performance}%</span>
                      </div>
                      <Progress value={employee.performance} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Task Completion</span>
                        <span className="font-medium">
                          {Math.round((employee.tasksCompleted / employee.totalTasks) * 100)}%
                        </span>
                      </div>
                      <Progress value={(employee.tasksCompleted / employee.totalTasks) * 100} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Attendance Rate</span>
                        <span className="font-medium">{employee.attendance}%</span>
                      </div>
                      <Progress value={employee.attendance} className="h-2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{employee.tasksCompleted}</div>
                      <div className="text-xs text-gray-500">Tasks Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {employee.totalTasks - employee.tasksCompleted}
                      </div>
                      <div className="text-xs text-gray-500">Pending Tasks</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{employee.attendance}%</div>
                      <div className="text-xs text-gray-500">Attendance</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{employee.lateComings}</div>
                      <div className="text-xs text-gray-500">Late Comings</div>
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
