export default () => {
  return (
    <>
      <p className='p-4 shadow-lg border border-black md:flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold'>This is my To-Do app. </h1>
          Developed in{' '}
          <a
            href='https://es.reactjs.org/'
            target='_blank'
            className='text-blue-400 font-semibold'
          >
            React
          </a>
          ,{' '}
          <a
            href='https://www.typescriptlang.org/'
            target='_blank'
            className='text-blue-600 font-semibold'
          >
            TypeScript
          </a>
          ,{' '}
          <a
            href='https://www.framer.com/motion/'
            target='_blank'
            className='text-red-500 font-semibold'
          >
            Framer-Motion
          </a>{' '}
          and{' '}
          <a
            href='https://tailwindcss.com/'
            target='_blank'
            className='text-blue-500 font-semibold'
          >
            TailwindCSS
          </a>
          .
        </div>
        <div className='flex flex-col items-end'>
          <p>
            Created by{' '}
            <a
              href='https://linkedin.com/in/juanrolon54'
              target='_blank'
              className='font-bold text-white bg-black px-2 hover:px-16 hover:bg-blue-800 transition-all '
            >
              JohnCross
            </a>
          </p>
          <p>
            SourceCode at{' '}
            <a
              href='https://github.com/JohnCrossRollOn/todo-app'
              target='_blank'
              className='font-bold'
            >
              GitHub
            </a>
          </p>
        </div>
      </p>
      <p className='hidden sm:block fixed bg-white/75 border border-black bottom-0 left-0 text-xs p-2'>
        <strong>CTRL+ENTER</strong> to add todo.{' '}
        <strong>CTRL+SHIFT+ENTER</strong> to add without clear.{' '}
        <strong>ESC</strong> to delete last todo.
      </p>
    </>
  )
}
