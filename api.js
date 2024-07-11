import axios from 'axios';

export const postToDatabase = async (data) => {
  try {
    const response = await axios.post('http://10.0.2.2:3001/complain', data);

    if (response.status === 200) {
      console.log('Data was successfully posted to the database!');
      // Handle any success actions here
    } else {
      console.log('Failed to post data to the database.');
      // Handle error scenarios
    }
  } catch (error) {
    console.error('Error while posting data:', error);
    // Handle any network errors or other exceptions
  }
};
 export const  visitorDatabse = async (data) => {
  try {
    const response = await axios.post('http://10.0.2.2:3001/visitor', data);

    if (response.status === 200) {
      console.log('Data was successfully posted to the database!');
      // Handle any success actions here
    } else {
      console.log('Failed to post data to the database.');
      // Handle error scenarios
    }
  } catch (error) {
    console.error('Error while posting data:', error);
    // Handle any network errors or other exceptions
  }
};

export const fetchData = async () => {
  try {
    // Make a GET request to the API endpoint using Axios
    const response = await axios.get('http://10.0.2.2:3001/news');

    // Access the data from the response
    const data = response.data.Title;

    // Process the retrieved data (e.g., display or use it)
    console.log('Received data:', data);

    // Return the data if needed
    return data;
  } catch (error) {
    // Handle any errors that occur during the API call
    console.error('Error fetching data:', error.message);
    // Optionally, throw the error to handle it elsewhere
    throw error;
  }
}
