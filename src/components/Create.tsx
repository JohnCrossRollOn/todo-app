import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState
} from 'react'
import { motion, LayoutGroup } from 'framer-motion'

import { UseContext } from '../context/Context'

export default () => {
  const { create, todos, remove } = UseContext()
  const [isDisplayed, setDisplay] = useState<boolean>(false)
  const [content, setContent] = useState<string>('')
  const [previous, setPrevious] = useState<string[]>([])

  const textarea = useRef<HTMLTextAreaElement>(null)

  const focusCreate = (): void => {
    setTimeout(() => {
      const { current } = textarea
      current?.focus()
      current?.select()
      current?.scrollIntoView({ behavior: 'smooth' })
    }, 0)
  }

  const display = (bool: boolean) => () => setDisplay(bool)
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setContent(e.target.value)
  }
  const submit = (): void => {
    if (content.trim() !== '') {
      create(content)
      setContent('')
    }
    focusCreate()
  }
  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    submit()
  }
  const onDiscard = (): void => {
    display(false)()
    setContent('')
  }
  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && previous[0] === 'Control') submit()
    if (
      e.key === 'Enter' &&
      previous[0] === 'Shift' &&
      previous[1] === 'Control'
    ) {
      create(content)
      focusCreate()
      return
    }
    setPrevious([e.key, ...previous].slice(0, 2))
  }

  useEffect(() => {
    const removeLastTodo: EventListener = ({ key }: KeyboardEventInit) => {
      if (key === 'Escape' && todos.length > 0) {
        remove(todos[todos.length - 1].id)
      }
    }
    window.addEventListener('keydown', removeLastTodo)
    return () => {
      window.removeEventListener('keydown', removeLastTodo)
    }
  }, [todos])

  return (
    <motion.div layout className='h-64'>
      <LayoutGroup>
        {!isDisplayed ? (
          <>
            <motion.div layout layoutId='discard_bar' onClick={display(true)}>
              <div className='bg-black p-1 font-mono font-bold tracking-tight text-red-500 text-sm hover:cursor-pointer text-center shadow-xl'>
                discard
              </div>
              <motion.div layout layoutId='create_bar' onClick={display(true)}>
                <div className='bg-black p-1 font-mono font-bold tracking-tight text-green-500 text-sm hover:cursor-pointer text-center shadow-xl -translate-y-7'>
                  create
                </div>
              </motion.div>
            </motion.div>
          </>
        ) : (
          <form
            className='border border-slate-800 transition-all h-64 select-none flex flex-col shadow-xl bg-slate-50'
            onSubmit={onSubmit}
          >
            <textarea
              ref={textarea}
              {...{ value: content, onChange }}
              autoFocus
              className='flex-1 resize-none p-4 pt-12'
              onKeyDown={onKeyDown}
            />
            <div className='font-mono font-bold tracking-tight flex text-sm hover:cursor-pointer text-center'>
              <motion.input
                layout
                type='submit'
                layoutId='create_bar'
                className='bg-black p-1 text-green-500 flex-1 hover:cursor-pointer'
                value='create'
              />
              <motion.div
                layout
                layoutId='discard_bar'
                className='bg-black p-1 text-red-500 flex-1'
                onClick={onDiscard}
              >
                discard
              </motion.div>
            </div>
          </form>
        )}
      </LayoutGroup>
    </motion.div>
  )
}
