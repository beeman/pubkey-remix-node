import type {ReactNode} from "react";
import {Box, Button, Container, Flex, Group, Text} from "@mantine/core";
import {Link, Outlet, useLocation} from "react-router";

export default function HomeLayout() {
    const {pathname } = useLocation()
    const links = [
        { label: 'Home', to: '/' },
        { label: 'About', to: '/about' },
        { label: 'App', to: '/app' },
    ]
    return <Flex direction='column' h='100%'>
        <Box component='header' p='md'>
            <Group>
                <Text component={Link} to='/' size='lg' fw='bold'>Placeholder</Text>
                {links.map((link) => (
                    <Button size='xs' variant={pathname === link.to ? 'filled' : 'light'} component={Link} to={link.to}  key={link.label} >
                        {link.label}
                    </Button>
                ))}
            </Group>
        </Box>
        <main style={{ flexGrow: 1 }}>
            <Container>
                <Outlet />
            </Container>
        </main>
        <Box component='footer' p='xs' ta='center' fz='sm' c='dimmed'>
            Footer
        </Box>
    </Flex>
}