# Generated by Django 5.1.4 on 2025-01-08 16:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frs_attendance', '0005_alter_student_email_alter_student_roll_num_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='face_data',
            field=models.TextField(blank=True, null=True),
        ),
    ]
