import { Todo, UseContext } from '../context/Context'
import { motion } from 'framer-motion'

interface Props {
  todo: Todo
}

export default ({ todo }: Props) => {
  const { id, content, status, timestamp } = todo
  const { update, remove } = UseContext()
  return (
    <motion.div
      exit={{ opacity: 0, scale: 0 }}
      style={{
        backgroundColor: status ? 'transparent' : todo.color
      }}
      className={`transition-all h-64 select-none flex flex-col ${
        status ? 'text-slate-400 ' : 'shadow-xl border border-slate-800'
      }`}
      onClick={() => update(id, { status: !status })}
    >
      <div className='w-full flex justify-end'>
        <span
          onClick={e => {
            e.stopPropagation()
            remove(id)
          }}
          className='bg-black p-1 font-mono font-bold tracking-tight text-red-500 text-sm hover:cursor-pointer'
        >
          delete
        </span>
      </div>

      <div className='flex-1 overflow-y-auto'>
        <div className='p-4'>{content}</div>
      </div>
    </motion.div>
  )
}
