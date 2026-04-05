import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import {
  ArrowLeft,
  ArrowRight,
  Crown,
  ExternalLink,
  LogIn,
  Users,
} from 'lucide-react'
import { startTransition, useState, ViewTransition } from 'react'

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from '@/components/ui'

export const Route = createFileRoute('/_main/')({
  component: Index,
})

function Index() {
  const navigate = useNavigate()

  const [roomCode, setRoomCode] = useState('')
  const [step, setStep] = useState<'code' | 'name'>('code')
  const [name, setName] = useState('')

  function handleJoinSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (step === 'code') {
      if (roomCode.trim()) {
        startTransition(() => {
          setStep('name')
        })
      }
    } else {
      if (name.trim()) {
        // TODO: navigate to room

        navigate({ params: { roomId: 'mock' }, to: '/rooms/$roomId' })
      }
    }
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Crown className="size-5 text-primary" />
            Организатор
          </CardTitle>
          <CardDescription>
            Создайте свою комнату и пригласите участников
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full" size="lg">
            <Link to="/create-room">
              Создать комнату
              <ExternalLink />
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="size-5 text-primary" />
            Участник
            {step === 'name' && (
              <ViewTransition>
                <Button
                  className="ml-auto text-muted-foreground"
                  onClick={() => startTransition(() => setStep('code'))}
                  size="sm"
                  variant="ghost"
                >
                  <ArrowLeft /> Назад
                </Button>
              </ViewTransition>
            )}
          </CardTitle>
          <CardDescription>
            Присоединитесь к существующей комнате
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleJoinSubmit}>
            <ViewTransition>
              {step === 'code' ? (
                <Input
                  onChange={(e) => setRoomCode(e.target.value)}
                  placeholder="Код комнаты"
                  value={roomCode}
                />
              ) : (
                <Input
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше имя"
                  value={name}
                />
              )}
              <Button className="w-full" size="lg" type="submit">
                {step === 'code' ? (
                  <>
                    Продолжить
                    <ArrowRight />
                  </>
                ) : (
                  <>
                    Войти
                    <LogIn />
                  </>
                )}
              </Button>
            </ViewTransition>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
