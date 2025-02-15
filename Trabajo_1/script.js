
let tasks = [];

document.getElementById("taskForm").addEventListener("submit", function(event)
{
    event.preventDefault();
    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const status = document.getElementById("status").value;
    
    var newTask = {title: title, date: date, status: status};
    tasks.push(newTask);
    this.reset();
    showTasks();   
});

function showTasks()
{
const taskListElement = document.getElementById("taskList");
taskListElement.innerHTML = "";

tasks.forEach((task, i) => {
    const newItem = document.createElement("div");
    newItem.innerHTML = `
    <h3>${task.title}</h3> 
    <p></strong>Fecha: </strong>${task.date}</p>
    <p></strong>Estado: </strong>${task.status}</p>
    `;
    taskListElement.appendChild(newItem);
});
}

function deleteTasks()
{
    
}
function editTasks()
{
    
}