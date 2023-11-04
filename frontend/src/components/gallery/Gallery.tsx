import React from 'react'
import 'twin.macro'
import tw from 'twin.macro'

interface GalleryProps {
  todos: string
}

const Gallery: React.FC<GalleryProps> = ({ todos }) => {
  // Split the todos string into an array of individual tasks
  const tasks = todos.split('\n').filter((task) => task.trim() !== '')

  // Calculate time for each task with a 2-hour interval starting at 8 AM
  const startTime = 8 // Start at 8 AM
  const timeInterval = 2 // 2 hours interval
  const taskList = tasks.map((task, index) => {
    const time = startTime + index * timeInterval
    const formattedTime = time < 10 ? `0${time}:00` : `${time}:00`
    return { time: formattedTime, task }
  })

  return (
    <div tw="mt-2 mb-8 w-full">
      <h2 tw="mb-4 text-center font-black font-mono text-3xl text-white">Task Tracker 📋</h2>
      <div tw="flex justify-center">
        <ol tw="list-decimal">
          {taskList.map((item, index) => (
            <li key={index} tw="text-white">
              {item.task} {item.time}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default Gallery
