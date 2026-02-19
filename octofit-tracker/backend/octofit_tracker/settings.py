"""
Django settings for octofit_tracker project.

Generated for Octofit Tracker MongoDB/Djongo setup.
"""
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'octofit-secret-key-for-dev'

DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1']
if os.environ.get('CODESPACE_NAME'):
    ALLOWED_HOSTS.append(f"{os.environ.get('CODESPACE_NAME')}-8000.app.github.dev")

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'djongo',
    'corsheaders',
    'octofit_tracker',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'octofit_tracker.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'octofit_tracker.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'djongo',
        'NAME': os.environ.get('MONGODB_DATABASE', 'octofit_db'),
        'ENFORCE_SCHEMA': False,
        'CLIENT': {
            'host': os.environ.get('MONGODB_HOST', 'localhost'),
            'port': int(os.environ.get('MONGODB_PORT', '27017')),
        },
    }
}

_mongo_username = os.environ.get('MONGODB_USERNAME', '').strip()
_mongo_password = os.environ.get('MONGODB_PASSWORD', '').strip()
_mongo_auth_mechanism = os.environ.get('MONGODB_AUTH_MECHANISM', '').strip()

if _mongo_username:
    DATABASES['default']['CLIENT']['username'] = _mongo_username
if _mongo_password:
    DATABASES['default']['CLIENT']['password'] = _mongo_password

if _mongo_username or _mongo_password:
    DATABASES['default']['CLIENT']['authSource'] = os.environ.get('MONGODB_AUTH_SOURCE', 'admin')

if _mongo_auth_mechanism:
    normalized_auth_mechanism = _mongo_auth_mechanism.replace('_', '-').upper()
    valid_auth_mechanisms = {
        'SCRAM-SHA-256',
        'DEFAULT',
        'SCRAM-SHA-1',
        'GSSAPI',
        'MONGODB-AWS',
        'MONGODB-CR',
        'MONGODB-X509',
        'PLAIN',
    }
    if normalized_auth_mechanism in valid_auth_mechanisms:
        DATABASES['default']['CLIENT']['authMechanism'] = normalized_auth_mechanism

AUTH_PASSWORD_VALIDATORS = []

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ALLOW_CREDENTIALS = True
codespace_name = os.environ.get('CODESPACE_NAME')
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
]
if codespace_name:
    CORS_ALLOWED_ORIGINS.extend([
        f'https://{codespace_name}-3000.app.github.dev',
        f'https://{codespace_name}-8000.app.github.dev',
    ])

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}
