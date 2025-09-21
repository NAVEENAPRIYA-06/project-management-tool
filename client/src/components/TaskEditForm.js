import React, { useState } from 'react';
import axios from 'axios';
import { Box, Heading, Input, Textarea, Button, VStack, useColorModeValue } from '@chakra-ui/react';

function TaskEditForm({ task, onClose, onTaskEdited }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [assignedTo, setAssignedTo] = useState(task.assignedTo);
  const formBg = useColorModeValue('white', 'gray.700');
  const inputBg = useColorModeValue('white', 'gray.800');
  const inputColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  const headingColor = useColorModeValue('gray.800', 'whiteAlpha.900');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedTask = { title, description, assignedTo };
      await axios.put(`http://localhost:5000/api/tasks/${task._id}`, updatedTask);
      onTaskEdited();
      onClose();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg" w="100%" bg={formBg} boxShadow="md">
      <Heading as="h3" size="md" mb={4} color={headingColor}>Edit Task</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={3}>
          <Input
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            bg={inputBg}
            color={inputColor}
          />
          <Textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            bg={inputBg}
            color={inputColor}
          />
          <Input
            placeholder="Assigned To"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            bg={inputBg}
            color={inputColor}
          />
          <Button type="submit" colorScheme="blue" w="full">
            Update Task
          </Button>
          <Button onClick={onClose} colorScheme="red" w="full" mt={2}>
            Cancel
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default TaskEditForm;