#!/bin/sh
set -e

# Run migrations and collectstatic, then start the passed command (gunicorn by default)
# It's safe to run migrate/collectstatic repeatedly in containers.
python manage.py migrate --noinput
python manage.py collectstatic --noinput

exec "$@"
