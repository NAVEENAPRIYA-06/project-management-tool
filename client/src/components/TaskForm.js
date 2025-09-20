import React, { useState } from 'react';
import axios from 'axios';
import { Box, Heading, Input, Textarea, Button, VStack } from '@chakra-ui/react';

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = { title, description, assignedTo };
      await axios.post('http://localhost:5000/api/tasks', newTask);

      setTitle('');
      setDescription('');
      setAssignedTo('');

      onTaskAdded();
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Error creating task. Check console for details.');
    }
  };

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg" w="100%" bg="white" boxShadow="md">
      <Heading as="h3" size="md" mb={4}>Add New Task</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={3}>
          <Input
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            placeholder="Assigned To"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />
          <Button type="submit" colorScheme="blue" w="full">
            Add Task
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default TaskForm;