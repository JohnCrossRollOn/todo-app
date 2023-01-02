import { useState, useEffect } from 'react'
import { Reorder, AnimatePresence } from 'framer-motion'

import { UseContext } from '../context/Context'
import Create from './Create'
import Todo from './Todo'

export default () => {
  const { todos, setTodos } = UseContext()
  return (
    <Reorder.Group axis='y' values={todos} onReorder={setTodos}>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
        <AnimatePresence mode='popLayout'>
          {todos.map(todo => (
            <Reorder.Item key={todo.id} dragListener={false} value={todo}>
              <Todo todo={todo} />
            </Reorder.Item>
          ))}
          <Create />
        </AnimatePresence>
      </div>
    </Reorder.Group>
  )
}
