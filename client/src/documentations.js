// Define an asynchronous function named 'imagebase64' that takes a 'file' as a parameter
const imagebase64 = async (file) => {
    // Create a new FileReader object to read the contents of the file
    const reader = new FileReader();
  
    // Asynchronously read the contents of the file as a Data URL
    await reader.readAsDataURL(file);
  
    // Create a Promise to handle the asynchronous result of reading the file
    const data = new Promise((resolve, reject) => {
      // Set up a callback for when the file reading is successful
      reader.onload = () => resolve(reader.result);
  
      // Set up a callback for when an error occurs during file reading
      reader.onerror = (err) => reject(err);
    });
  
    // Return the Promise representing the result of reading the file
    return data;
  };
  


  /**
 * Handles the selection of an image file from the input element,
 * converts it into base64 format using the imagebase64 function,
 * and updates the state variable 'img' with the base64-encoded image data.
 *
 * @async
 * @function
 * @param {Event} e - Teventhe change  triggered when an image is selected.
 */
const handaluploadImage = async (e) => {
    // Extract the selected image file from the event
    const file = e.target.files[0];
  
    // Convert the selected image file into a base64-encoded string using the imagebase64 function
    const image = await imagebase64(file);
  
    // Update the state variable 'img' with the base64-encoded image data
    setImg(image);
  }



  /**
 * Fetches all images from the backend server using a GET request,
 * updates the state variable 'allimage' with the retrieved data,
 * and logs the result to the console.
 *
 * @async
 * @function
 */
const getImage = async () => {
  // Perform a GET request to fetch all images from the backend server
  let result = await fetch("http://localhost:6500/");

  // Parse the response as JSON
  result = await result.json();

  // Update the state variable 'allimage' with the retrieved image data
  setAllimage(result.data);

  // Log the result to the console for debugging or informational purposes
  console.log(result);
}



/**
 * Handles the form submission for image upload. Prevents the default form behavior,
 * checks if there is an image selected, sends a POST request to the backend server with
 * the base64-encoded image data, and updates state and triggers image retrieval if the
 * upload is successful.
 *
 * @async
 * @function
 * @param {Event} e - The form submission event.
 */
let handleSumit = async (e) => {
  // Prevent the default form submission behavior
  e.preventDefault();

  // Check if there is an image selected for upload
  if (img) {
    // Send a POST request to the backend server for image upload
    let result = await fetch("http://localhost:6500/upload", {
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      // Send the base64-encoded image data in the request body
      body: JSON.stringify({ img: img })
    });

    // Parse the response as JSON
    result = await result.json();
    console.log(result);

    // If the upload is successful, show an alert, reset state, and fetch all images
    if (result.success) {
      alert(result.message);
      setImg(""); // Reset the state variable for the selected image
      getImage(); // Fetch all images to update the display
    }
  }
}
