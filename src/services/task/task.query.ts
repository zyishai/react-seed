import { TaskStatus } from "./task-status.enum";

export interface TaskQuery {
    status?: TaskStatus;
    text?: string;
}