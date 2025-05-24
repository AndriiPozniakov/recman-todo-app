import { cx } from 'cva'

import { Icon } from '@components/Icon.tsx'

const NAVIGATION = [
  { title: 'Dashboard', icon: 'icon-house' },
  { title: 'Projects', icon: 'icon-rectangle-history', isActive: true },
  { title: 'Reporting', icon: 'icon-chart-network' },
  { title: 'Goals', icon: 'icon-bullseye-arrow' },
  { title: 'Achievements', icon: 'icon-medal' },
]

/* TODO: Implement main navigation menu with route links */
export const Sidebar = () => {
  return (
    <aside className="w-64 border-r border-grey-500">
      <ul className="py-4">
        {NAVIGATION.map((item) => (
          <li key={item.title} className="group">
            <a href="/" className="flex h-12 items-center gap-4 px-8">
              <Icon
                name={item.icon}
                className={cx(
                  'duration-300 ease-in-out',
                  item.isActive
                    ? 'opacity-100'
                    : 'opacity-50 group-hocus:opacity-100',
                )}
              />
              <h2 className="text-sm font-medium">{item.title}</h2>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
