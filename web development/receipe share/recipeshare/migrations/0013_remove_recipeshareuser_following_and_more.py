# Generated by Django 5.0.6 on 2024-07-05 08:51

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipeshare', '0012_alter_recipeshareuser_following'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recipeshareuser',
            name='following',
        ),
        migrations.AddField(
            model_name='recipeshareuser',
            name='followers',
            field=models.ManyToManyField(blank=True, default=0, related_name='following', to=settings.AUTH_USER_MODEL),
        ),
    ]
