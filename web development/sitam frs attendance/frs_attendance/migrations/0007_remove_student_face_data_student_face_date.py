# Generated by Django 5.1.4 on 2025-01-24 14:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frs_attendance', '0006_alter_student_face_data'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='student',
            name='face_data',
        ),
        migrations.AddField(
            model_name='student',
            name='face_date',
            field=models.BinaryField(blank=True, null=True),
        ),
    ]
