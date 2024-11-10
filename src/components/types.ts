export interface Task {
    id: number;
    title: string;
}
  
export interface Column {
    id: number;
    name: string;
    tasks: Task[];
}
  