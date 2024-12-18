# Generated by Django 5.1.1 on 2024-11-08 05:56

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cooking', '0015_tasteprefmodel_salty_offset_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipemodel',
            name='userid',
            field=models.UUIDField(null=True),
        ),
        migrations.AlterField(
            model_name='tasteprefmodel',
            name='userid',
            field=models.UUIDField(default=uuid.UUID('77d76eb1-d833-47ba-af26-9b270bed4d07'), primary_key=True, serialize=False, unique=True),
        ),
    ]
