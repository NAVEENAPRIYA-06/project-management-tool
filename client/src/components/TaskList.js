import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDrag, useDrop } from 'react-dnd';
import { Box, Heading, List, ListItem, Text, Flex, Spacer, Tag, IconButton, useColorModeValue, chakra } from '@chakra-ui/react';
import { DeleteIcon, ChevronRightIcon, EditIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

const MotionListItem = chakra(motion.li);

function TaskList({ onTaskAdded, onEditClick }) {
  const [tasks, setTasks] = useState([]);

  // Dynamic colors for dark mode
  const columnBg = useColorModeValue('gray.50', 'gray.700');
  const taskBg = useColorModeValue('white', 'gray.800');
  const taskColor = useColorModeValue('gray.600', 'gray.400');
  const headingColor = useColorModeValue('gray.800', 'whiteAlpha.900');

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

  const [, todoDropRef] = useDrop(() => ({
    accept: 'task',
    drop: (item) => moveTask(item.id, 'To Do'),
  }));

  const [, inProgressDropRef] = useDrop(() => ({
    accept: 'task',
    drop: (item) => moveTask(item.id, 'In Progress'),
  }));

  const [, doneDropRef] = useDrop(() => ({
    accept: 'task',
    drop: (item) => moveTask(item.id, 'Done'),
  }));

  const DraggableTask = ({ task }) => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
      type: 'task',
      item: { id: task._id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    return (
      <MotionListItem
        ref={dragRef}
        opacity={isDragging ? 0.5 : 1}
        p={3} borderWidth="1px" borderRadius="md" bg={taskBg}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <Flex alignItems="center" flexWrap="nowrap">
          <Box flexGrow={1} minWidth="0">
            <Heading as="h4" size="sm" color={headingColor} isTruncated>
              {task.title}
            </Heading>
            <Text fontSize="sm" color={taskColor}>
              {task.description}
            </Text>
            {task.assignedTo && (
              <Text fontSize="xs" color={taskColor}>
                Assigned to: {task.assignedTo}
              </Text>
            )}
            <Tag size="sm" colorScheme={getStatusColor(task.status)} mt={1}>
              {task.status}
            </Tag>
          </Box>
          <Spacer />
          <IconButton
            aria-label="Edit task"
            icon={<EditIcon />}
            size="sm"
            colorScheme="blue"
            mr={2}
            onClick={() => onEditClick(task)}
          />
          <IconButton
            aria-label="Toggle status"
            icon={<ChevronRightIcon />}
            size="sm"
            colorScheme="purple"
            mr={2}
            onClick={() => moveTask(task._id, 'Done')}
          />
          <IconButton
            aria-label="Delete task"
            icon={<DeleteIcon />}
            size="sm"
            colorScheme="red"
            onClick={() => handleDelete(task._id)}
          />
        </Flex>
      </MotionListItem>
    );
  };

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg" w="100%" bg={useColorModeValue('white', 'gray.700')} boxShadow="md">
      {tasks.length === 0 ? (
        <Text>No tasks to display. Add a new task above!</Text>
      ) : (
        <Flex flexWrap="wrap" justify="center">
          <Box flex="1 1 300px" m={2} p={4} bg={columnBg} borderRadius="md" minH="300px" ref={todoDropRef}>
            <Heading as="h4" size="sm" mb={2} color={headingColor}>To Do</Heading>
            <List spacing={3}>
              {todoTasks.map(task => (
                <DraggableTask key={task._id} task={task} />
              ))}
            </List>
          </Box>
          <Box flex="1 1 300px" m={2} p={4} bg={columnBg} borderRadius="md" minH="300px" ref={inProgressDropRef}>
            <Heading as="h4" size="sm" mb={2} color={headingColor}>In Progress</Heading>
            <List spacing={3}>
              {inProgressTasks.map(task => (
                <DraggableTask key={task._id} task={task} />
              ))}
            </List>
          </Box>
          <Box flex="1 1 300px" m={2} p={4} bg={columnBg} borderRadius="md" minH="300px" ref={doneDropRef}>
            <Heading as="h4" size="sm" mb={2} color={headingColor}>Done</Heading>
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