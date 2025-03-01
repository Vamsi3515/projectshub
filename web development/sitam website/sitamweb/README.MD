## SITAM College Website

Welcome to the **SITAM College Website** repository! This project is a comprehensive web platform designed to provide information about the college, with dedicated portals for students and faculty. It features a chatbot, VR tours, news, events, and much more.

---

### Table of Contents

1. [Project Overview](#project-overview)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Installation](#installation)  
5. [Project Structure](#project-structure)  
6. [Screenshots](#screenshots)  
7. [AI Chatbot](#ai-chatbot)  
8. [Contributing](#contributing)  
9. [License](#license)  

---

## Project Overview

The **SITAM College Website** serves as a dynamic platform for students, faculty, and visitors. It offers essential information about the college, academic programs, events, and updates. The website also includes interactive elements such as a virtual reality (VR) tour and an AI-powered chatbot to assist users.

---

## Features

- **Home Page**: General information about the college, announcements, and quick navigation.  
- **Student Portal**: Personalized dashboard for students with access to resources, updates, and more.  
- **Faculty Portal**: Section dedicated to faculty members for managing academic activities.  
- **Events and News**: Stay updated with college events, news, and announcements.  
- **AI Chatbot**: Provides assistance with admissions, navigation, contact information, and more.  
- **Virtual Reality Tour**: Explore the college campus through an immersive VR experience.  
- **Admin Panel**: Import student data via Excel, manage users, and handle website content.  

---

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript, React  
- **Backend**: Django, Django REST Framework  
- **Database**: SQLite / MongoDB  
- **Other Tools**:  
  - Pandas (for importing data)  
  - TensorFlow.js (for the chatbot AI functionality)  

---

## Installation

Follow these steps to get the project up and running on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/sitam-website.git
cd sitam-website
```

### 2. Set Up the Backend

1. **Create a virtual environment**:

    ```bash
    python -m venv venv
    source venv/bin/activate  
    ```

2. **Install dependencies**:

    ```bash
    pip install -r requirements.txt
    ```

3. **Apply migrations**:

    ```bash
    python manage.py migrate
    ```

4. **Run the server**:

    ```bash
    python manage.py runserver
    ```

### 3. Set Up the Frontend

1. **Navigate to the React frontend directory**:

    ```bash
    cd vnreact
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Start the frontend server**:

    ```bash
    npm run dev
    ```

Now, open your browser and go to `http://localhost:8000` to view the project.

---

## Project Structure

```
sitam-website/
│
├── app/                         # Django app for core logic
│   ├── admin.py                 # Admin panel customization
│   ├── models.py                # Database models
│   ├── serializers.py           # Serializers for API endpoints
│   └── views.py                 # Django views
│
├── project1_5/                  # Django project settings
│   ├── settings.py              # Project configuration
│   └── urls.py                  # URL routing
│
├── vnreact/                     # Vite + React frontend
│   ├── public/                  # Static assets
│   └── src/                     # React components and pages
│
├── db.sqlite3                   # SQLite database
├── manage.py                    # Django command-line tool
└── requirements.txt             # Python dependencies
```

---

## Screenshots

### Home Page

![Home Page](path/to/image/homepage.png)

### Other Pages

![Other Pages](path/to/image/otherpages.png)

### Student Portal

![Student Portal](path/to/image/studentportal.png)

### AI Chatbot

![AI Chatbot](path/to/image/aichatbot.png)

---

## AI Chatbot

The chatbot, **SITAM Bot**, assists visitors by providing quick information on:

- Admissions  
- College navigation  
- Contact details  
- General inquiries  

It is designed using **TensorFlow.js** and will be enhanced further with machine learning functionalities.

---

## Contributing

We welcome contributions! If you’d like to improve the project:

1. Fork the repository.  
2. Create a new branch: `git checkout -b feature-branch-name`.  
3. Make your changes and commit them: `git commit -m "Description of changes"`.  
4. Push to the branch: `git push origin feature-branch-name`.  
5. Create a pull request.  

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

### Contact

For questions or suggestions, feel free to reach out to me on:

- **LinkedIn**: [Vamsi Krishna](https://www.linkedin.com/in/your-profile)  
- **Email**: your-email@example.com  

---

This `README.md` serves as a detailed introduction to the project and helps potential users and contributors understand its purpose, features, and structure.