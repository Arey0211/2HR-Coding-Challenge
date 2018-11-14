function completedTask(){
  const tasks = document.querySelectorAll('.tasks');

  tasks.forEach(function(task){
    task.addEventListener('click', () => task.className += ' completed');
  });
}

completedTask();