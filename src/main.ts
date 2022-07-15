import { v4 } from 'uuid'
import Toastify from 'toastify-js'
import { Task } from './interfaces/task'


import "toastify-js/src/toastify.css"
import './style.css'

const taskForm = document.querySelector<HTMLFormElement>('#taskForm');
const taskList = document.querySelector<HTMLDivElement>('#taskList');


let tasks: Task[] = [];

taskForm?.addEventListener('submit', e => {
  e.preventDefault()

  const title = taskForm['title'] as unknown as HTMLInputElement
  const description = taskForm['description'] as unknown as HTMLTextAreaElement

  tasks.unshift({
    title: title.value,
    description: description.value,
    id: v4()

  });

  localStorage.setItem('tasks', JSON.stringify(tasks))
  Toastify({
    text: 'Task Added',
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",}
      
  }).showToast()

  renderTask(tasks)

  taskForm.reset()
  title.focus()

})

document.addEventListener('DOMContentLoaded', () => {
  tasks = JSON.parse(localStorage.getItem('task') || '[]')
  renderTask(tasks)
})

function renderTask(tasks: Task[]) {
  taskList!.innerHTML = '';

  tasks.forEach(task => {
    const taskElment = document.createElement('div')
    taskElment.className = 'bg-zinc-800 mb-1 p-4 rounded-lg hover:bg-zinc-700 hover:cursor-pointer'

    const header = document.createElement('header')
    header.className = 'flex justify-between'

    const title = document.createElement('span')
    title.innerText = task.title

    const btnDelete = document.createElement('button')
    btnDelete.className = 'bg-rose-400 px-2 py-1 rounded-md hover:bg-rose-300'
    btnDelete.innerText = 'Delete'

    btnDelete.addEventListener('click', () => {
      const index = tasks.findIndex(t => t.id === task.id)
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(task));
      renderTask(tasks);
    })

    header.append(title)
    header.append(btnDelete)


    const description = document.createElement('p')
    description.innerText = task.description

    taskElment.append(header)
    taskElment.append(description)

    taskList?.append(taskElment)

  })
}
