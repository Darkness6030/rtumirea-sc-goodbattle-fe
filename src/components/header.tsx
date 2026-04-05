import { Link, useLocation } from '@tanstack/react-router'
import { Swords, User } from 'lucide-react'

import Logo from '@/assets/logo.svg?react'

import { Button, Typography } from './ui'

const IS_AUTHENTICATED = true
const USER_NAME = 'Алексей'

function Header() {
  const { pathname } = useLocation()
  const compact = pathname.startsWith('/rooms/')

  if (compact) {
    return (
      <header className="sticky top-0 z-50 flex h-10 shrink-0 items-center justify-between bg-background px-4 pt-2">
        <Link className="flex items-center gap-3 select-none" to="/">
          <Logo className="size-6" />
          <Typography as="span" className="text-md" variant="body">
            good battle
          </Typography>
        </Link>
        {IS_AUTHENTICATED && (
          <div className="flex items-center gap-1">
            <Button asChild size="sm" variant="ghost">
              <Link to="/profile">
                <User className="size-3.5" />
                {USER_NAME}
              </Link>
            </Button>
          </div>
        )}
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between overflow-hidden bg-background px-4 pt-4">
      <Link className="flex items-center gap-2 select-none" to="/">
        <Logo className="size-8" />
        <Typography as="span" variant="large">
          good battle
        </Typography>
      </Link>

      {IS_AUTHENTICATED && (
        <div className="flex items-center gap-2">
          <Button asChild size="lg" variant="ghost">
            <Link to="/battles">
              <Swords />
              Мои баттлы
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/profile">
              <User />
              {USER_NAME}
            </Link>
          </Button>
        </div>
      )}
    </header>
  )
}

export { Header }
