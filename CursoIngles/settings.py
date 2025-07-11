# settings.py adaptado para PythonAnywhere

import os
from pathlib import Path
import os # <-- AÑADIDO para leer variables de entorno

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# ==============================================================================
# CONFIGURACIÓN DE PRODUCCIÓN PARA PYTHONANYWHERE
# ==============================================================================

# IMPORTANTE: NUNCA expongas tu SECRET_KEY. Léela de una variable de entorno.
# En la pestaña "Web" de PythonAnywhere, ve a "Environment variables" y añade una llamada SECRET_KEY.
SECRET_KEY = os.environ.get('SECRET_KEY', 'una-llave-secreta-temporal-para-desarrollo')

# En producción, DEBUG siempre debe ser False por seguridad y rendimiento.
DEBUG = False

# Aquí solo debe ir tu dominio de PythonAnywhere.
# CAMBIA 'tunombredeusuario' por tu nombre de usuario real en PythonAnywhere.
ALLOWED_HOSTS = ['tunombredeusuario.pythonanywhere.com']

# Es buena práctica añadir el dominio con https para peticiones seguras.
CSRF_TRUSTED_ORIGINS = ['https://tunombredeusuario.pythonanywhere.com']

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'ingles',
    'usuario',
    'import_export',
    'crispy_forms',
    'rest_framework',
    'django_filters',
    'bootstrapform',
    #'django_admin_listfilter_dropdown',
]

CRISPY_TEMPLATE_PACK = 'bootstrap4'

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware', # <-- AÑADIDO para servir archivos estáticos
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'CursoIngles.urls'

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

WSGI_APPLICATION = 'CursoIngles.wsgi.application'

# ==============================================================================
# BASE DE DATOS (MySQL para PythonAnywhere Gratuito)
# ==============================================================================
# El plan gratuito de PythonAnywhere solo soporta MySQL.
# Debes crear la base de datos en la pestaña "Databases" de PythonAnywhere
# y rellenar estos datos.
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'tunombredeusuario$nombredb',       # Lo obtienes de la pestaña "Databases"
        'USER': 'tunombredeusuario',               # Tu usuario de PythonAnywhere
        'PASSWORD': 'la_contraseña_de_tu_db',      # La que pusiste al crear la DB
        'HOST': 'tunombredeusuario.mysql.pythonanywhere-services.com', # Lo obtienes de la pestaña "Databases"
        'PORT': '3306',
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internationalization
LANGUAGE_CODE = 'es-mx'
TIME_ZONE = 'America/Mexico_City'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# ==============================================================================
# ARCHIVOS ESTÁTICOS Y DE MEDIOS (Configuración para WhiteNoise)
# ==============================================================================
STATIC_URL = '/static/'
# Directorio donde `collectstatic` dejará todos los archivos estáticos para producción.
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage' # <-- AÑADIDO

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ==============================================================================
# CONFIGURACIÓN DE EMAIL (Usando Variables de Entorno)
# ==============================================================================
# Es una muy mala práctica de seguridad poner contraseñas en el código.
# Añade tu contraseña de email como una variable de entorno en PythonAnywhere.
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = 'soportecleita@gmail.com'
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_PASSWORD') # <-- CAMBIADO
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
ACCOUNT_EMAIL_VERIFICATION = 'none'


from django.contrib.messages import constants as messages
MESSAGE_TAGS = {
    messages.DEBUG: 'debug',
    messages.INFO: 'info',
    messages.SUCCESS: 'success',
    messages.WARNING: 'warning',
    messages.ERROR: 'danger',
}