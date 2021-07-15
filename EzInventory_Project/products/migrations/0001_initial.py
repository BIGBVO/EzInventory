# Generated by Django 3.1.3 on 2020-11-11 00:51

from decimal import Decimal
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_code', models.CharField(max_length=25, unique=True)),
                ('product_name', models.CharField(max_length=100)),
                ('quantity_in_stock', models.PositiveIntegerField(default=0)),
                ('current_price', models.DecimalField(decimal_places=2, max_digits=6, validators=[django.core.validators.MinValueValidator(Decimal('0.01'))])),
                ('last_update', models.DateTimeField()),
                ('desciption', models.CharField(blank=True, max_length=200)),
            ],
        ),
    ]
