// Select all "Add New Task" buttons
const addTaskBtns = document.querySelectorAll('.add-task-btn');

// Select the task form
const taskForm = document.getElementById('task-form');

// Select the task form inputs
const taskName = document.getElementById('task-name');
const taskDifficulty = document.getElementById('task-difficulty');
const taskDate = document.getElementById('task-date');
const taskTime = document.getElementById('task-time');
const taskdescription = document.getElementById('task-description');

// Select the cancel button
const cancelBtn = document.getElementById('cancel-btn');

// Event listener for all "Add Task" buttons
addTaskBtns.forEach(btn => {
    btn.addEventListener('click', function(event) {
        const sectionId = event.target.id.replace('add-', '').replace('-btn', '');
        taskForm.style.display = 'block';
        taskForm.setAttribute('data-section-id', sectionId);
    });
});

// Event listener for form submission
const submitTaskBtn = document.getElementById('submit-task-btn');
submitTaskBtn.addEventListener('click', function() {
    const name = taskName.value;
    const difficulty = taskDifficulty.value;
    const date = taskDate.value;
    const time = taskTime.value;
    const desc = taskdescription.value;

    if (name && date && difficulty && time && desc) {
        const sectionId = taskForm.getAttribute('data-section-id');
        
        const parentDiv = document.createElement('div');
        parentDiv.classList.add('parent');
        parentDiv.setAttribute('draggable', 'true');  // Make task draggable
        parentDiv.setAttribute('id', 'task-' + Date.now());  // Unique ID for each task

        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.innerHTML = `
            <p class="head">${name}</p>
            <p class="task-description">${desc}</p>
        `;

        const taskDiv2 = document.createElement('div');
        taskDiv2.classList.add('task-2');
        
        const innerDiv = document.createElement('div');
        innerDiv.classList.add('task-details');
        
        const innerDiv2 = document.createElement('div');
        innerDiv2.classList.add('task-details-2');

        innerDiv.innerHTML = `
            <div class="task-difficulty ${difficulty.toLowerCase()}">${difficulty}</div>
            <div class="task-date">
                <i class="fa fa-clock-o" aria-hidden="true"></i> 
                ${formatDate(date)}
            </div>
        `;

        function formatDate(inputDate) {
            const options = { day: '2-digit', month: 'short', year: 'numeric' };
            return new Date(inputDate).toLocaleDateString('en-US', options);
        }

        innerDiv2.innerHTML = `<div class="task-time">${time}</div>`;

        parentDiv.appendChild(taskDiv);
        parentDiv.appendChild(taskDiv2);
        taskDiv2.appendChild(innerDiv);
        taskDiv2.appendChild(innerDiv2);

        const section = document.getElementById(sectionId + '-list');
        section.appendChild(parentDiv);

        // Reset form and hide it
        taskName.value = '';
        taskDifficulty.value = 'easy';
        taskDate.value = '';
        taskTime.value = '';
        taskdescription.value = '';
        taskForm.style.display = 'none';
    } else {
        alert('Please fill out all fields');
    }
});

// Event listener for cancel button to reset the form and hide it
cancelBtn.addEventListener('click', function() {
    taskName.value = '';
    taskDifficulty.value = 'easy';
    taskDate.value = '';
    taskTime.value = '';
    taskdescription.value = '';
    taskForm.style.display = 'none';
});

// Enable drag-and-drop functionality

// Add 'dragstart' event to each task
document.addEventListener('dragstart', function(event) {
    if (event.target.classList.contains('parent')) {
        event.dataTransfer.setData('text', event.target.id);
        setTimeout(() => event.target.style.display = 'none', 0);
    }
});

// Add 'dragend' event to make the dragged task visible again
document.addEventListener('dragend', function(event) {
    if (event.target.classList.contains('parent')) {
        event.target.style.display = 'block';
    }
});

// Allow the task sections to be drop targets
const taskSections = document.querySelectorAll('.task-list');

taskSections.forEach(section => {
    section.addEventListener('dragover', function(event) {
        event.preventDefault();
    });

    section.addEventListener('drop', function(event) {
        event.preventDefault();
        const draggedTaskId = event.dataTransfer.getData('text');
        const draggedTask = document.getElementById(draggedTaskId);
        
        if (draggedTask) {
            section.appendChild(draggedTask);  // Append task to the new section
        }
    });
});
