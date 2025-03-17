"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Task, Category } from "@/types/task"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  startOfWeek,
  endOfWeek,
  getDay,
} from "date-fns"

interface TaskCalendarProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  categories: Category[]
}

export function TaskCalendar({ tasks, onEdit, categories }: TaskCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  // Get tasks for the selected date
  const tasksForSelectedDate = selectedDate
    ? tasks.filter((task) => isSameDay(new Date(task.dueDate), selectedDate))
    : []

  // Create a map of dates to task counts for the calendar
  const taskDateMap = tasks.reduce(
    (acc, task) => {
      const date = format(new Date(task.dueDate), "yyyy-MM-dd")
      if (!acc[date]) {
        acc[date] = 0
      }
      acc[date]++
      return acc
    },
    {} as Record<string, number>,
  )

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId)
    return category ? category.name : categoryId
  }

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  // Get calendar days for the month view
  const getCalendarDays = () => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(currentMonth)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const days = eachDayOfInterval({ start: startDate, end: endDate })

    // Group days into weeks
    const weeks = []
    let week = []

    days.forEach((day) => {
      if (week.length > 0 && getDay(day) === 0) {
        weeks.push(week)
        week = []
      }
      week.push(day)
    })

    if (week.length > 0) {
      weeks.push(week)
    }

    return weeks
  }

  const calendarWeeks = getCalendarDays()

  const hasTasksOnDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd")
    return !!taskDateMap[dateStr]
  }

  return (
    <div className="grid md:grid-cols-[350px_1fr] gap-6">
      <div className="border rounded-md p-4">
        <div className="flex justify-between items-center mb-4">
          <Button variant="outline" size="icon" onClick={prevMonth} className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="font-medium text-center">{format(currentMonth, "MMMM yyyy")}</h3>
          <Button variant="outline" size="icon" onClick={nextMonth} className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="text-center text-xs text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        <div className="grid gap-1">
          {calendarWeeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-1">
              {week.map((day, dayIndex) => (
                <button
                  key={dayIndex}
                  className={`
                    h-9 w-full rounded-md flex items-center justify-center
                    ${isSameDay(day, selectedDate as Date) ? "bg-primary text-primary-foreground" : "hover:bg-muted"}
                    ${!isSameMonth(day, currentMonth) ? "text-muted-foreground" : ""}
                    ${hasTasksOnDate(day) ? "font-bold" : ""}
                  `}
                  onClick={() => setSelectedDate(day)}
                >
                  <span className="text-sm">{format(day, "d")}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-medium mb-2">
          {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
        </h3>

        {tasksForSelectedDate.length === 0 ? (
          <p className="text-muted-foreground">No tasks scheduled for this day.</p>
        ) : (
          <div className="space-y-3">
            {tasksForSelectedDate.map((task) => (
              <Card
                key={task.id}
                className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => onEdit(task)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{task.title}</h4>
                        <Badge variant="outline">{getCategoryName(task.category)}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                      {task.dueTime && <p className="text-sm mt-2">Time: {task.dueTime}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

