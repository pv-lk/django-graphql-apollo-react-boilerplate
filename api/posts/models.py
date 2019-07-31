from django.db import models
from django.conf import settings

class Post(models.Model):
    text = models.CharField(max_length=250)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
