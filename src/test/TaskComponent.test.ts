import { render, fireEvent, screen, waitFor } from '@testing-library/vue'
import TaskComponent from '../components/TaskComponent.vue'
import { describe, it, expect } from 'vitest'

describe('TaskComponent', () => {
  const task = { id: 1, title: 'Test Task', description: 'Test task desc.' }

  it('shows the title', () => {
    render(TaskComponent, {
      props: { task },
    })
    expect(screen.getByText(task.title)).toBeTruthy()
  })

  it('hides desc and remove button at start', () => {
    render(TaskComponent, {
      props: { task },
    })
    expect(screen.queryByText(task.description)).toBeNull()
    expect(screen.queryByRole('button', { name: /remove/i })).toBeNull()
  })

  it('shows desc and remove button on hover', async () => {
    render(TaskComponent, {
      props: { task },
    })

    // Simulate hover over the task card
    const card = screen.getByText(task.title).closest('.task-card') // Make sure the card has the correct class
    if (card !== null) {
      await fireEvent.mouseOver(card)
    }

    // Wait for description to appear using findByText to handle dynamic rendering
    await waitFor(() => {
      expect(screen.findByText(task.description)).toBeTruthy()
    })

    // Wait for remove button to appear
    await waitFor(() => {
      expect(screen.findByRole('button', { name: /remove/i })).toBeTruthy()
    })
  })
})
