import { render, fireEvent, screen, waitFor } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import KanbanBoard from '../components/KanbanBoard.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';

const vuetify = createVuetify();

describe('KanbanBoard Component', () => {
  it('renders the default columns', () => {
    render(KanbanBoard, {
      global: {
        plugins: [vuetify],
      },
    });

    // Check default columns
    const columnTitles = ['To Do', 'In Progress', 'Done'];
    columnTitles.forEach(title => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('allows adding a new task to a column', async () => {
    render(KanbanBoard, {
      global: {
        plugins: [vuetify],
      },
    });

    // Find the "+" button and click it
    const addButton = screen.getAllByText('+')[0]; // Select the first "+" button
    await fireEvent.click(addButton);

    // Wait for the task input fields to appear
    await waitFor(() => screen.getByLabelText('New Task Title')); // Wait for input fields to appear

    // Find and interact with the task inputs
    const taskTitleInput = screen.getByLabelText('New Task Title');
    const taskDescriptionInput = screen.getByLabelText('Task Description (Optional)');
    expect(taskTitleInput).toBeInTheDocument();
    expect(taskDescriptionInput).toBeInTheDocument();

    // Fill out the task input
    await fireEvent.update(taskTitleInput, 'New Task');
    await fireEvent.update(taskDescriptionInput, 'Task Description');

    // Click the Add Task button
    const addTaskButton = screen.getByText('Add Task');
    await fireEvent.click(addTaskButton);

    // Wait for the task to be added
    await waitFor(() => expect(screen.getByText('New Task')).toBeInTheDocument());
  });

  it('shows an error when task title is empty', async () => {
    render(KanbanBoard, {
      global: {
        plugins: [vuetify],
      },
    });

    // Open task input
    const addButton = screen.getAllByText('+')[0];
    await fireEvent.click(addButton);

    // Wait for inputs
    const taskTitleInput = await screen.findByLabelText('New Task Title');
    const taskDescriptionInput = await screen.findByLabelText('Task Description (Optional)');
    await fireEvent.update(taskTitleInput, ''); // Empty title
    await fireEvent.update(taskDescriptionInput, 'Some description');

    // Click Add Task
    const addTaskButton = screen.getByText('Add Task');
    await fireEvent.click(addTaskButton);

    // Check for error
    expect(screen.getByText('Task title is required.')).toBeInTheDocument();
  });

  it('allows adding a new column', async () => {
    render(KanbanBoard, {
      global: {
        plugins: [vuetify],
      },
    });
  
    // Open column input
    const addColumnButton = screen.getByText('Add Column');
    await fireEvent.click(addColumnButton);
  
    // Wait for input field
    const newColumnInput = await screen.findByLabelText('New Column Title');
    expect(newColumnInput).toBeInTheDocument();
  
    // Update input value
    await fireEvent.update(newColumnInput, 'New Column');
  
    // Simulate pressing Enter to confirm
    await fireEvent.keyUp(newColumnInput, { key: 'Enter', code: 'Enter' });
  
    // Verify new column is added
    await waitFor(() => {
      expect(screen.getByText('New Column')).toBeInTheDocument();
    });
  });
  
  

  it('toggles column input visibility', async () => {
    render(KanbanBoard, {
      global: {
        plugins: [vuetify],
      },
    });

    // Check initial state
    expect(screen.queryByLabelText('New Column Title')).not.toBeInTheDocument();

    // Open column input
    const addColumnButton = screen.getByText('Add Column');
    await fireEvent.click(addColumnButton);
    expect(screen.getByLabelText('New Column Title')).toBeInTheDocument();

    // Close column input
    await fireEvent.click(addColumnButton);
    expect(screen.queryByLabelText('New Column Title')).not.toBeInTheDocument();
  });

  /* This has issues with querying the values before the vue component render, and therefore doesn't work yet.
  it('allows adding a new task to a column', async () => {
    render(KanbanBoard, {
      global: {
        plugins: [vuetify],
      },
    });
  
    // Open task input
    const addButton = screen.getAllByText('+')[0];
    await fireEvent.click(addButton);
  
    // Query the task title input
    const taskTitleInput = await screen.getByPlaceholderText("New Task Title");
  
    // Interact with the input
    await fireEvent.update(taskTitleInput, 'New Task');
  
    // Add the task
    const addTaskButton = screen.getByText('Add Task');
    await fireEvent.click(addTaskButton);
  
    // Verify task is added
    await waitFor(() => {
      expect(screen.getByText('New Task')).toBeInTheDocument();
    });
  });
  */

});
