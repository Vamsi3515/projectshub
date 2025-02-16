
# Face Recognition-Based Attendance System

This is a Django-based web application that uses face recognition technology to automate the attendance process. The system captures live face data, matches it with stored encodings in the database, and marks attendance accordingly. It also provides a dashboard with visual reports and the option to download attendance sheets in Excel format.

---

## 📌 Features
- **Face Recognition for Attendance:** Captures and matches live face data to mark attendance automatically.
- **Dashboard & Reports:** Displays attendance statistics with pie charts.
- **Excel Export:** Allows users to download attendance sheets in Excel format.
- **Mobile Responsive:** Optimized for use on mobile devices through the web.

---

## 🚀 Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Django, Django REST Framework
- **Database:** MySQL
- **Face Recognition:** `face_recognition`, `OpenCV`
- **Charting Library:** Chart.js

---

## ⚙️ Setup Instructions
### Prerequisites:
- Python 3.x
- Django
- MySQL
- Required Python libraries (`face_recognition`, `OpenCV`, `djangorestframework`, etc.)

### Installation:
1. **Clone the Repository:**
    ```bash
    git clone https://github.com/Vamsi3515/projectshub.git
    cd projectshub
    ```
2. **Create a Virtual Environment:**
    ```bash
    python -m venv venv
    source venv\Scripts\activate  (windows)
    ```
3. **Install Required Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4. **Setup Database:**
    - Create a MySQL database and configure database settings in `settings.py`.
    - Apply migrations:
      ```bash
      python manage.py makemigrations
      python manage.py migrate
      ```

5. **Run Development Server:**
    ```bash
    python manage.py runserver
    ```

---

## 📸 Face Recognition Workflow
1. **Face Data Capturing:**
   - Captures face data using the device camera.
   - Encodes and stores face data in the database.
2. **Attendance Marking:**
   - Continuously captures face data every 3 seconds.
   - Matches live data with stored encodings.
   - Marks attendance if a match is found.

---

## 📊 Dashboard and Reports
- View attendance statistics with pie charts.
- Download attendance sheets in Excel format.

---

---

## 📜 License
This project is licensed under the MIT License. Feel free to use and modify it for personal and commercial purposes.

---

## 👤 Author
**Vamsi Krishna**  
- [GitHub](https://github.com/Vamsi3515)
- [LinkedIn](https://www.linkedin.com/in/vamsi3515/)

---

## 📧 Contact
For any inquiries or feedback, please reach out at: **<saivamsikrishna3515@gmail.com>**

---

## 🔗 Links
- [Live Demo (if available)](available soon...)
---

### 🚧 TODO
- Implement more detailed face matching accuracy reports.
- Enhance UI/UX for a better user experience.
- Optimize the system for faster processing and better scalability.
