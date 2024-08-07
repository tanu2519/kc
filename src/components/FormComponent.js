import React, { useState, useRef, useCallback } from 'react';
import { Form, Input, Button, DatePicker, Modal } from 'antd';
import 'antd/dist/reset.css'; // Updated import for Ant Design CSS
import moment from 'moment';
import Webcam from 'react-webcam';

const FormComponent = () => {
  const [formState, setFormState] = useState({
    name: '',
    dob: '',
    drivingLicenceNumber: '',
    imageSrc: '',
  });

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const webcamRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date, dateString) => {
    const formattedDate = moment(date).format('DD-MM-YYYY'); // Format date as "date-month-year"
    
    setFormState((prevState) => ({
      ...prevState,
      dob: formattedDate, // Update state with formatted date
    }));
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    // Converting to base64
    //const base64Image = imageSrc.split(',')[1];
    setFormState((prevState) => ({
      ...prevState,
      imageSrc: imageSrc,
    }));
    setIsCameraOpen(false);
  }, [webcamRef]);

  const handleSubmit = () => {
    localStorage.setItem('formData', JSON.stringify(formState));
    console.log('Data stored in local storage:', formState);

    // Here you can add the code to send data to your API
    // fetch('your-api-url', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formState),
    // });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Input Form</h1>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Name">
          <Input
            name="name"
            value={formState.name}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="DOB">
          <DatePicker
            style={{ width: '100%' }}
            value={formState.dob ? moment(formState.dob, 'DD-MM-YYYY') : null}
            onChange={handleDateChange}
            format="DD-MM-YYYY"
          />
        </Form.Item>
        <Form.Item label="Driving Licence Number">
          <Input
            name="drivingLicenceNumber"
            value={formState.drivingLicenceNumber}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Capture Image">
          <Button
            type="primary"
            onClick={() => setIsCameraOpen(true)}
            //disabled={formState.imageSrc !== ''}
          >
            Open Camera
          </Button>
        </Form.Item>
        {formState.imageSrc && (
          <Form.Item label="Captured Image">
            <img src={formState.imageSrc} alt="Captured" style={{ width: '100%' }} />
          </Form.Item>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>

      <Modal
        visible={isCameraOpen}
        footer={null}
        onCancel={() => setIsCameraOpen(false)}
        destroyOnClose={true} // This ensures the Webcam component is unmounted
      >
        {isCameraOpen && (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={320}
              height={240}
            />
            <Button type="primary" onClick={capture}>Capture Image</Button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default FormComponent;
