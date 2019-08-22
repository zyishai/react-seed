import { IsString, IsNotEmpty, MinLength, IsBoolean } from 'class-validator';
import { TaskProps } from './task-props';
import { TaskStatus } from './task-status.enum';

export class Task {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    private _title: string;

    @IsString()
    private _description: string | undefined;

    @IsBoolean()
    private _status: TaskStatus;

    constructor({
        title,
        description,
        status
    }: TaskProps) {
        this._title = title;
        this._description = description;
        this._status = status || TaskStatus.CREATED;
    }

    setTitle(t: string) {
        this._title = t;
    }

    setDescription(d: string) {
        this._description = d;
    }

    setStatus(s: TaskStatus) {
        this._status = s;
    }

    get title() {
        return this._title;
    }

    get description() {
        return this._description;
    }

    get status() {
        return this._status;
    }
}