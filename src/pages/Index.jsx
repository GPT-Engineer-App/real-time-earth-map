// Importing necessary components from @chakra-ui/react
import { Box, Flex, Heading, Text, VStack, HStack, Spinner, useToast, Image } from "@chakra-ui/react";
import { FaGlobeAmericas } from "react-icons/fa";

// Import React hooks
import React, { useState, useEffect } from "react";

const Index = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [earthData, setEarthData] = useState(null);

  useEffect(() => {
    // Fetch the real-time earth data from a hypothetical API
    fetch("https://api.realtimeearthdata.com/v1/data")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setEarthData(data);
        setLoading(false);
      })
      .catch((error) => {
        toast({
          title: "An error occurred.",
          description: "Unable to load earth data.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setLoading(false);
      });
  }, [toast]);

  return (
    <VStack spacing={4} align="stretch" m={4}>
      <Flex justifyContent="center" alignItems="center">
        <Heading as="h1" size="xl" mb={4}>
          Earth Real-time Data Explorer <FaGlobeAmericas />
        </Heading>
      </Flex>
      <Box p={5} shadow="md" borderWidth="1px">
        <HStack spacing={4}>
          <Box flexShrink={0}>
            <Image src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxlYXJ0aCUyMGZyb20lMjBzcGFjZXxlbnwwfHx8fDE3MDkzMzgxMzl8MA&ixlib=rb-4.0.3&q=80&w=1080" borderRadius="full" boxSize="100px" objectFit="cover" />
          </Box>
          <VStack align="stretch">
            {loading ? (
              <Spinner />
            ) : (
              earthData && (
                <VStack spacing={2}>
                  <Text fontWeight="bold">Temperature: {earthData.temperature}°C</Text>
                  <Text fontWeight="bold">Humidity: {earthData.humidity}%</Text>
                  <Text fontWeight="bold">Wind Speed: {earthData.windSpeed} km/h</Text>
                </VStack>
              )
            )}
          </VStack>
        </HStack>
      </Box>
      {!loading && (
        <Box height="400px">
          {/* Assuming we have a component that can render a map with data points */}
          {/* Here we would use a Map component and pass the earthData object to it */}
          <Text>A map would go here displaying various data points using the earthData object.</Text>
        </Box>
      )}
    </VStack>
  );
};

export default Index;
