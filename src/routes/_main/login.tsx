import { createFileRoute, Link } from '@tanstack/react-router'
import { LogIn, Mail } from 'lucide-react'

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

export const Route = createFileRoute('/_main/login')({
  component: LoginPage,
})

function LoginPage() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // TODO: implement login
  }

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <LogIn className="size-5 text-primary" />
            Вход в аккаунт
          </CardTitle>
          <CardDescription>Введите email и пароль для входа</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                autoComplete="current-password"
                id="password"
                placeholder="Введите пароль"
                type="password"
              />
            </div>

            <Button className="mt-2 w-full" size="lg" type="submit">
              Войти
              <Mail />
            </Button>
          </form>

          <Typography className="mt-4 text-center" variant="muted">
            Нет аккаунта?{' '}
            <Link
              className="text-primary underline-offset-4 hover:underline"
              to="/register"
            >
              Зарегистрироваться
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}
