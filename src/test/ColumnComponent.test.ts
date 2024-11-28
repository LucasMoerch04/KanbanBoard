import { render, fireEvent, screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import ColumnComponent from '../components/ColumnComponent.vue';
import TaskComponent from '../components/TaskComponent.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';

const vuetify = createVuetify();

describe('ColumnComponent', () => {
  const mockColumn = {
    name: 'To Do',
    tasks: [],
  };

  it('renders the column name', () => {
    render(ColumnComponent, {
      props: {
        column: mockColumn,
      },
      global: {
        plugins: [vuetify],
        components: { TaskComponent },
      },
    });

    expect(screen.getByText('To Do')).toBeInTheDocument();
  });

  it('displays a button to add a task', () => {
    render(ColumnComponent, {
      props: {
        column: mockColumn,
      },
      global: {
        plugins: [vuetify],
        components: { TaskComponent },
      },
    });

    const addButton = screen.getByRole('button', { name: 'Add Task' });
    expect(addButton).toBeInTheDocument();
  });

  it('adds a task when the Add Task button is clicked', async () => {
    // Define a column with no tasks initially
    const columnWithTasks = {
      name: 'To Do',
      tasks: [],
    };

    // Render the ColumnComponent with the columnWithTasks prop
    render(ColumnComponent, {
      props: {
        column: columnWithTasks,
      },
      global: {
        plugins: [vuetify],
        components: { TaskComponent },
      },
    });

    // Verify no tasks are present initially
    expect(screen.queryByText('New Task')).not.toBeInTheDocument();

    // Find and click the Add Task button
    const addButton = screen.getByRole('button', { name: 'Add Task' });
    await fireEvent.click(addButton);

    // Verify the new task is added
    expect(screen.getByText('New Task')).toBeInTheDocument();
  });

  it('renders a TaskComponent for each task in the column', () => {
    const columnWithTasks = {
      name: 'To Do',
      tasks: [
        { id: 1, title: 'Task 1' },
        { id: 2, title: 'Task 2' },
      ],
    };

    render(ColumnComponent, {
      props: {
        column: columnWithTasks,
      },
      global: {
        plugins: [vuetify],
        components: { TaskComponent },
      },
    });

    // Verify each task renders correctly
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });
});
