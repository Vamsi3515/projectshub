# Generated by Django 5.0.6 on 2024-07-04 18:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipeshare', '0008_rating_timestamp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
