import React, { useState } from 'react';
import { Box, Heading, VStack, Container, useColorMode, IconButton, useColorModeValue } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [refresh, setRefresh] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.100', 'gray.800');
  const color = useColorModeValue('gray.800', 'whiteAlpha.900');

  const handleTaskAdded = () => {
    setRefresh(!refresh);
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
            <Heading as="h1" size="xl" color={color}>
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