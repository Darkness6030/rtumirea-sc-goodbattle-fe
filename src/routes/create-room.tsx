import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, Code2, ListChecks, Timer } from 'lucide-react'
import { useState } from 'react'

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Label,
  Slider,
  Typography,
} from '@/components/ui'
import { LANGUAGES, TASKS } from '@/lib/mock'

export const Route = createFileRoute('/create-room')({
  component: CreateRoomPage,
})

function CreateRoomPage() {
  const navigate = useNavigate()

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [timeLimit, setTimeLimit] = useState(10)
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])

  const isValid = selectedLanguages.length > 0 && selectedTasks.length > 0

  function toggleLanguage(id: string) {
    setSelectedLanguages((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id],
    )
  }

  function toggleTask(id: string) {
    setSelectedTasks((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: create room

    navigate({ params: { roomId: 'mock' }, to: '/rooms/$roomId' })
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 py-8">
      <div className="flex flex-col gap-1">
        <Button
          asChild
          className="-ml-1 w-fit text-muted-foreground"
          size="sm"
          variant="ghost"
        >
          <Link to="/">
            <ArrowLeft className="size-4" />
            Назад
          </Link>
        </Button>
        <Typography variant="h1">Создание комнаты</Typography>
        <Typography variant="muted">Настройте параметры баттла</Typography>
      </div>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Code2 className="size-5 text-primary" />
              Разрешённые языки
            </CardTitle>
            <CardDescription>
              Выберите языки программирования для баттла
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {LANGUAGES.map((lang) => (
                <Label
                  className="flex items-center gap-2 font-normal"
                  key={lang.id}
                >
                  <Checkbox
                    checked={selectedLanguages.includes(lang.id)}
                    onCheckedChange={() => toggleLanguage(lang.id)}
                  />
                  {lang.label}
                </Label>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Timer className="size-5 text-primary" />
              Лимит времени
            </CardTitle>
            <CardDescription>Время на выполнение каждой задачи</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <Slider
                max={30}
                min={1}
                onValueChange={([v]) => setTimeLimit(v)}
                step={1}
                value={[timeLimit]}
              />
              <div className="flex justify-between">
                <Typography variant="muted">1 мин</Typography>
                <Typography className="font-medium" variant="small">
                  {timeLimit} мин
                </Typography>
                <Typography variant="muted">30 мин</Typography>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ListChecks className="size-5 text-primary" />
              Задачи
            </CardTitle>
            <CardDescription>Выберите задачи для баттла</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {TASKS.map((task) => (
                <Label
                  className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 font-normal has-checked:border-primary/50 has-checked:bg-primary/5"
                  key={task.id}
                >
                  <Checkbox
                    checked={selectedTasks.includes(task.id)}
                    className="mt-0.5"
                    onCheckedChange={() => toggleTask(task.id)}
                  />
                  <div>
                    <Typography as="p" className="font-medium" variant="body">
                      {task.title}
                    </Typography>
                    <Typography as="p" variant="muted">
                      {task.description}
                    </Typography>
                  </div>
                </Label>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button className="w-full" disabled={!isValid} size="lg" type="submit">
          Продолжить
          <ArrowRight />
        </Button>
      </form>
    </div>
  )
}
