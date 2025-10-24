from django.db import models

# Create your models here.
class Timers(models.Model):
    title = models.CharField(max_length=200)
    hours = models.IntegerField(default=0)
    minutes = models.IntegerField(default=50)
    seconds = models.IntegerField(default=0)
    category = models.CharField(max_length=100)

    uuid = models.IntegerField(default=0)
    priority = models.IntegerField(default=0)

    