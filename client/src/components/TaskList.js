import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDrag, useDrop } from 'react-dnd';
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
      alert('Error deleting task. Check console for details.');
    }
  };

  const moveTask = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, { status: newStatus });
      onTaskAdded();
    } catch (error) {
      console.error('Error updating task status:', error);
      alert('Error updating task status. Check console for details.');
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

  const todoTasks = tasks.filter(task => task.status === 'To Do');
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress');
  const doneTasks = tasks.filter(task => task.status === 'Done');

  const createDropZone = (status) => {
    const [, dropRef] = useDrop(() => ({
      accept: 'task',
      drop: (item) => moveTask(item.id, status),
    }));
    return dropRef;
  };

  const todoDropRef = createDropZone('To Do');
  const inProgressDropRef = createDropZone('In Progress');
  const doneDropRef = createDropZone('Done');

  const DraggableTask = ({ task }) => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
      type: 'task',
      item: { id: task._id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    return (
      <ListItem
        ref={dragRef}
        opacity={isDragging ? 0.5 : 1}
        p={3} borderWidth="1px" borderRadius="md" bg="white"
      >
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
          <IconButton
            aria-label="Delete task"
            icon={<DeleteIcon />}
            size="sm"
            colorScheme="red"
            onClick={() => handleDelete(task._id)}
          />
        </Flex>
      </ListItem>
    );
  };

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg" w="100%" bg="white" boxShadow="md">
      {tasks.length === 0 ? (
        <Text>No tasks to display. Add a new task above!</Text>
      ) : (
        <Flex>
          {/* To Do Column */}
          <Box flex="1" mr={2} p={4} bg="gray.50" borderRadius="md" minH="300px" ref={todoDropRef}>
            <Heading as="h4" size="sm" mb={2}>To Do</Heading>
            <List spacing={3}>
              {todoTasks.map(task => (
                <DraggableTask key={task._id} task={task} />
              ))}
            </List>
          </Box>

          {/* In Progress Column */}
          <Box flex="1" mx={2} p={4} bg="gray.50" borderRadius="md" minH="300px" ref={inProgressDropRef}>
            <Heading as="h4" size="sm" mb={2}>In Progress</Heading>
            <List spacing={3}>
              {inProgressTasks.map(task => (
                <DraggableTask key={task._id} task={task} />
              ))}
            </List>
          </Box>

          {/* Done Column */}
          <Box flex="1" ml={2} p={4} bg="gray.50" borderRadius="md" minH="300px" ref={doneDropRef}>
            <Heading as="h4" size="sm" mb={2}>Done</Heading>
            <List spacing={3}>
              {doneTasks.map(task => (
                <DraggableTask key={task._id} task={task} />
              ))}
            </List>
          </Box>
        </Flex>
      )}
    </Box>
  );
}

export default TaskList;