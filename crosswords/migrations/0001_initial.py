# Generated by Django 3.2.8 on 2021-10-31 14:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import utils.helpers


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Grid',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uid', models.CharField(default=utils.helpers.random_key, editable=False, max_length=12, unique=True)),
                ('creation_date', models.DateTimeField(auto_now_add=True)),
                ('modification_date', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=128)),
                ('width', models.IntegerField()),
                ('height', models.IntegerField()),
                ('solution', models.TextField()),
                ('definitions', models.JSONField()),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='crosswords_grids', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'grid',
                'verbose_name_plural': 'grids',
                'ordering': ['-creation_date'],
            },
        ),
    ]