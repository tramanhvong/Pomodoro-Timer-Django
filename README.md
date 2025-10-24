# Pomodoro Django

A simple Pomodoro timer web app built with Django.

This repository contains a small Django project (`pomodoro`) with a single app `home` that provides user signup/login and per-user Pomodoro timers.

## Quick overview

- Django project: `core`
- App: `home`
- Database: SQLite (`db.sqlite3`)
- Virtual environment in repository (optional): `pomodoro_env/`
- Templates: `home/templates/home/` (example: `pomodoro.html`, `login.html`, `signup.html`)

## Requirements

- Windows (instructions below use PowerShell)
- Python 3.10+ (the project uses a virtual environment in `pomodoro_env/`)
- Django 5.2.7 (used when this project was created)

If you don't have a `requirements.txt`, you can install Django directly into your venv:

```powershell
# create a venv if you don't have one
python -m venv pomodoro_env

# activate the venv (PowerShell)
.\pomodoro_env\Scripts\Activate.ps1

# install Django (pin to the version used in the project)
python -m pip install "django==5.2.7"
```

If you prefer to create a `requirements.txt`, add:

```
Django==5.2.7
```

then run:

```powershell
pip install -r requirements.txt
```

## Setup & Run (PowerShell)

Open PowerShell at the repository root (where `manage.py` lives, the folder named `pomodoro` in this repo structure), then:

```powershell 
# activate the venv (if you created/are using the one in repo)
.\pomodoro_env\Scripts\Activate.ps1

# apply migrations
python manage.py migrate

# create an admin user (optional)
python manage.py createsuperuser

# run the development server
python manage.py runserver
```

Then open http://127.0.0.1:8000/ in your browser.

## Project structure (important files)

- `pomodoro/` – Django project root (contains `manage.py`, `db.sqlite3`)
- `pomodoro/core/settings.py` – Django settings (note: `TEMPLATES['DIRS']` includes `home/templates`)
- `pomodoro/home/` – the main app
  - `views.py` – request handlers (renders templates in `home/`)
  - `templates/home/` – HTML templates (`pomodoro.html`, `login.html`, `signup.html`)
  - `static/` (if present) – static assets like CSS/JS referenced by templates

## Common troubleshooting

- TemplateDoesNotExist: ensure templates are referenced using their path under `home/templates/` (for example, `home/pomodoro.html`) or configure `TEMPLATES['DIRS']` appropriately in `core/settings.py`. The project expects templates under `home/templates/home/`.

- Virtualenv: this repo includes a `pomodoro_env/` virtual environment. If you run into package mismatch issues, recreate a fresh venv and install the required packages.

- Static files: in development Django serves static files automatically when `DEBUG = True`. For production, run `python manage.py collectstatic` and configure static serving via your webserver.

## Tests

Run the Django test suite:

```powershell
python manage.py test
```

Add tests under `home/tests.py` or `home/tests/`.

## Contributing

- Open an issue describing the problem or feature.
- Create a branch, make changes, and submit a pull request.
