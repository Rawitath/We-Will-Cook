# Generated by Django 5.1.1 on 2024-11-07 11:23

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cooking', '0006_alter_recipemodel_userid'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipemodel',
            name='description',
            field=models.JSONField(default='{}'),
        ),
        migrations.AlterField(
            model_name='recipemodel',
            name='userid',
            field=models.UUIDField(default=uuid.UUID('01ffc08f-f6ba-4fa9-bf3c-86be0f5f2f32')),
        ),
    ]
