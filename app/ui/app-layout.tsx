import type {ReactNode} from "react";
import {AppShell, Box, Burger, Button, Container, Flex, Group, ScrollArea, Skeleton, Text} from "@mantine/core";
import {Link, Outlet, useLocation} from "react-router";
import {AppNavbar} from "~/ui/app-navbar/app-navbar";
import {AppLogo} from "~/ui/app-logo";
import {useDisclosure} from "@mantine/hooks";

export default function AppLayout() {
    const [opened, {toggle}] = useDisclosure();

    const {pathname} = useLocation()
    const links = [
        {label: 'Home', to: '/'},
    ]
    return <AppShell
        header={{height: 60}}
        navbar={{width: 300, breakpoint: 'sm', collapsed: {mobile: !opened}}}
        styles={{ navbar: { height: '100%', border: '1px solid pink'}}}
        padding="md"
        layout='alt'
    >
        <AppShell.Header>
            <Group h="100%" px="md">
                <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm"/>
                <AppLogo/>
            </Group>
        </AppShell.Header>
        <AppShell.Navbar>
            <AppNavbar />
        </AppShell.Navbar>
        <AppShell.Main>
            <Outlet/>
        </AppShell.Main>
    </AppShell>
}