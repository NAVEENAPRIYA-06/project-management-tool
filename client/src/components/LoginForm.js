import React, { useState } from 'react';
import { Box, Heading, Input, Button, VStack, useColorModeValue } from '@chakra-ui/react';
import { useAuth } from '../AuthContext';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const formBg = useColorModeValue('white', 'gray.700');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg" w="100%" maxW="md" bg={formBg} boxShadow="md">
      <Heading as="h3" size="lg" mb={4}>Login</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={3}>
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" colorScheme="blue" w="full">Login</Button>
        </VStack>
      </form>
    </Box>
  );
}

export default LoginForm;