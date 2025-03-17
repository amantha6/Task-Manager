export interface Task {
  id: string
  title: string
  description: string
  category: string
  priority: string
  dueDate: string
  dueTime?: string
  completed: boolean
}

export interface Category {
  id: string
  name: string
}

export interface Priority {
  id: string
  name: string
}

