import React, { useState } from 'react';
import { Box, Heading, VStack, Container } from '@chakra-ui/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleTaskAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box bg="gray.100" minH="100vh" py={8}>
        <Container maxW="container.md">
          <VStack spacing={8}>
            <Heading as="h1" size="xl" color="brand.800">
              Project Management Tool
            </Heading>
            <TaskForm onTaskAdded={handleTaskAdded} />
            <TaskList key={refresh} onTaskAdded={handleTaskAdded} />
          </VStack>
        </Container>
      </Box>
    </DndProvider>
  );
}

export default App;