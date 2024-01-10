import { MdCloudUpload } from "react-icons/md";
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [img, setImg] = useState("")
  const [allimage, setAllimage] = useState([]);

  //Convert image inti the base64 forment
  const imagebase64 = async (file) => {
    const reader = new FileReader()
    await reader.readAsDataURL(file)
    const data = new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result)
      reader.onerror = (err) => reject(err)
    })
    return data
  }
  // Extract the selected image file from the event
  const handaluploadImage = async (e) => {
    const file = e.target.files[0];

    // Check if a file is selected and it is either a PNG or JPG image
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      const image = await imagebase64(file);
      setImg(image);
    } else {
      alert("Please select a valid PNG or JPG image.");
      e.target.value = null;
    }
  }

  //Get all images
  const getImage = async () => {
    let result = await fetch("http://localhost:6500/")
    result = await result.json()
    setAllimage(result.data)
    console.log(result);
  }
  //handle uploade button and connet into the 
  let handleSumit = async (e) => {
    e.preventDefault()
    if (img) {
      let result = await fetch("http://localhost:6500/upload", {
        method: "post",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ img: img })
      })
      result = await result.json();
      console.log(result);
      if (result.success) {
        alert(result.message)
        setImg("")
        getImage()
      }
    }
  }
  // Fetches all images from the backend when the component mounts
  useEffect(() => {
    getImage();
  }, [])

  console.log(allimage);
  return (
    <>
      <div className="image-container">
        <form>
          <label htmlFor="upload-image">
            <div className="uploadBox">
              <input type="file" id="upload-image" onChange={handaluploadImage} />
              {img ? <img src={img} /> : <MdCloudUpload />}

            </div>
          </label>
          <div className='btn'>

            <button onClick={handleSumit}>Upload</button>
          </div>
        </form>
        <div className='All_iamge'>
          {
            allimage.map(e => {
              return <img src={e.image} width={"250px"} height={"180px"} />
            })
          }
        </div>
      </div>
    </>
  );
}

export default App;
