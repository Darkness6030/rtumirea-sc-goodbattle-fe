import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, Code2, ListChecks, Timer } from 'lucide-react'
import { useState } from 'react'

import {
  queryClient,
  tasksQueryOptions,
  useCreateRoom,
  useLanguagesQuery,
  useTasksQuery,
} from '@/api'
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
  Spinner,
  Typography,
} from '@/components/ui'

export const Route = createFileRoute('/(app)/create-room')({
  component: CreateRoomPage,
  loader: () => queryClient.ensureQueryData(tasksQueryOptions()),
  pendingComponent: PagePending,
})

function CreateRoomPage() {
  const navigate = useNavigate()
  const createRoom = useCreateRoom()

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [timeLimit, setTimeLimit] = useState(10)
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])

  const languagesQuery = useLanguagesQuery()
  const tasksQuery = useTasksQuery()

  const isValid =
    selectedLanguages.length > 0 &&
    selectedTasks.length > 0 &&
    !createRoom.isPending

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!isValid) return

    try {
      const data = await createRoom.mutateAsync({
        body: {
          languages: selectedLanguages,
          task_ids: selectedTasks,
          time_limit: timeLimit,
        },
      })

      void navigate({
        params: { roomId: data.room_id },
        to: '/rooms/$roomId',
      })
    } catch {
      return
    }
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
              {!languagesQuery.data && languagesQuery.isPending && <Spinner />}
              {languagesQuery.data?.map((lang) => (
                <Label
                  className="flex items-center gap-2 font-normal"
                  key={lang.id}
                >
                  <Checkbox
                    checked={selectedLanguages.includes(lang.code)}
                    onCheckedChange={() => toggleLanguage(lang.code)}
                  />
                  {lang.name}
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
              {!tasksQuery.data && tasksQuery.isPending && <Spinner />}
              {tasksQuery.data?.map((task) => (
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
              {tasksQuery.isFetched && tasksQuery.data?.length === 0 && (
                <Typography variant="muted">Список задач пуст</Typography>
              )}
            </div>
          </CardContent>
        </Card>

        <Button className="w-full" disabled={!isValid} size="lg" type="submit">
          {createRoom.isPending && <Spinner />}
          Продолжить
          <ArrowRight />
        </Button>
      </form>
    </div>
  )
}

function PagePending() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 items-center justify-center py-8">
      <Spinner className="size-6" />
    </div>
  )
}
