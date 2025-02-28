# Generated by Django 5.1.4 on 2024-12-26 14:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frs_attendance', '0004_alter_branch_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='email',
            field=models.EmailField(blank=True, max_length=254, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='student',
            name='roll_num',
            field=models.CharField(max_length=20),
        ),
        migrations.AddIndex(
            model_name='student',
            index=models.Index(fields=['roll_num'], name='frs_attenda_roll_nu_0e4fbe_idx'),
        ),
        migrations.AddIndex(
            model_name='student',
            index=models.Index(fields=['branch'], name='frs_attenda_branch__70e7e5_idx'),
        ),
        migrations.AddConstraint(
            model_name='student',
            constraint=models.UniqueConstraint(fields=('roll_num', 'branch'), name='unique_roll_num_per_branch'),
        ),
    ]
