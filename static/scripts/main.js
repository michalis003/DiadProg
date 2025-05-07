/**
 * 
 * Δεν χρειάζεται στην απλή εκδοχή αυτής της άσκησης.
 * It is not needed in the simple version of this exercise.
 * 
 * Φορτώνεται από το template ./views/taskbar-dynamic.hbs
 * Loaded by the template ./views/taskbar-dynamic.hbs
 * 
 * Κατασκευάζει το περιεχόμενο δυναμικά (client side rendering), στέλνοντας αιτήματα με το fetch API.
 * Constructs the content dynamically (client side rendering), sending requests with the fetch API.
 * 
 * Στην αρχή η fetchTasks() παίρνει από τον εξυπηρετητή όλες τις εργασίες και τις προβάλλει μία μία στη σελίδα.  
 * At the beginning, fetchTasks() gets all the tasks from the server and displays them one by one on the page.
 * 
 */


//Δημιουργεί ένα list item που περιέχει την περιγραφή την εργασία (task item)
//Η εργασία περιέχεται μέσα σε ένα <span>
//Αν η εργασία έχει ολοκληρωθεί το span έχει την κλάση CSS task-status-inactive
//Το span έχει το attribute "data-task-id", στο οποίο γράφουμε το id της εργασίας στη ΒΔ
let createTaskItem = (taskJson) => {
    //Button
    let taskItemRemoveButton = document.createElement('button');
    taskItemRemoveButton.className = "ml-3";
    taskItemRemoveButton.setAttribute("name", "removeTaskId");
    //Κάθε στοιχείο button έχει ένα attribute με όνομα data-task-id και τιμή το id της εργασίας
    //Το χρησιμοποιούμε στη συνέχεια (π.χ. click/remove/toggle για να βρούμε το στοιχείο στο DOM)
    // taskItemRemoveButton.setAttribute("data-task-id", taskJson.id);
    // taskItemRemoveButton.innerText = "Αφαίρεση";
    // taskItemRemoveButton.addEventListener("click", (event) => {
    //     removeTaskItem(event.target.getAttribute("data-task-id"));
    // });

    //Τοggle task link 
    let taskItemToggleLink = document.createElement('span');
    //Κάθε στοιχείο button έχει ένα attribute με όνομα data-task-id και τιμή το id της εργασίας
    //Το χρησιμοποιούμε στη συνέχεια (π.χ. click/remove/toggle για να βρούμε το στοιχείο στο DOM)
    taskItemToggleLink.setAttribute("data-task-id", taskJson.id);
    if (taskJson.status == 1) {
        taskItemToggleLink.className = "task-status-inactive";
    }
    taskItemToggleLink.textContent = taskJson.task;
    taskItemToggleLink.addEventListener("click", (event) => {
        toggleTaskItem(event.target.getAttribute("data-task-id"));
    });

    //task list item
    let taskItem = document.createElement('li');
    taskItem.className = "list-group-item";
    //Κάθε στοιχείο li έχει ένα attribute με όνομα data-task-id και τιμή το id της εργασίας
    //Το χρησιμοποιούμε στη συνέχεια (π.χ. click/remove/toggle για να βρούμε το στοιχείο στο DOM)
    taskItem.setAttribute("data-task-id", taskJson.id);
    taskItem.appendChild(taskItemToggleLink);
    // taskItem.appendChild(taskItemRemoveButton);

    return taskItem;
}

//Ζητά από τον εξυπηρετητή να αλλάξει την κατάσταση της εργασίας
//Αν έγινε, ο εξυπηρετητής απαντά με true
let toggleTaskItem = (taskItemId) => {
    //Συμπληρώστε
}

//Ζητά από τον εξυπηρετητή να προσθέσει μια εργασία με όνομα taskName.
//Αν πετύχει, ο εξυπηρετητής στέλνει ένα json με τη νέα εργασία, που στη
//συνέχεια προσαρτάται στο DOM
let addTaskItem = (taskName) => {
    //Συμπληρώστε
}

//Ζητά από τον εξυπηρετητή να διαγράψει την εργασία
//Αν έγινε η διαγραφή, ο εξυπηρετητής απαντά με true
let removeTaskItem = (taskItemId) => {
    //Συμπληρώστε
}

//Με μια λιστα εργασιών σε μορφή json, κατασκευάζει και προαρτά τα αντίστοιχα στοιχεία li στο έγγραφο
let renderTaskItems = (tasks) => {
    for (let task of tasks) {
        document.querySelector("ul").appendChild(createTaskItem(task));
    }
}

//Στέλνει ένα αίτημα στον εξυπηρετητή και επιστρέφει τις εργασίες
let fetchTasks = () => {
    fetch("/api/tasks").then(
        //διάβασε την απάντηση σαν json
        (response) => response.json().then(
            //δώσε την εγγραφή "tasks" για προβολή στην οθόνη
            (json) => renderTaskItems(json)
        )
    );
}

window.addEventListener('DOMContentLoaded', (event) => {
    fetchTasks();
    document.querySelector("#add-task-button").addEventListener("click", (event) => {
        addTaskItem(document.querySelector("input[name='taskName']").value);
    })
});