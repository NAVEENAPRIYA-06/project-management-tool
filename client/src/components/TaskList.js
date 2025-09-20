import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, List, ListItem, Text, Button, Flex, Spacer, Tag, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

function TaskList({ onTaskAdded }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [onTaskAdded]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      onTaskAdded();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleUpdateStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'To Do' ? 'In Progress' : currentStatus === 'In Progress' ? 'Done' : 'To Do';
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, { status: newStatus });
      onTaskAdded();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'To Do': return 'gray';
      case 'In Progress': return 'orange';
      case 'Done': return 'green';
      default: return 'gray';
    }
  };

  // Filter tasks into three categories
  const todoTasks = tasks.filter(task => task.status === 'To Do');
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress');
  const doneTasks = tasks.filter(task => task.status === 'Done');

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg" w="100%" bg="white" boxShadow="md">
      {tasks.length === 0 ? (
        <Text>No tasks to display. Add a new task above!</Text>
      ) : (
        <Flex>
          {/* To Do Column */}
          <Box flex="1" mr={2} p={4} bg="gray.50" borderRadius="md" minH="300px">
            <Heading as="h4" size="sm" mb={2}>To Do</Heading>
            <List spacing={3}>
              {todoTasks.map(task => (
                <ListItem key={task._id} p={3} borderWidth="1px" borderRadius="md" bg="white">
                  <Flex alignItems="center">
                    <Box>
                      <Heading as="h4" size="sm">{task.title}</Heading>
                      <Text fontSize="sm" color="gray.600">{task.description}</Text>
                      {task.assignedTo && <Text fontSize="xs" color="gray.500">Assigned to: {task.assignedTo}</Text>}
                      <Tag size="sm" colorScheme={getStatusColor(task.status)} mt={1}>
                        {task.status}
                      </Tag>
                    </Box>
                    <Spacer />
                    <Button
                      size="sm"
                      colorScheme="purple"
                      mr={2}
                      onClick={() => handleUpdateStatus(task._id, task.status)}
                    >
                      Toggle Status
                    </Button>
                    <IconButton
                      aria-label="Delete task"
                      icon={<DeleteIcon />}
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDelete(task._id)}
                    />
                  </Flex>
                </ListItem>
              ))}
            </List>
          </Box>

          {/* In Progress Column */}
          <Box flex="1" mx={2} p={4} bg="gray.50" borderRadius="md" minH="300px">
            <Heading as="h4" size="sm" mb={2}>In Progress</Heading>
            <List spacing={3}>
              {inProgressTasks.map(task => (
                <ListItem key={task._id} p={3} borderWidth="1px" borderRadius="md" bg="white">
                  <Flex alignItems="center">
                    <Box>
                      <Heading as="h4" size="sm">{task.title}</Heading>
                      <Text fontSize="sm" color="gray.600">{task.description}</Text>
                      {task.assignedTo && <Text fontSize="xs" color="gray.500">Assigned to: {task.assignedTo}</Text>}
                      <Tag size="sm" colorScheme={getStatusColor(task.status)} mt={1}>
                        {task.status}
                      </Tag>
                    </Box>
                    <Spacer />
                    <Button
                      size="sm"
                      colorScheme="purple"
                      mr={2}
                      onClick={() => handleUpdateStatus(task._id, task.status)}
                    >
                      Toggle Status
                    </Button>
                    <IconButton
                      aria-label="Delete task"
                      icon={<DeleteIcon />}
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDelete(task._id)}
                    />
                  </Flex>
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Done Column */}
          <Box flex="1" ml={2} p={4} bg="gray.50" borderRadius="md" minH="300px">
            <Heading as="h4" size="sm" mb={2}>Done</Heading>
            <List spacing={3}>
              {doneTasks.map(task => (
                <ListItem key={task._id} p={3} borderWidth="1px" borderRadius="md" bg="white">
                  <Flex alignItems="center">
                    <Box>
                      <Heading as="h4" size="sm">{task.title}</Heading>
                      <Text fontSize="sm" color="gray.600">{task.description}</Text>
                      {task.assignedTo && <Text fontSize="xs" color="gray.500">Assigned to: {task.assignedTo}</Text>}
                      <Tag size="sm" colorScheme={getStatusColor(task.status)} mt={1}>
                        {task.status}
                      </Tag>
                    </Box>
                    <Spacer />
                    <Button
                      size="sm"
                      colorScheme="purple"
                      mr={2}
                      onClick={() => handleUpdateStatus(task._id, task.status)}
                    >
                      Toggle Status
                    </Button>
                    <IconButton
                      aria-label="Delete task"
                      icon={<DeleteIcon />}
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDelete(task._id)}
                    />
                  </Flex>
                </ListItem>
              ))}
            </List>
          </Box>
        </Flex>
      )}
    </Box>
  );
}

export default TaskList;