import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "About" },
        { name: "description", content: "About this application!" },
    ];
}

export default function About() {
    return <div>About</div>;
}
