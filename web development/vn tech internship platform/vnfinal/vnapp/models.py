from django.db import models
import uuid

class UserData(models.Model):
    unique_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    name_project = models.CharField(max_length=50)
    name_lead = models.CharField(max_length=50)
    phone = models.CharField(max_length=15)
    email = models.EmailField()
    no_people = models.CharField(max_length=50)
    applydate = models.DateField()
    qr_code = models.ImageField(upload_to='qr_codes/', blank=True, null=True)

    def __str__(self):
        return f"{self.name_project} - {self.name_lead}"