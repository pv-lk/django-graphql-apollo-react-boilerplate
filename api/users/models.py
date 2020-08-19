from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    # inherited fields
    username = models.CharField(max_length=64, unique=True)
    # + first_name
    # + last_name
    email = models.EmailField(unique=True)
    # + password
    # + groups
    # + user_permissions
    # + is_staff
    # + is_active
    # + is_superuser
    # + last_login
    # + date_joined

    # additional fields
    bio = models.TextField(null=True)

    def __str__(self):
        return self.email
