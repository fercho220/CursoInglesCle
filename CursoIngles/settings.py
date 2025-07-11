# settings.py adaptado para Alwaysdata con PostgreSQL

import os
from pathlib import Path
# No necesitas 'import os' dos veces, una es suficiente.

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# ==============================================================================
# CONFIGURACIÓN DE PRODUCCIÓN PARA ALWAYSDAATA
# ==============================================================================

# IMPORTANTE: NUNCA expongas tu SECRET_KEY en el código. Léela de una variable de entorno.
# La segunda parte es solo un valor por defecto para desarrollo si la variable no existe.
# Usa la clave segura que generaste.
SECRET_KEY = os.environ.get('SECRET_KEY', '9KaS,bXT*&H$qf4') # <-- USANDO LA CLAVE SEGURA

# En producción, DEBUG siempre debe ser False por seguridad y rendimiento.
DEBUG = False

# Aquí deben ir los dominios de tu sitio en Alwaysdata.
# CAMBIA 'cle.alwaysdata.net' por el dominio real de tu sitio en Alwaysdata.
ALLOWED_HOSTS = ['cle.alwaysdata.net'] # <<< TU DOMINIO DE ALWAYSDAATA >>>

# Es buena práctica añadir el dominio con https para peticiones seguras.
# CAMBIA 'cle.alwaysdata.net' por el dominio real de tu sitio en Alwaysdata.
CSRF_TRUSTED_ORIGINS = ['https://cle.alwaysdata.net'] # <<< TU DOMINIO DE ALWAYSDAATA >>>


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
    'django_filters', # <-- Asegúrate que 'django-filter' esté en requirements.txt
    'bootstrapform',  # <-- Asegúrate que 'django-bootstrap-form' esté en requirements.txt
    #'django_admin_listfilter_dropdown', # Si no está instalada, mejor comenta o borra
]

CRISPY_TEMPLATE_PACK = 'bootstrap4'

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware', # Para servir archivos estáticos
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# ¡¡¡CORRECCIÓN CLAVE AQUÍ: 'CursoIngles' es el nombre de tu módulo interno!!!
ROOT_URLCONF = 'CursoIngles.urls'
# ...
WSGI_APPLICATION = 'CursoIngles.wsgi.application' # <-- CORRECCIÓN CLAVE AQUÍ
# ==============================================================================
# BASE DE DATOS (PostgreSQL para Alwaysdata)
# ==============================================================================
# Aquí debes usar los datos de tu base de datos PostgreSQL de Alwaysdata.
# Los obtuviste en el Paso 1 de la configuración de Alwaysdata.
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2', # Motor para PostgreSQL
        'NAME': 'cle_db_app',                             # <<< TU NOMBRE DE BASE DE DATOS DE ALWAYSDAATA (ej. cle_db_app) >>>
        'USER': 'cle',                                    # <<< TU USUARIO DE ALWAYSDAATA (ej. cle) >>>
        'PASSWORD': os.environ.get('DB_PASSWORD'),        # LEE DE VARIABLE DE ENTORNO
        'HOST': 'postgresql-cle.alwaysdata.net',          # <<< EL HOST DE POSTGRESQL DE ALWAYSDAATA (ej. postgresql-cle.alwaysdata.net) >>>
        'PORT': '5432',                                   # Puerto estándar de PostgreSQL
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
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ==============================================================================
# CONFIGURACIÓN DE EMAIL (Usando Variables de Entorno)
# ==============================================================================
# Es una muy mala práctica de seguridad poner contraseñas en el código.
# Añade tu contraseña de email como una variable de entorno en Alwaysdata.
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.office365.com' # Servidor SMTP para Hotmail/Outlook.com
EMAIL_PORT = 587
EMAIL_HOST_USER = 'fernandozil24@hotmail.com' # <-- TU CORREO DE HOTMAIL AQUÍ
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_PASSWORD') # LEE DE VARIABLE DE ENTORNO
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
