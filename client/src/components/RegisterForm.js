import React, { useState } from 'react';
import { Box, Heading, Input, Button, VStack, useColorModeValue } from '@chakra-ui/react';
import { useAuth } from '../AuthContext';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const formBg = useColorModeValue('white', 'gray.700');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg" w="100%" maxW="md" bg={formBg} boxShadow="md">
      <Heading as="h3" size="lg" mb={4}>Register</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={3}>
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" colorScheme="blue" w="full">Register</Button>
        </VStack>
      </form>
    </Box>
  );
}

export default RegisterForm;