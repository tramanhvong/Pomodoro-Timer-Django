FROM python:3.13
WORKDIR /home

# install application dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# copy source code
COPY home ./home
EXPOSE 8080

# set up app user so container does not run as root user
RUN useradd app
USER app

CMD ["gunicorn", "pomodoro:latest", "--host", "0.0.0.0", "--port", "8080"]