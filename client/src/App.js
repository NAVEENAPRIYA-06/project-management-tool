import React, { useState } from 'react';
import { Box, Heading, VStack, Container, useColorMode, IconButton, useColorModeValue, Button, Flex } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskEditForm from './components/TaskEditForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { useAuth } from './AuthContext';

function App() {
  const [refresh, setRefresh] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.100', 'gray.800');
  const { user, logout } = useAuth();

  const handleTaskAdded = () => {
    setRefresh(!refresh);
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
  };

  const handleCloseEditForm = () => {
    setEditingTask(null);
  };

  // A component to display the main content (task board)
  const MainContent = () => {
    return (
      <>
        <Box position="fixed" top="1rem" right="1rem">
          <IconButton
            aria-label="Toggle dark mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
          />
        </Box>
        <VStack spacing={8}>
          <Flex w="100%" justify="space-between" align="center">
            <Heading as="h1" size="xl">
              Project Management Tool
            </Heading>
            <Button onClick={logout} colorScheme="red">Logout</Button>
          </Flex>
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
      </>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Box bg={bg} minH="100vh" py={8}>
          <Container maxW="container.md">
            <Routes>
              {user ? (
                <Route path="/" element={<MainContent />} />
              ) : (
                <>
                  <Route path="/" element={<Navigate to="/login" replace />} />
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/register" element={<RegisterForm />} />
                </>
              )}
            </Routes>
          </Container>
        </Box>
      </Router>
    </DndProvider>
  );
}

export default App;