"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, Search, Bell, Download, User, Settings, LogOut, Calendar, Filter } from "lucide-react"

interface Employee {
  id: number
  name: string
  position: string
  performance: number
  attendance: number
}

interface HeaderProps {
  employees: Employee[]
  onToggleSidebar: () => void
}

export function Header({ employees, onToggleSidebar }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  // Calculate summary metrics
  const totalEmployees = employees.length
  const avgPerformance = Math.round(employees.reduce((sum, emp) => sum + emp.performance, 0) / totalEmployees)
  const avgAttendance = Math.round(employees.reduce((sum, emp) => sum + emp.attendance, 0) / totalEmployees)

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">Employee Performance Dashboard</h1>
            <div className="flex items-center gap-4 mt-1">
              <p className="text-sm text-gray-600">Accounting & Finance Team</p>
              <Badge variant="secondary" className="text-xs">
                {totalEmployees} Employees
              </Badge>
              <Badge variant="outline" className="text-xs">
                Avg Performance: {avgPerformance}%
              </Badge>
              <Badge variant="outline" className="text-xs">
                Avg Attendance: {avgAttendance}%
              </Badge>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>

          {/* Period Filter */}
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
            </SelectContent>
          </Select>

          {/* Filter Button */}
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>

          {/* Export Button */}
          <Button variant="outline" className="hidden md:flex bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>

          {/* Notifications */}
          <Button variant="outline" size="icon" className="relative bg-transparent">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-red-500">3</Badge>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <img src="/placeholder.svg?height=40&width=40" alt="Manager" className="h-10 w-10 rounded-full" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Finance Manager</p>
                  <p className="text-xs leading-none text-muted-foreground">manager@company.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
