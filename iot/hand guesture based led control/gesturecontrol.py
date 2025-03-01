import cv2
import mediapipe as mp

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(min_detection_confidence=0.7, min_tracking_confidence=0.7)
mp_draw = mp.solutions.drawing_utils

cap = cv2.VideoCapture(1)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(rgb_frame)

    gesture = "None"

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            mp_draw.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

            landmarks = hand_landmarks.landmark
            thumb_tip = landmarks[4].y
            index_tip = landmarks[8].y
            middle_tip = landmarks[12].y
            ring_tip = landmarks[16].y
            pinky_tip = landmarks[20].y

            if (index_tip < landmarks[6].y and 
                middle_tip < landmarks[10].y and 
                ring_tip < landmarks[14].y and 
                pinky_tip < landmarks[18].y):
                gesture = "ON"  
            elif (index_tip > landmarks[6].y and 
                  middle_tip > landmarks[10].y and 
                  ring_tip > landmarks[14].y and 
                  pinky_tip > landmarks[18].y):
                gesture = "OFF"  

    cv2.putText(frame, f"Gesture: {gesture}", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    cv2.imshow("Hand Gesture Control", frame)

    print(f"Detected Gesture: {gesture}")

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()

#Arduino Setup

# import cv2
# import mediapipe as mp
# import serial
# import time

# ser = serial.Serial('COM3', 9600, timeout=1)
# time.sleep(2)  

# mp_hands = mp.solutions.hands
# hands = mp_hands.Hands(min_detection_confidence=0.7, min_tracking_confidence=0.7)
# mp_draw = mp.solutions.drawing_utils

# cap = cv2.VideoCapture(0)

# previous_command = None

# while cap.isOpened():
#     ret, frame = cap.read()
#     if not ret:
#         break

#     rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#     results = hands.process(rgb_frame)

#     gesture = "None"

#     if results.multi_hand_landmarks:
#         for hand_landmarks in results.multi_hand_landmarks:
#             mp_draw.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

#             landmarks = hand_landmarks.landmark
#             thumb_tip = landmarks[4].y
#             index_tip = landmarks[8].y
#             middle_tip = landmarks[12].y
#             ring_tip = landmarks[16].y
#             pinky_tip = landmarks[20].y

#             if (index_tip < landmarks[6].y and 
#                 middle_tip < landmarks[10].y and 
#                 ring_tip < landmarks[14].y and 
#                 pinky_tip < landmarks[18].y):
#                 gesture = "ON"  
#             elif (index_tip > landmarks[6].y and 
#                   middle_tip > landmarks[10].y and 
#                   ring_tip > landmarks[14].y and 
#                   pinky_tip > landmarks[18].y):
#                 gesture = "OFF"  

#     cv2.putText(frame, f"Gesture: {gesture}", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
#     cv2.imshow("Hand Gesture Control", frame)

#     if gesture in ["ON", "OFF"] and gesture != previous_command:
#         ser.write(gesture.encode())  
#         print(f"Sent Command: {gesture}")
#         previous_command = gesture

#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# cap.release()
# ser.close()
# cv2.destroyAllWindows()

#testing on simuli 

# import cv2
# import mediapipe as mp
# import time

# mp_hands = mp.solutions.hands
# hands = mp_hands.Hands(min_detection_confidence=0.7, min_tracking_confidence=0.7)
# mp_draw = mp.solutions.drawing_utils

# cap = cv2.VideoCapture(0)

# previous_command = None  

# while cap.isOpened():
#     ret, frame = cap.read()
#     if not ret:
#         break

#     rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#     results = hands.process(rgb_frame)

#     gesture = "None"

#     if results.multi_hand_landmarks:
#         for hand_landmarks in results.multi_hand_landmarks:
#             mp_draw.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

        
#             landmarks = hand_landmarks.landmark
#             index_tip = landmarks[8].y
#             middle_tip = landmarks[12].y
#             ring_tip = landmarks[16].y
#             pinky_tip = landmarks[20].y


#             if (index_tip < landmarks[6].y and 
#                 middle_tip < landmarks[10].y and 
#                 ring_tip < landmarks[14].y and 
#                 pinky_tip < landmarks[18].y):
#                 gesture = "ON"  
#             elif (index_tip > landmarks[6].y and 
#                   middle_tip > landmarks[10].y and 
#                   ring_tip > landmarks[14].y and 
#                   pinky_tip > landmarks[18].y):
#                 gesture = "OFF"  

#     cv2.putText(frame, f"Gesture: {gesture}", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
#     cv2.imshow("Hand Gesture Control", frame)

#     if gesture in ["ON", "OFF"] and gesture != previous_command:
#         with open("output.txt", "w") as f:
#             f.write(gesture)
#         print(f"Written to file: {gesture}")
#         previous_command = gesture

#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# cap.release()
# cv2.destroyAllWindows()


# import cv2
# import mediapipe as mp
# import serial
# import time

# ser = serial.Serial('COM5', 9600, timeout=1)
# time.sleep(2)

# mp_hands = mp.solutions.hands
# hands = mp_hands.Hands(min_detection_confidence=0.7, min_tracking_confidence=0.7)
# mp_draw = mp.solutions.drawing_utils

# cap = cv2.VideoCapture(0)

# previous_command = None 

# while cap.isOpened():
#     ret, frame = cap.read()
#     if not ret:
#         break

#     rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#     results = hands.process(rgb_frame)

#     gesture = "None"

#     if results.multi_hand_landmarks:
#         for hand_landmarks in results.multi_hand_landmarks:
#             mp_draw.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

#             landmarks = hand_landmarks.landmark
#             index_tip = landmarks[8].y
#             middle_tip = landmarks[12].y
#             ring_tip = landmarks[16].y
#             pinky_tip = landmarks[20].y

#             if (index_tip < landmarks[6].y and 
#                 middle_tip < landmarks[10].y and 
#                 ring_tip < landmarks[14].y and 
#                 pinky_tip < landmarks[18].y):
#                 gesture = "ON"  
#             elif (index_tip > landmarks[6].y and 
#                   middle_tip > landmarks[10].y and 
#                   ring_tip > landmarks[14].y and 
#                   pinky_tip > landmarks[18].y):
#                 gesture = "OFF"  

#     if gesture in ["ON", "OFF"] and gesture != previous_command:
#         ser.write(gesture.encode())
#         print(f"Sent: {gesture}")
#         previous_command = gesture

#     cv2.putText(frame, f"Gesture: {gesture}", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
#     cv2.imshow("Hand Gesture Control", frame)

#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# cap.release()
# cv2.destroyAllWindows()
# ser.close()