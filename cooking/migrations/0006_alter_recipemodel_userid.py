# Generated by Django 5.1.1 on 2024-11-07 10:48

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cooking', '0005_remove_tasteprefmodel_id_recipemodel_userid_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipemodel',
            name='userid',
            field=models.UUIDField(default=uuid.UUID('5e7ec42f-607f-4308-b5ed-1b37f037a0bb')),
        ),
    ]
