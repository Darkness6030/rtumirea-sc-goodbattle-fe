import { createFileRoute, Link } from '@tanstack/react-router'
import { Calendar, Crown, Plus, Trophy, Users } from 'lucide-react'

import type { BattleHistoryItem } from '@/lib/mock'

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Typography,
} from '@/components/ui'
import { LANGUAGE_LABELS } from '@/lib/battle-mock'
import { MOCK_BATTLE_HISTORY } from '@/lib/mock'

export const Route = createFileRoute('/battles')({
  component: BattlesPage,
})

function BattleCard({ battle }: { battle: BattleHistoryItem }) {
  const date = new Date(battle.date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <Card className="transition-colors hover:bg-muted/50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            {battle.role === 'organizer' ? (
              <Crown className="size-4 text-primary" />
            ) : (
              <Users className="size-4 text-primary" />
            )}
            {battle.title}
          </span>
          {battle.place !== undefined && (
            <Badge
              variant={
                battle.place === 1
                  ? 'default'
                  : battle.place <= 3
                    ? 'secondary'
                    : 'outline'
              }
            >
              <Trophy className="size-3" />
              {battle.place} место
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="size-3.5" />
            <Typography variant="muted">{date}</Typography>
          </div>
          <Typography variant="muted">
            {battle.participants} участников
          </Typography>
          <Typography variant="muted">
            {battle.solvedTasks}/{battle.totalTasks} задач
          </Typography>
          <div className="flex gap-1">
            {battle.languages.map((lang) => (
              <Badge key={lang} variant="outline">
                {LANGUAGE_LABELS[lang] ?? lang}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function BattleList({ battles }: { battles: BattleHistoryItem[] }) {
  if (battles.length === 0) {
    return (
      <div className="py-12 text-center">
        <Typography variant="muted">Баттлов пока нет</Typography>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {battles.map((battle) => (
        <BattleCard battle={battle} key={battle.id} />
      ))}
    </div>
  )
}

function BattlesPage() {
  const participantBattles = MOCK_BATTLE_HISTORY.filter(
    (b) => b.role === 'participant',
  )
  const organizerBattles = MOCK_BATTLE_HISTORY.filter(
    (b) => b.role === 'organizer',
  )

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 py-8">
      <div className="flex justify-between">
        <div>
          <Typography variant="h1">Мои баттлы</Typography>
          <Typography className="mt-1" variant="muted">
            История ваших соревнований
          </Typography>
        </div>

        <Button asChild variant="secondary">
          <Link to="/">
            <Plus /> Новый
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="participant">
        <TabsList>
          <TabsTrigger value="participant">
            <Users className="size-4" />
            Участник ({participantBattles.length})
          </TabsTrigger>
          <TabsTrigger value="organizer">
            <Crown className="size-4" />
            Организатор ({organizerBattles.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="participant">
          <BattleList battles={participantBattles} />
        </TabsContent>
        <TabsContent value="organizer">
          <BattleList battles={organizerBattles} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
