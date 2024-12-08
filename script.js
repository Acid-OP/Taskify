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
        // Get the section ID based on the button ID
        const sectionId = event.target.id.replace('add-', '').replace('-btn', '');

        // When clicked, show the form
        taskForm.style.display = 'block';

        // Pass the section ID as a data attribute to the form
        taskForm.setAttribute('data-section-id', sectionId);
    });
});

// Event listener for form submission
const submitTaskBtn = document.getElementById('submit-task-btn');
submitTaskBtn.addEventListener('click', function() {
    // Get values from the form
    const name = taskName.value;
    const difficulty = taskDifficulty.value;
    const date = taskDate.value;
    const time = taskTime.value;
    const desc = taskdescription.value;

    if (name && date && difficulty && time && desc) {
        // Get the section ID where the task should be added
        const sectionId = taskForm.getAttribute('data-section-id');
        //  parent div 
        const parentDiv = document.createElement('div');
        parentDiv.classList.add('parent');
        
        // Child div 1
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.innerHTML = `
            <p class = "head">Task Name: ${name}</p>
            <p class="task-description">${desc}</p>
        `;

        const taskDiv2 = document.createElement('div');
        taskDiv2.classList.add('task-2');

            
        // child div 2
        const innerDiv = document.createElement('div');
        innerDiv.classList.add('task-details');  
        //  child div 3
        const innerDiv2 = document.createElement('div');
        innerDiv2.classList.add('task-details-2'); 

        // Concatenate the task data (difficulty, time, date) into the inner div
        innerDiv.innerHTML = `
            <div class="task-difficulty">${difficulty}</div>
            <div class="task-date">${date}</div> `;

        innerDiv2.innerHTML = `<div class="task-time">${time}</div>`;


        // Append the child divs to parent div
        parentDiv.appendChild(taskDiv);
        parentDiv.appendChild(taskDiv2);
        taskDiv2.appendChild(innerDiv);
        taskDiv2.appendChild(innerDiv2);


        // Append the new task to the selected section based on the sectionId
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
