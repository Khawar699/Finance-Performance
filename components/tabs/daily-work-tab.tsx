"use client"

import { DailyWorkEntry } from "@/components/daily-work-entry"

interface Employee {
  id: number
  name: string
  position: string
}

interface DailyWorkTabProps {
  employees: Employee[]
}

export function DailyWorkTab({ employees }: DailyWorkTabProps) {
  return <DailyWorkEntry employees={employees} />
}
