"use client";
import {
  AppShell,
  Burger,
  Group,
  ScrollArea,
  Menu,
  Button,
  Text,
  Container,
  Grid,
  NavLink,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { useState } from "react";

const headerSections = [
  {
    label: "Inventory",
    href: "",
    colsize: 3,
    subsections: [
      { label: "Equipment", href: "" },
      { label: "Materials", href: "" },
      { label: "Methods", href: "" },
      { label: "Reagents", href: "" },
      { label: "Samples", href: "" },
      { label: "Standards", href: "" },
      { label: "Suppliers", href: "" },
    ],
  },
  {
    label: "Utilities",
    href: "",
    colsize: 2,
    subsections: [
      { label: "User", href: "" },
      { label: "Settings", href: "" },
    ],
  },
];

const headerHeight = 60;

export default function DefaultAppShell({ children }) {
  const [opened, { toggle }] = useDisclosure();

  const mainItems = headerSections.map((item, index) => (
    <Grid.Col span={item.colsize} key={index}>
      <Menu
        key={item.label}
        // trigger="hover"
        // transitionProps={{ exitDuration: 0 }}
        withinPortal
        position="bottom-start"
        offset={1}
      >
        <Menu.Target>
          <Button
            px="md"
            justify="space-between"
            fullWidth
            size="md"
            leftSection={<span />}
            rightSection={item.subsections ? <IconChevronRight /> : <span />}
            variant="default"
          >
            {item.label}
          </Button>
        </Menu.Target>
        {item.subsections ? (
          <Menu.Dropdown>
            {item.subsections.map((subItem) => (
              <Menu.Item key={subItem.label} component="a" href={subItem.href}>
                {subItem.label}
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        ) : null}
      </Menu>
    </Grid.Col>
  ));

  const menus = headerSections.map((item) => {
    const [menuopen, setMenuOpen] = useState(false);

    return (
      <Menu key={item.label} opened={menuopen} onChange={setMenuOpen}>
        <Menu.Target>
          <Button
            p="xs"
            size="sm"
            leftSection={<span />}
            rightSection={
              item.subsections ? (
                menuopen ? (
                  <IconChevronDown />
                ) : (
                  <IconChevronRight />
                )
              ) : (
                <span />
              )
            }
            variant="default"
          >
            {item.label}
          </Button>
        </Menu.Target>
        {item.subsections ? (
          <Menu.Dropdown>
            {item.subsections.map((subItem) => (
              <Menu.Item key={subItem.label} component="a" href={subItem.href}>
                {subItem.label}
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        ) : null}
      </Menu>
    );
  });

  return (
    <AppShell
      header={{ height: headerHeight }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: opened }, // Collapse navbar on mobile //FIXME: on mobile navbar is not collapsed and burger wrong
      }}
      padding="md"
    >
      <AppShell.Header
        display="flex"
        alignitems="center"
        className="custom-header"
      >
        <Group h="100%" px="md">
          <Burger opened={!opened} onClick={toggle} ml="md" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Text ml="md" mr="xl" size="xl">
              NextLaBIS
            </Text>
            <Group ml="xl" gap="md" visibleFrom="sm">
              {/* <Button id="header-item">Lab Notebooks</Button>
              <Button id="header-item">Inventory</Button>
              <Button id="header-item">Utilities</Button> */}
              {menus}
            </Group>
          </Group>
        </Group>
        {/* <Grid w="100%" align="center" pr="md">
          <Grid.Col span={1}>
            <Burger opened={!opened} onClick={toggle} ml="md" />
          </Grid.Col>
          <Grid.Col span={3}>
            <Text ml="md" mr="xl" fz={(headerHeight / 5) * 3}>
              NextLaBIS
            </Text>
          </Grid.Col>
          {mainItems}
        </Grid> */}
        {/* <Group>
        <Burger opened={!opened} onClick={toggle} size="md" ml="md" />
        </Group>
        <Text ml="md" mr="xl" fz={(headerHeight / 5) * 3}>
          NextLaBIS
        </Text>
        <Group h={headerHeight} spacing="md" justify="flex-end">
          {mainItems}
        </Group> */}
      </AppShell.Header>

      <AppShell.Navbar p="md" className="custom-navbar">
        Navbar
        <AppShell.Section>Navbar header</AppShell.Section>
        <AppShell.Section grow component={ScrollArea}>
          Navbar main section, it will
        </AppShell.Section>
        <AppShell.Section>
          Navbar footer – always at the bottom
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
