import { TaskStatus } from "./task-status.enum";

export interface TaskProps {
    title: string;
    description?: string;
    status?: TaskStatus;
}