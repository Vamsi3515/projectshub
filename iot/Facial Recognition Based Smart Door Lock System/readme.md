# Face Authentication-Based Door Lock System

## Overview
This project implements a face authentication-based door lock system using OpenCV, face_recognition library, and an Arduino-controlled relay module. The system captures a face through a webcam, compares it with authorized images, and unlocks the door if authentication is successful.

## Features
- Real-time face recognition using OpenCV and `face_recognition` library.
- Serial communication with Arduino to control a relay-based door lock.
- Supports adding new authorized faces by placing images in a folder.
- Displays authentication status on the screen.

## Requirements
### Hardware
- **Arduino Uno**
- **Relay Module**
- **Door Lock**
- **Webcam**
- **Power Supply & Connectors**

### Software
- **Python 3.8+** (Python 3.12 may cause issues with `face_recognition` and `dlib`)
- **OpenCV** (`cv2`)
- **face_recognition**
- **Arduino IDE**
- **PySerial** (for serial communication)

## Installation & Setup

### 1. Install Dependencies
pip install opencv-python face-recognition pyserial
If `dlib` causes issues, install a precompiled version:
pip install dlib-bin

### 2. Prepare Authorized Faces Folder
- Store authorized images inside a folder (e.g., `auth_faces/`).
- Each image should contain only one face.

### 3. Connect Arduino & Load Code
- Connect the relay module to Arduino:
  - **Relay Pin** → **Arduino Digital Pin 7**
  - **GND** → **GND**
  - **VCC** → **5V**
- Upload the code to Arduino using the Arduino IDE

### 4. Run the Face Authentication Script
python face_auth.py

## Usage
- Place authorized face images inside the `auth_faces/` folder.
- Run `face_auth.py`.
- The camera will detect faces and compare them with stored encodings.
- If a match is found, the Arduino receives a signal to unlock the door.
- Press `q` to exit the application.

## Troubleshooting
### 1. `face_recognition` or `dlib` Installation Issues
- Use Python 3.8 or 3.9 instead of 3.12.
- Try installing `dlib-bin` instead of `dlib`.

### 2. Serial Communication Not Working
- Ensure the correct **COM Port** is set (`COM3` in the code).
- Use `Device Manager` (Windows) or `ls /dev/tty*` (Linux/Mac) to check the port.

### 3. Camera Not Working
- Ensure the webcam is properly connected.
- Change `cv2.VideoCapture(0)` to `cv2.VideoCapture(1)` if using an external camera.

## Future Improvements
- Implement a database to store and manage authorized users dynamically.
- Add a web interface for face management.
- Improve face detection accuracy using deep learning models.

## License
This project is open-source and available under the **MIT License**.