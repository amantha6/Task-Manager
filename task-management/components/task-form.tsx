"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Clock } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import type { Task, Category, Priority } from "@/types/task"

interface TaskFormProps {
  onSubmit: (task: Task) => void
  onCancel: () => void
  categories: Category[]
  priorities: Priority[]
  initialData?: Task | null
}

export function TaskForm({ onSubmit, onCancel, categories, priorities, initialData }: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title || "")
  const [description, setDescription] = useState(initialData?.description || "")
  const [category, setCategory] = useState(initialData?.category || "")
  const [priority, setPriority] = useState(initialData?.priority || "")
  const [dueDate, setDueDate] = useState<Date | undefined>(
    initialData?.dueDate ? new Date(initialData.dueDate) : new Date(),
  )
  const [dueTime, setDueTime] = useState(initialData?.dueTime || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !category || !priority || !dueDate) {
      return // Basic validation
    }

    const task: Task = {
      id: initialData?.id || "",
      title,
      description,
      category,
      priority,
      dueDate: dueDate.toISOString(),
      dueTime,
      completed: initialData?.completed || false,
    }

    onSubmit(task)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{initialData ? "Edit Task" : "Add New Task"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={setPriority} required>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((pri) => (
                    <SelectItem key={pri.id} value={pri.id}>
                      {pri.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Due Time (optional)</Label>
              <div className="flex">
                <Clock className="mr-2 h-4 w-4 mt-3" />
                <Input id="time" type="time" value={dueTime} onChange={(e) => setDueTime(e.target.value)} />
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">{initialData ? "Update Task" : "Add Task"}</Button>
        </CardFooter>
      </form>
    </Card>
  )
}

