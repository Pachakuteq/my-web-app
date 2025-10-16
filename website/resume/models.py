from django.db import models

class Home(models.Model):
    name = models.CharField(max_length=100)
    summary = models.TextField(max_length=1000)

    def __str__(self):
        return self.name