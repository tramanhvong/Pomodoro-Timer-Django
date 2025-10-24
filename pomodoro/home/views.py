from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Timers
from django.contrib.auth.models import User
from django.contrib import auth
from django.contrib import messages
from .forms import PomodoroForm
from django.db.models import Sum, F, ExpressionWrapper, fields

# Create your views here.
def pomodoro_timer(request):
    timers = Timers.objects.all().order_by('priority')
    form = PomodoroForm

    if len(timers) == 0:
        return render(request, 
                      "pomodoro_timer.html",
                      {'form': form,
                       'editable': False,
                       'timers': None,
                       })
    return render(request,
                  "pomodoro_timer.html",
                  {'form':form,
                   'editable': False,
                   'timers': timers})

def login(request):

    """
    Login method for user:
    Input: request
    Output: authenticate and redirect to their pomodoro page

    """
from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Timers
from django.contrib.auth.models import User
from django.contrib import auth
from django.contrib import messages
from .forms import PomodoroForm
from django.db.models import Sum, F, ExpressionWrapper, fields


# Create your views here.
def pomodoro_timer(request):
    timers = Timers.objects.all().order_by('priority')
    form = PomodoroForm

    if len(timers) == 0:
        return render(request,
                      "home/pomodoro.html",
                      {'form': form,
                       'editable': False,
                       'timers': None,
                       })
    return render(request,
                  "home/pomodoro.html",
                  {'form': form,
                   'editable': False,
                   'timers': timers})


def login(request):

    """
    Login method for user:
    Input: request
    Output: authenticate and redirect to their pomodoro page

    """

    if request.method == "POST":
        email = request.POST['email']
        pwd = request.POST['password']

        if User.objects.filter(username=email).exists():
            # authenticate return a user
            user = auth.authenticate(username=email, password=pwd)
            print(user)

            if user is not None:  # case: everything matches
                auth.login(request, user)
                return redirect('pomodoro_timer')
            else:  # case either username or pwd is wrong so auth returns None
                messages.error(request, 'Invalid credentials')
                return redirect('login')
        else:  # case no username exists in list of Users
            messages.info(request, 'Invalid email or password')
            return redirect('login')
    else:  # case the request is not POST
        return render(request, 'home/login.html')  # redirect to login page first


def signup(request):
    """
    Sign up method:
    Input: request
    Output: add user to database or redirect to logging in
    """

    if request.method == "POST":
        name = request.POST['username']
        email = request.POST["email"]  # email is unique identifier
        pwd = request.POST["password"]

        if User.objects.filter(first_name=name).exists():
            messages.info(request, "Username not available.")
            return redirect(signup)  # clear request
        elif User.objects.filter(username=email).exists():
            messages.info(request, "Email already taken.")
            return redirect("signup")
        else:
            user = User.objects.create_user(first_name=name, username=email, password=pwd)
            print(user)
            print("Register successfully")
            user.save()
            return redirect("login")

    else:
        return render(request, "home/signup.html")


def logout(request):
    auth.logout(request)
    return redirect("pomodoro_timer")


def add(request, id):
    """
    To add new task into pomodoro.
    Input: request and new id
    Output: if new object is valid, store in form.
    """
    editable = True
    if request.method == "POST":
        editable = False
        form = PomodoroForm(request.POST)
        if form.is_valid():  # save new form instance
            form_instance = form.save(commit=False)
            form_instance.uid = id
            form_instance.save()
            return redirect("pomodoro_timer")
        else:
            form = PomodoroForm()
            timers = Timers.objects.all()
            return render(request,
                          "home/pomodoro.html",
                          {"form": form,
                           "editable": editable,
                           "timers": timers
                           })


def delete(request, id):
    timers = Timers.objects.get(id=id)
    timers.delete()
    print("Successfully deleted {{id}}")
    timers = Timers.objects.all()
    form = PomodoroForm()
    if len(timers) == 0:
        return render(request,
                      "home/pomodoro.html",
                      {'form': form,
                       'editable': False,
                       'timers': None
                       })
    return render(request,
                  "home/pomodoro.html",
                  {"form": form,
                   "editable": False,
                   "timers": timers
                   })