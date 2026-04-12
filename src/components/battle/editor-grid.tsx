import { useState } from 'react'

import type { Participant } from '@/lib/battle-types'

import {
  Button,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Typography,
} from '@/components/ui'
import { cn } from '@/lib/utils'

import { useBattle } from './battle-context'
import { ParticipantEditor } from './participant-editor'

function EditorGrid() {
  const { participants, role } = useBattle()

  if (participants.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Typography variant="muted">Ожидание участников...</Typography>
      </div>
    )
  }

  if (role === 'organizer') {
    return <OrganizerGrid />
  }

  return <ParticipantGrid />
}

function EditorSlot({
  index,
  onSelect,
  participant,
  participants,
  selectedId,
}: {
  index: number
  onSelect: (index: number, id: string) => void
  participant?: Participant
  participants: Participant[]
  selectedId: null | string
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-1">
      <div className="flex shrink-0 gap-1 overflow-x-auto">
        {participants.map((p) => (
          <Button
            className={cn(
              'shrink-0',
              p.id === selectedId &&
                'border-border bg-background hover:bg-background',
            )}
            key={p.id}
            onClick={() => onSelect(index, p.id)}
            size="xs"
            variant={p.id === selectedId ? 'outline' : 'ghost'}
          >
            {p.username}
          </Button>
        ))}
      </div>
      {participant && (
        <div className="min-h-0 flex-1">
          <ParticipantEditor participant={participant} />
        </div>
      )}
    </div>
  )
}

function OrganizerGrid() {
  const { participants } = useBattle()

  const [slots, setSlots] = useState<(null | string)[]>([
    participants[0]?.id ?? null,
    participants[1]?.id ?? null,
    participants[2]?.id ?? null,
    participants[3]?.id ?? null,
  ])

  function selectSlot(index: number, id: string) {
    setSlots((prev) => {
      const next = [...prev]
      const duplicateIndex = next.findIndex(
        (slotId, i) => i !== index && slotId === id,
      )
      if (duplicateIndex !== -1) {
        next[duplicateIndex] = prev[index]
      }
      next[index] = id
      return next
    })
  }

  const slotParticipants = slots.map((id) =>
    id ? participants.find((participant) => participant.id === id) : undefined,
  )

  return (
    <ResizablePanelGroup
      className="flex-1 overflow-hidden"
      orientation="horizontal"
    >
      <ResizablePanel defaultSize="50%" minSize="35%">
        <div className="flex h-full flex-col gap-3 pr-3">
          <EditorSlot
            index={0}
            onSelect={selectSlot}
            participant={slotParticipants[0]}
            participants={participants}
            selectedId={slots[0]}
          />
          {participants.length > 1 && (
            <EditorSlot
              index={1}
              onSelect={selectSlot}
              participant={slotParticipants[1]}
              participants={participants}
              selectedId={slots[1]}
            />
          )}
        </div>
      </ResizablePanel>
      {participants.length > 2 && (
        <>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="50%" minSize="35%">
            <div className="flex h-full flex-col gap-3 pl-3">
              <EditorSlot
                index={2}
                onSelect={selectSlot}
                participant={slotParticipants[2]}
                participants={participants}
                selectedId={slots[2]}
              />
              {participants.length > 3 && (
                <EditorSlot
                  index={3}
                  onSelect={selectSlot}
                  participant={slotParticipants[3]}
                  participants={participants}
                  selectedId={slots[3]}
                />
              )}
            </div>
          </ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  )
}

function ParticipantGrid() {
  const { currentParticipantId, participants } = useBattle()
  const currentUser = participants.find((p) => p.id === currentParticipantId)
  const others = participants.filter((p) => p.id !== currentParticipantId)
  const [topOtherId, setTopOtherId] = useState<null | string>(
    others[0]?.id ?? null,
  )
  const [bottomOtherId, setBottomOtherId] = useState<null | string>(
    others[1]?.id ?? null,
  )

  function selectOther(index: number, id: string) {
    if (index === 0) {
      if (id === bottomOtherId) {
        setBottomOtherId(topOtherId)
      }
      setTopOtherId(id)
    } else {
      if (id === topOtherId) {
        setTopOtherId(bottomOtherId)
      }
      setBottomOtherId(id)
    }
  }

  const topOther = others.find((p) => p.id === topOtherId)
  const bottomOther = others.find((p) => p.id === bottomOtherId)

  return (
    <ResizablePanelGroup
      className="flex-1 overflow-hidden"
      orientation="horizontal"
    >
      {currentUser && (
        <ResizablePanel defaultSize="55%" minSize="35%">
          <div className="h-full pr-3">
            <ParticipantEditor isCurrentUser participant={currentUser} />
          </div>
        </ResizablePanel>
      )}
      {others.length > 0 && (
        <>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="45%" minSize="30%">
            <div className="flex h-full flex-col gap-3 pl-3">
              <EditorSlot
                index={0}
                onSelect={selectOther}
                participant={topOther}
                participants={others}
                selectedId={topOtherId}
              />
              {others.length > 1 && (
                <EditorSlot
                  index={1}
                  onSelect={selectOther}
                  participant={bottomOther}
                  participants={others}
                  selectedId={bottomOtherId}
                />
              )}
            </div>
          </ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  )
}

export { EditorGrid }
