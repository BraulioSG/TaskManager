import { generateID } from "../utils/Tools";

//Regex Pattern that allows the format dd-mm-yyyy
const DATE_FORMAT = new RegExp('^[0-3][0-9]-[0-1][0-9]-[2-9][0-9][0-9][0-9]$');

/**
 * Class for a Task
 */
export class Task{
    public id: string               = "";
    private title: string           = "";
    private description: string     = "";
    private dueDate: string         = "";

    private imageUrl: string | null = null;

    private completed: boolean      = false;
    private important: boolean      = false;

    
    /**
     * Creates a new Task
     * the id will be auto-generated
     * @param {string} title         - title of the task
     * @param {string} description   - description of the task
     * @param {string} dueDate       - the dueDate for the task
     */
    constructor(title: string, description: string, dueDate: string) {
        this.setTitle(title);
        this.setDescription(description);
        this.setDueDate(dueDate);

        this.id = generateID(title);
    }

    /**
     * Parse the Task objet into a string so it can be stored in the localStorage
     * @returns {string} a string version of the Task
     */
    public toString(): string {
        return JSON.stringify({
            id: this.id,
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            imageUrl: this.imageUrl,
            completed: this.completed,
            important: this.important,
        })
    }

    /**
     * Given a string with the correct format, it can be parsed into a Task Object
     * @param {string} str a formatted string
     * @returns {Task} a Task
     */
    public static parse(str: string): Task {
        const {id, title, description, dueDate, imageUrl, completed, important} = JSON.parse(str) as Task;
        const task = new Task(title, description, dueDate);
        task.id = id;

        task.setImageUrl(imageUrl);
        task.setCompleted(completed);
        task.setIsImportant(important);

        return task;
    }

    //SETTERS
    /**
     * Setter for the title
     * @param {string} title 
     */
    public setTitle(title: string) { this.title = title; }

    /**
     * Setter for the description
     * @param {string} description 
     */
    public setDescription(description: string) { this.description = description; }

    /**
     * Setter for the due date.
     * @param {string} dueDate - must be a string with format dd-mm-yyy otherwise it have a default value of 00-00-0000
     */
    public setDueDate(dueDate: string) { this.dueDate = DATE_FORMAT.test(dueDate) ? dueDate : "00-00-0000";}

    /**
     * Setter for the imageURL
     * @param {string | null} imageUrl 
     */
    public setImageUrl(imageUrl: string | null) { this.imageUrl = imageUrl; }

    /**
     * Setter for completed
     * @param {boolean} status 
     */
    public setCompleted(status: boolean){ this.completed = status; }

    /**
     * Setter for important
     * @param {boolean} isImportant 
     */
    public setIsImportant(isImportant: boolean) { this.important = isImportant; }


    //GETTERS
    /**
     * Getter for title
     * @returns {string}
     */
    public getTitle(): string { return this.title; }

    /**
     * Getter for description
     * @returns {string}
     */
    public getDescription(): string { return this.description; }

    /**
     * Getter for dueDate
     * @returns {string}
     */
    public getDueDate(): string { return this.dueDate; }

    /**
     * Getter for imageUrl
     * @returns {string}
     */
    public getImageUrl(): string | null { return this.imageUrl; }

    /**
     * Getter for completed
     * @returns {boolean}
     */
    public isCompleted(): boolean { return this.completed; }

    /**
     * Getter for important
     * @returns {boolean}
     */
    public isImportant(): boolean { return this.important; }

    /**
     * Getter for the id
     * @returns {string}
     */
    public getId(): string { return this.id }
}


/**
 * Class for TaskList
 */
export class TaskList {
    public id: string      = "";
    private name: string    = "";
    private tasks: Task[]   = [];

    /**
     * Creates a Tasklist
     * the id will be auto-generated
     * @param name name of the list
     */
    constructor(name: string) {
        this.setName(name);
        this.id = generateID(name);
    }

    /**
     * Adds a task to the list "tasks"
     * @param task task to be added
     */
    public addTask(task: Task) : void {
        this.tasks.push(task);
    }

    /**
     * Given a string with the correct format, it can be parsed into a TaskList Object
     * @param {string} str a formatted string
     * @returns {TaskList} a TaskList
     */
    public static parse(str: string): TaskList {
        const {id, name, tasks} = JSON.parse(str);

        const list = new TaskList(name);
        list.id = id;

        tasks.forEach((task: string) => {
            list.addTask(Task.parse(task));
        })

        return list;
    }

    /**
     * Parse the TaskList objet into a string so it can be stored in the localStorage
     * @returns {string} a string version of the TaskList
     */
    public toString(): string {
        return JSON.stringify({
            name: this.name,
            id: this.id,
            tasks: this.tasks.map(task => task.toString())
        })
    }

    /**
     * Edits a single task from the list "tasks" based on the task id
     * @param id - id of the task to edit
     * @param task - new data for the Task
     */
    public editTask(id: string, task: Task): void{
        for(let i = 0; i < this.tasks.length; i++){
            let currentTask = this.tasks[i];
            console.log(currentTask, id);
            if(currentTask.getId() === id){
                this.tasks[i] = task; 
                return;
            }
        }
    }

    //SETTERS
    /**
     * Setter for the name
     * @param name {String}
     */
    public setName(name: string) { this.name = name; }

    /**
     * Setter for the entire tasklist
     * @param tasks 
     */
    public setTasks(tasks: Task[]) { this.tasks = tasks }

    //GETTERS
    /**
     * Getter for name
     * @returns {string}
     */
    public getName(): string { return this.name; }

    /**
     * Getter for the tasks
     * @returns {pending: Task[], completed: Task[]} - an object with the tasks filtered by status
     */
    public getTasks() {
        const completed : Task[] = [];
        let pending: Task[] = [];

        this.tasks.forEach(task => {
            if(task.isCompleted()){
                completed.push(task);
            }else{
                pending.push(task);
            }
        })

        return { pending , completed };
    }

    /**
     * Getter for the tasks
     * @returns {Task[]} - a list of tasks without filter
     */
    public getAllTasks(){ return this.tasks; }

    /**
     * Getter for the id
     * @returns {string}
     */
    public getId(){ return this.id; }
}