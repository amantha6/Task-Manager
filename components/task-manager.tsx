"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaskList } from "@/components/task-list"
import { TaskCalendar } from "@/components/task-calendar"
import { TaskForm } from "@/components/task-form"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import type { Task, Category, Priority } from "@/types/task"

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Load tasks from localStorage if available
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("tasks")
      return savedTasks ? JSON.parse(savedTasks) : []
    }
    return []
  })

  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task: Task) => {
    setTasks([...tasks, { ...task, id: Date.now().toString() }])
    setShowForm(false)
  }

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
    setEditingTask(null)
    setShowForm(false)
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setShowForm(true)
  }

  const categories: Category[] = [
    { id: "work", name: "Work" },
    { id: "personal", name: "Personal" },
    { id: "health", name: "Health" },
    { id: "finance", name: "Finance" },
    { id: "education", name: "Education" },
  ]

  const priorities: Priority[] = [
    { id: "low", name: "Low" },
    { id: "medium", name: "Medium" },
    { id: "high", name: "High" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Tasks</h2>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-1">
          <PlusCircle className="h-4 w-4" />
          Add Task
        </Button>
      </div>

      {showForm && (
        <TaskForm
          onSubmit={editingTask ? updateTask : addTask}
          onCancel={() => {
            setShowForm(false)
            setEditingTask(null)
          }}
          categories={categories}
          priorities={priorities}
          initialData={editingTask}
        />
      )}

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="mt-6">
          <TaskList
            tasks={tasks}
            onEdit={handleEdit}
            onDelete={deleteTask}
            categories={categories}
            priorities={priorities}
          />
        </TabsContent>
        <TabsContent value="calendar" className="mt-6">
          <TaskCalendar tasks={tasks} onEdit={handleEdit} categories={categories} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

