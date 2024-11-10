<template>
    <div class="kanban-board">
      <h1>Kanban Board</h1>
      <div class="columns">
        <ColumnComponent
          v-for="column in columns"
          :key="column.id"
          :column="column"
        />
      </div>
  
      <!-- Form to add new column -->
      <form @submit.prevent="addColumn">
        <input v-model="newColumnTitle" placeholder="Add column" class="add-column-input" />
        <button type="submit">+</button>
      </form>
    </div>
</template>

<script lang="ts">
    import { defineComponent, reactive, ref } from 'vue';
    import ColumnComponent from '../components/ColumnComponent.vue';
    import type { Column } from '../components/types';

    export default defineComponent({
    name: 'KanbanBoard',
    components: {
        ColumnComponent,
    },
    setup() {
        // Local state for columns
        const columns = reactive<Column[]>([
        { id: 1, name: 'To Do', tasks: [{ id: 1, title: 'Task 1' }] },
        { id: 2, name: 'In Progress', tasks: [{ id: 2, title: 'Task 2' }] },
        { id: 3, name: 'Done', tasks: [{ id: 3, title: 'Task 3' }] },
        ]);

        const newColumnTitle = ref('');

        // Function to add a new column
        const addColumn = () => {
        if (newColumnTitle.value.trim()) {
            columns.push({
            id: Date.now(),
            name: newColumnTitle.value,
            tasks: [],
            });
            newColumnTitle.value = ''; 
        }
        };

        return {
        columns,
        addColumn,
        newColumnTitle,
        };
    },
    });
    </script>

    <style scoped>
    .kanban-board {
    display: flex;
    flex-direction: column;
    align-items: center;
    }

    .columns {
    display: flex;
    gap: 1rem;
    }

    .add-column-input {
    padding: 5px;
    margin-right: 5px;
    }
</style>
  