export interface Route {
    path: string;
    exact?: boolean;
    component: React.ComponentType;
}