import cv2
import face_recognition
import serial
import time
import os

arduino = serial.Serial('COM6', 9600, timeout=1)

auth_faces_folder = "auth_faces"
known_encodings = []  

for filename in os.listdir(auth_faces_folder):
    if filename.endswith(".jpg") or filename.endswith(".png"):
        image_path = os.path.join(auth_faces_folder, filename)
        image = face_recognition.load_image_file(image_path)
        encodings = face_recognition.face_encodings(image)

        if encodings:
            known_encodings.append(encodings[0])

video_capture = cv2.VideoCapture(2)

while True:
    ret, frame = video_capture.read()
    if not ret:
        continue

    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    face_locations = face_recognition.face_locations(rgb_frame)
    face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

    authorized = False

    for face_encoding in face_encodings:
        matches = face_recognition.compare_faces(known_encodings, face_encoding, tolerance=0.6)
        if True in matches:
            authorized = True
            break

    if authorized:
        cv2.putText(frame, "Authorized! Unlocking...", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        print("✅ Access Granted: Unlocking door!")
        arduino.write(b'UNLOCK\n')
        time.sleep(5)
    else:
        cv2.putText(frame, "Access Denied!", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
        print("❌ Access Denied: Door remains locked.")

    cv2.imshow("Face Authentication", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
video_capture.release()
cv2.destroyAllWindows()