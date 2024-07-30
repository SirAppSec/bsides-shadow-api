# Python
In this folder we have 2 popular python web frameworks. Both are heavily used to serve APIs as well as web applications.

## Flask
The flask app only consist of the swagger ui Flasgger dependency.
In this exmaple you can see that The endpoint for the swagger /api-docs
is exposed but was never declared, and it's even missing from the Api specification itself, even though the paths are generated from the endpoints/paths exposed.
To run the flask app you can use:
```Bash
cd flask
python3 app.py
```

To list the routes use:
```
flask routes
```
To automate retrieval as part of a python script/bash:
```python
python3 -c 'from app import app; app.url_map'
```

## Django
Django is a more opininated and restricted Web framework, and a very robust API framework with djangorestframework
to run the app:
```bash
cd django/demo


It also provides a list of all endpoints using the django-extensions:
```bash
pip install django-extensions
```

Ensure in settings.py that the DEBUG = True
and that django-extensions is added to the INSTALLED_APPS array.
```python
INSTALLED_APPS = [
    'django_extensions'
...
]
```
Now, execute:
```bash
python manage.py show_urls
```