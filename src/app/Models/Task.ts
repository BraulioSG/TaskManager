import { generateID } from "../utils/Tools";

const DATE_FORMAT = new RegExp('^[0-3][0-9]-[0-1][0-9]-[2-9][0-9][0-9][0-9]$');

export class Task{
    public id: string              = ""
    private title: string           = "";
    private description: string     = "";
    private dueDate: string         = "";

    private imageUrl: string | null = null;

    private completed: boolean      = false;
    private important: boolean      = false;

    constructor(title: string, description: string, dueDate: string) {
        this.setTitle(title);
        this.setDescription(description);
        this.setDueDate(dueDate);

        this.id = generateID(title);
    }

    public toString(): string {
        return JSON.stringify({
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            imageUrl: this.imageUrl,
            completed: this.completed,
            important: this.important,
        })
    }

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
    public setTitle(title: string) { this.title = title; }

    public setDescription(description: string) { this.description = description; }

    public setDueDate(dueDate: string) { this.dueDate = DATE_FORMAT.test(dueDate) ? dueDate : "00-00-0000";}

    public setImageUrl(imageUrl: string | null) { this.imageUrl = imageUrl; }

    public setCompleted(status: boolean){ this.completed = status; }

    public setIsImportant(isImportant: boolean) { this.important = isImportant; }


    //GETTERS
    public getTitle(): string { return this.title; }

    public getDescription(): string { return this.description; }

    public getDueDate(): string { return this.dueDate; }

    public getImageUrl(): string | null { return this.imageUrl; }

    public isCompleted(): boolean { return this.completed; }

    public isImportant(): boolean { return this.important; }

    public getId(): string { return this.id }
}

export class TaskList {
    public id: string      = "";
    private name: string    = "";
    private tasks: Task[]   = [];

    constructor(name: string) {
        this.setName(name);
        this.id = generateID(name);
    }

    public addTask(task: Task) : void {
        this.tasks.push(task);
    }

    public static parse(str: string): TaskList {
        const {id, name, tasks} = JSON.parse(str);

        const list = new TaskList(name);
        list.id = id;

        tasks.forEach((task: string) => {
            list.addTask(Task.parse(task));
        })

        return list;
    }

    public toString(): string {
        return JSON.stringify({
            name: this.name,
            id: this.id,
            tasks: this.tasks.map(task => task.toString())
        })
    }

    //SETTERS
    public setName(name: string) { this.name = name; }

    public setTasks(tasks: Task[]) { this.tasks = tasks }

    //GETTERS
    public getName(): string { return this.name; }

    public getTasks(sorted: boolean = false) {
        const completed : Task[] = [];
        let pending: Task[] = [];

        this.tasks.forEach(task => {
            if(task.isCompleted()){
                completed.push(task);
            }else{
                pending.push(task);
            }
        })

        if(sorted){
            pending = pending.sort((a,  b) => {
                if(a.isImportant()) return 1;
                if(b.isImportant()) return -1;

                return 0;
            })
        }

        return { pending , completed };
    }

    public getId(){
        return this.id;
    }
}