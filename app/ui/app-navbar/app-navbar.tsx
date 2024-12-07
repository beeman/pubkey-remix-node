import { useState } from 'react';
import {
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconGauge,
  IconHome2,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import {AppShell, ScrollArea, Skeleton, Title, Tooltip, UnstyledButton} from '@mantine/core';
import classes from './app-navbar.module.css';
import {AppLogo} from "~/ui/app-logo";

const mainLinksMockdata = [
  { icon: IconHome2, label: 'Home' },
  { icon: IconGauge, label: 'Dashboard' },
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
  { icon: IconCalendarStats, label: 'Releases' },
  { icon: IconUser, label: 'Account' },
  { icon: IconFingerprint, label: 'Security' },
  { icon: IconSettings, label: 'Settings' },
];

const linksMockdata = [
  'Security',
  'Settings',
  'Dashboard',
  'Releases',
  'Account',
  'Orders',
  'Clients',
  'Databases',
  'Pull Requests',
  'Open Issues',
  'Wiki pages',
];

export function AppNavbar() {
  const [active, setActive] = useState('Releases');
  const [activeLink, setActiveLink] = useState('Settings');

  const mainLinks = mainLinksMockdata.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
      key={link.label}
    >
      <UnstyledButton
        onClick={() => setActive(link.label)}
        className={classes.mainLink}
        data-active={link.label === active || undefined}
      >
        <link.icon size={22} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  ));

  const links = linksMockdata.map((link) => (
    <a
      className={classes.link}
      data-active={activeLink === link || undefined}
      href="#"
      onClick={(event) => {
        event.preventDefault();
        setActiveLink(link);
      }}
      key={link}
    >
      {link}
    </a>
  ));

  return (
      <>
        <AppShell.Section grow component={ScrollArea}>
          <nav className={classes.navbar} style={{ backgroundColor: 'red', border: '1px solid red'}}>
            <div className={classes.wrapper}>
              <div className={classes.aside}>
                <div className={classes.logo}></div>
                {mainLinks}
              </div>
              <div className={classes.main}>
                <Title order={4} className={classes.title}>
                  {active}
                </Title>
                {links}
              </div>
            </div>
          </nav>

        </AppShell.Section>
        <AppShell.Section>Navbar footer – always at the bottom</AppShell.Section>

      </>
  );
}
