import type { Route } from "./+types/dashboard";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Dashboard" },
        { name: "description", content: "Application dashboard!" },
    ];
}

export default function Dashboard() {
    return <div>App Dashboard</div>;
}
