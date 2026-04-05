import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Calendar,
  Code2,
  Crown,
  Mail,
  Percent,
  Swords,
  Trophy,
} from 'lucide-react'

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
  Typography,
} from '@/components/ui'
import { MOCK_USER } from '@/lib/mock'

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
})

function ProfilePage() {
  const user = MOCK_USER

  const joinedDate = new Date(user.joinedAt).toLocaleDateString('ru-RU', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 py-8">
      <div>
        <Typography variant="h1">Профиль</Typography>
        <Typography className="mt-1" variant="muted">
          Информация о пользователе и статистика
        </Typography>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Личные данные</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-14 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
              {user.name[0]}
            </div>
            <div>
              <Typography className="font-medium" variant="h3">
                {user.name}
              </Typography>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Mail className="size-3.5" />
                <Typography variant="muted">{user.email}</Typography>
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="size-3.5" />
            <Typography variant="muted">На платформе с {joinedDate}</Typography>
          </div>
        </CardContent>
      </Card>

      <div>
        <Typography className="mb-3" variant="h2">
          Статистика
        </Typography>
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            icon={<Swords className="size-5" />}
            label="Баттлов сыграно"
            value={String(user.battlesPlayed)}
          />
          <StatCard
            icon={<Crown className="size-5" />}
            label="Баттлов организовано"
            value={String(user.battlesOrganized)}
          />
          <StatCard
            icon={<Trophy className="size-5" />}
            label="Побед"
            value={String(user.wins)}
          />
          <StatCard
            icon={<Percent className="size-5" />}
            label="Процент побед"
            value={`${user.winRate}%`}
          />
          <StatCard
            icon={<Code2 className="size-5" />}
            label="Топ язык"
            value={user.topLanguage}
          />
        </div>
      </div>

      <Button asChild className="w-full" size="lg" variant="outline">
        <Link to="/battles">Мои баттлы</Link>
      </Button>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 pt-0">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <div>
          <Typography className="font-semibold" variant="h3">
            {value}
          </Typography>
          <Typography variant="muted">{label}</Typography>
        </div>
      </CardContent>
    </Card>
  )
}
