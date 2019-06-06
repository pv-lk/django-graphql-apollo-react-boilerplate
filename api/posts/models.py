from django.db import models
from users.models import CustomUser

class Post(models.Model):
    text = models.CharField(max_length=250)
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
