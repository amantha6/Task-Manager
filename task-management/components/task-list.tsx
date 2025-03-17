"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Edit, MoreVertical, Trash2 } from "lucide-react"
import type { Task, Category, Priority } from "@/types/task"
import { format } from "date-fns"

interface TaskListProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  categories: Category[]
  priorities: Priority[]
}

export function TaskList({ tasks, onEdit, onDelete, categories, priorities }: TaskListProps) {
  const [filter, setFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")

  const filteredTasks = tasks.filter((task) => {
    const categoryMatch = filter === "all" || task.category === filter
    const priorityMatch = priorityFilter === "all" || task.priority === priorityFilter
    return categoryMatch && priorityMatch
  })

  // Sort tasks by due date (closest first)
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500 hover:bg-red-600"
      case "medium":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "low":
        return "bg-green-500 hover:bg-green-600"
      default:
        return "bg-slate-500 hover:bg-slate-600"
    }
  }

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId)
    return category ? category.name : categoryId
  }

  const getPriorityName = (priorityId: string) => {
    const priority = priorities.find((p) => p.id === priorityId)
    return priority ? priority.name : priorityId
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="category-filter" className="block text-sm font-medium mb-1">
            Filter by Category
          </label>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger id="category-filter">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <label htmlFor="priority-filter" className="block text-sm font-medium mb-1">
            Filter by Priority
          </label>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger id="priority-filter">
              <SelectValue placeholder="All Priorities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              {priorities.map((priority) => (
                <SelectItem key={priority.id} value={priority.id}>
                  {priority.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {sortedTasks.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">No tasks found. Add a new task to get started.</div>
      ) : (
        <div className="grid gap-4">
          {sortedTasks.map((task) => (
            <Card key={task.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-lg">{task.title}</h3>
                      <Badge variant="outline">{getCategoryName(task.category)}</Badge>
                      <Badge className={getPriorityColor(task.priority)}>{getPriorityName(task.priority)}</Badge>
                    </div>
                    <p className="text-muted-foreground">{task.description}</p>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(task)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(task.id)} className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0 flex items-center text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {format(new Date(task.dueDate), "MMM d, yyyy")}
                </div>
                {task.dueTime && (
                  <div className="flex items-center ml-4">
                    <Clock className="h-4 w-4 mr-1" />
                    {task.dueTime}
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

