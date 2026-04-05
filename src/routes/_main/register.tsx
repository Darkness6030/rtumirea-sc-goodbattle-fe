import { createFileRoute, Link } from '@tanstack/react-router'
import { UserPlus } from 'lucide-react'

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Typography,
} from '@/components/ui'

export const Route = createFileRoute('/_main/register')({
  component: RegisterPage,
})

function RegisterPage() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // TODO: implement registration
  }

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <UserPlus className="size-5 text-primary" />
            Создание аккаунта
          </CardTitle>
          <CardDescription>Заполните данные для регистрации</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Имя</Label>
              <Input
                autoComplete="name"
                id="name"
                placeholder="Ваше имя"
                type="text"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                autoComplete="email"
                id="email"
                placeholder="you@example.com"
                type="email"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                autoComplete="new-password"
                id="password"
                placeholder="Придумайте пароль"
                type="password"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="confirmPassword">Подтверждение пароля</Label>
              <Input
                autoComplete="new-password"
                id="confirmPassword"
                placeholder="Повторите пароль"
                type="password"
              />
            </div>

            <Button className="mt-2 w-full" size="lg" type="submit">
              Создать аккаунт
              <UserPlus />
            </Button>
          </form>

          <Typography className="mt-4 text-center" variant="muted">
            Уже есть аккаунт?{' '}
            <Link
              className="text-primary underline-offset-4 hover:underline"
              to="/login"
            >
              Войти
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}
