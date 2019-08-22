import { observable, action, computed } from 'mobx';
import { validate } from 'class-validator';
import { Task } from './task';
import { TaskProps } from './task-props';
import { TaskQuery } from './task.query';

export class TaskStore {
    @observable private _tasks: Array<Task> = [];

    constructor() {}

    @action
    async createTask(props: TaskProps): Promise<Task | null> {
        const task = new Task(props);

        const errors = await validate(task);

        if (errors && errors.length) {
            console.error(errors);
            return null;
        }

        this._tasks.push(task);

        return task;
    }

    @computed
    tasks(query: TaskQuery) {
        let tasks = this._tasks.slice();

        if (query.status) {
            tasks = tasks.filter(task => task.status === query.status);
        }

        if (query.text) {
            tasks = tasks.filter(task => (
                task.title.includes(query.text || '') || (
                    task.description &&
                    task.description.includes(query.text || '')
                )
            ));
        }

        return tasks;
    }
}