import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppShell } from './AppShell';
import { Header } from './Header';
import { Content } from './Content';
import { Footer, FooterItem } from './Footer';
import { HeaderNav, HeaderNavItem } from './HeaderNav';
import { MotionProvider } from './motion';
import { framerMotionAdapter } from './motion-framer';
import { Home, Search, Bell, User, PlusCircle } from 'lucide-react';

const meta = {
  title: 'Components/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MotionProvider adapter={framerMotionAdapter}>
        <Story />
      </MotionProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullComposition: Story = {
  args: {
    safeArea: true,
    children: (
      <>
        <Header
          behavior="fixed"
          theme="light"
          logo={<span className="text-lg font-bold tracking-tight ml-4">MyApp</span>}
          nav={
            <HeaderNav>
              <HeaderNavItem label="Home" active />
              <HeaderNavItem label="Explore" />
              <HeaderNavItem label="Settings" />
            </HeaderNav>
          }
          actions={
            <button className="rounded-lg bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Sign In
            </button>
          }
        />
        <Content className="pb-20">
          <div className="mx-auto max-w-2xl px-4 pt-6 space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">Card {i + 1}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  This is a sample card demonstrating the AppShell layout with Header, Content, and Footer.
                </p>
              </div>
            ))}
          </div>
        </Content>
        <Footer variant="tab-bar">
          <FooterItem icon={<Home className="size-5" />} label="Home" active />
          <FooterItem icon={<Search className="size-5" />} label="Search" />
          <FooterItem icon={<PlusCircle className="size-5" />} label="Add" />
          <FooterItem icon={<Bell className="size-5" />} label="Alerts" badge={3} />
          <FooterItem icon={<User className="size-5" />} label="Profile" />
        </Footer>
      </>
    ),
  },
};

export const HeaderOnly: Story = {
  args: {
    safeArea: true,
    children: (
      <>
        <Header
          behavior="fixed"
          theme="light"
          logo={<span className="text-lg font-bold tracking-tight ml-4">Blog</span>}
          nav={
            <HeaderNav>
              <HeaderNavItem label="Articles" active />
              <HeaderNavItem label="Essays" />
              <HeaderNavItem label="About" />
            </HeaderNav>
          }
        />
        <Content>
          <div className="mx-auto max-w-2xl px-4 pt-8 pb-16">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
              Article Title
            </h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              This demonstrates an AppShell with only a Header and Content — no Footer.
              Common for blog and article layouts.
            </p>
          </div>
        </Content>
      </>
    ),
  },
};

export const FloatingFooter: Story = {
  args: {
    safeArea: true,
    children: (
      <>
        <Header
          behavior="fixed"
          theme="light"
          logo={<span className="text-lg font-bold tracking-tight ml-4">Feed</span>}
        />
        <Content className="pb-20">
          <div className="mx-auto max-w-2xl px-4 pt-6 space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">Post {i + 1}</h3>
                <p className="mt-2 text-sm text-muted-foreground">Sample content card.</p>
              </div>
            ))}
          </div>
        </Content>
        <Footer variant="floating" position="right">
          <button className="flex items-center gap-2 rounded-full bg-primary px-4 py-3 font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <PlusCircle className="size-5" /> Create
          </button>
        </Footer>
      </>
    ),
  },
};
