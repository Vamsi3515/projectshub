# Generated by Django 5.0.6 on 2024-07-01 18:18

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipeshare', '0006_comment_timestamp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='timestamp',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
