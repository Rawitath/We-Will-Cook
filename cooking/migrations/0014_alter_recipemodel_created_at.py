# Generated by Django 5.1.1 on 2024-11-07 16:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cooking', '0013_alter_recipemodel_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipemodel',
            name='created_at',
            field=models.DateTimeField(),
        ),
    ]
