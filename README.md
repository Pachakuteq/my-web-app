# Portfolio Website

A modern, interactive personal portfolio website built with Django, featuring animated backgrounds, dynamic content sections, and a custom carousel for showcasing projects and experience.

## Features

- Animated particle network background with constellations constructions
- Custom cursor with smooth animations
- Fully responsive design
- Interactive image carousels using Owl Carousel
- Smooth page transitions and scroll animations
- Dynamic navigation with active state highlighting

## Built With

- **Backend:** Django 5.x, Python 3.x
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Libraries:** 
  - jQuery
  - Owl Carousel 2
  - Devicon (for technology icons)
- **Database:** SQLite (development)

## Getting Started

### Prerequisites
- Python 3.8+
- pip
- virtualenv (recommended)

### Installation

1. Clone the repository
```
git clone https://github.com/Pachakuteq/my-web-app.git
cd portfolio
```

2. Create virtual environment
```
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate or .\venv\scripts\activate.bat
```

3. Install dependencies
```
pip install -r requirements.txt
```

4. Run migrations
```
python manage.py migrate
```

5. Create superuser (optional)
```
python manage.py createsuperuser
```

6. Run development server
```
python manage.py runserver
```

7. Open browser to `http://127.0.0.1:8000/`


## Project Structure

```
├── 📁 website/
│   ├── 📁 resume/
│   │   ├── 📁 migrations/
│   │   ├── 📁 static/
│   │   │   ├── 📁 fonts/
│   │   │   │   ├── 📄 Tomorrow-Black.ttf
│   │   │   ├── 📁 js/
│   │   │   │   └── 📄 script.js
│   │   │   └── 📁 resume/
│   │   │       ├── 📁 images/
│   │   │       │   ├── 🖼️ adventure.jpg
│   │   │       │   ├── 🖼️ foto.jpeg
│   │   │       │   ├── 🖼️ logo.png
│   │   │       │   ├── 🖼️ science.jpg
│   │   │       │   ├── 🖼️ story.jpg
│   │   │       │   └── 🖼️ wordly.JPG
│   │   │       └── 🎨 style.css
│   │   ├── 📁 templates/
│   │   │   └── 📁 resume/
│   │   │       ├── 🌐 about.html
│   │   │       ├── 🌐 base.html
│   │   │       ├── 🌐 contact.html
│   │   │       ├── 🌐 home.html
│   │   │       └── 🌐 resume.html
│   │   ├── 🐍 __init__.py
│   │   ├── 🐍 admin.py
│   │   ├── 🐍 apps.py
│   │   ├── 🐍 forms.py
│   │   ├── 🐍 models.py
│   │   ├── 🐍 tests.py
│   │   └── 🐍 views.py
│   ├── 📁 website/
│   │   ├── 🐍 __init__.py
│   │   ├── 🐍 asgi.py
│   │   ├── 🐍 settings.py
│   │   ├── 🐍 urls.py
│   │   └── 🐍 wsgi.py
│   └── 🐍 manage.py
├── ⚙️ .gitignore
├── 📝 README.md
└── 📄 requirements.txt
```



## Key Features Explained

### Animated Background
- Particle network that creates constellations randomly
- Connects nearby particles with lines
- Fully responsive and performant

### Custom Cursor
- Dual-layer cursor (dot + outline)
- Smooth following animation
- Scales on hover over interactive elements

### Image Carousel
- Owl Carousel implementation
- Hover effects with image reveals
- Smooth transitions and animations



## Future Enhancements

- Implement contact form with email functionality
- Add dark/light mode toggle
- Integration with GitHub API to show live projects
- Implement project filtering
- Add background music


## Collaboration 

If you want to provide me with any tips or help me out on this project, please send me an email. I would love to have some opinions on this.
