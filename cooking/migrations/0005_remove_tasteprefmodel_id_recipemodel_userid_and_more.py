# Generated by Django 5.1.1 on 2024-11-07 09:42

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cooking', '0004_recipemodel_alter_condimentmodel_tastes'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tasteprefmodel',
            name='id',
        ),
        migrations.AddField(
            model_name='recipemodel',
            name='userid',
            field=models.UUIDField(default=uuid.UUID('3d7ee084-91ba-4ca9-a3df-c4759795299f')),
        ),
        migrations.AlterField(
            model_name='tasteprefmodel',
            name='tastes',
            field=models.JSONField(),
        ),
        migrations.AlterField(
            model_name='tasteprefmodel',
            name='userid',
            field=models.UUIDField(primary_key=True, serialize=False, unique=True),
        ),
    ]
