import React, { useState } from 'react';
import { Box, Heading, VStack, Container, useColorMode, IconButton, useColorModeValue } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskEditForm from './components/TaskEditForm';

function App() {
  const [refresh, setRefresh] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.100', 'gray.800');

  const handleTaskAdded = () => {
    setRefresh(!refresh);
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
  };

  const handleCloseEditForm = () => {
    setEditingTask(null);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box bg={bg} minH="100vh" py={8}>
        <Container maxW="container.md">
          <Box position="fixed" top="1rem" right="1rem">
            <IconButton
              aria-label="Toggle dark mode"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
            />
          </Box>
          <VStack spacing={8}>
            <Heading as="h1" size="xl">
              Project Management Tool
            </Heading>
            {editingTask ? (
              <TaskEditForm task={editingTask} onClose={handleCloseEditForm} onTaskEdited={handleTaskAdded} />
            ) : (
              <TaskForm onTaskAdded={handleTaskAdded} />
            )}
            <TaskList
              key={refresh}
              onTaskAdded={handleTaskAdded}
              onEditClick={handleEditClick}
            />
          </VStack>
        </Container>
      </Box>
    </DndProvider>
  );
}

export default App;