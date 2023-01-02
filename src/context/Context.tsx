import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext
} from 'react'

import { v4 as uuidv4 } from 'uuid'

export interface Props {
  children?: ReactNode
}

export interface Todo {
  id: string
  content: string
  status: boolean
  timestamp: string
  color: string
}

type Value = {
  todos: Todo[]
  create: (content: string) => void
  update: (id: string, changes: object) => void
  remove: (id: string) => void
  setTodos: (todos: Todo[]) => void
}

const LocalStorage = (key: string) => ({
  set: (data: any) => localStorage.setItem(key, JSON.stringify(data)),
  get: () => JSON.parse(localStorage.getItem(key) || 'null'),
  remove: () => localStorage.removeItem(key)
})

const Context = createContext<Value | null>(null)

export const ContextProvider = (props: Props) => {
  const local = LocalStorage('todos')
  const [todos, setTodos] = useState<Todo[]>([...(local.get() || [])])

  useEffect(() => {
    local.set(todos)
  }, [todos])

  const create = (content: string) => {
    setTodos([
      ...todos,
      {
        id: uuidv4(),
        content,
        status: false,
        timestamp: new Date().toISOString(),
        color:
          'hsl(' +
          360 * Math.random() +
          ',' +
          (25 + 70 * Math.random()) +
          '%,' +
          (85 + 10 * Math.random()) +
          '%)'
      }
    ])
  }

  const update = (id: string, changes: object) => {
    setTodos(
      todos.map(todo => (todo.id !== id ? todo : { ...todo, ...changes }))
    )
  }

  const remove = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <Context.Provider value={{ create, todos, update, remove, setTodos }}>
      {props.children}
    </Context.Provider>
  )
}

export const UseContext = () => useContext(Context) as Value
