import { render, fireEvent, screen, waitFor } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import KanbanBoard from '../components/KanbanBoard.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Import Vuetify styles

const vuetify = createVuetify();

describe('KanbanBoard Component', () => {
  it('renders the default columns', () => {
    render(KanbanBoard, {
      global: {
        plugins: [vuetify],
      },
    });

    // Check that the default columns are rendered
    const columnTitles = ['To Do', 'In Progress', 'Done'];
    for (const title of columnTitles) {
      expect(screen.getByText(title)).toBeInTheDocument();
    }
  });

  it('allows adding a new task to a column', async () => {
    render(KanbanBoard, {
      global: {
        plugins: [vuetify],
      },
    });

    // Open the input fields for the first column
    const addButton = screen.getAllByText('+')[0]; // Select the first "+" button
    await fireEvent.click(addButton);

    // Wait for the task input fields to appear (ensure the form is visible)
    const taskTitleInput = await screen.findByLabelText('New Task Title');
    const taskDescriptionInput = await screen.findByLabelText('Task Description (Optional)');
    expect(taskTitleInput).toBeInTheDocument();
    expect(taskDescriptionInput).toBeInTheDocument();

    // Add a new task
    await fireEvent.update(taskTitleInput, 'New Task');
    await fireEvent.update(taskDescriptionInput, 'Task Description');

    const addTaskButton = screen.getByText('Add Task');
    await fireEvent.click(addTaskButton);

    // Verify the task is added to the column
    // Wait for the task to appear in the document
    await waitFor(() => expect(screen.getByText('New Task')).toBeInTheDocument());
  });
});
