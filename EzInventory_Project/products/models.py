from django.db import models
from django.core.validators import MinValueValidator
from decimal import Decimal


class Product(models.Model):
    """Create Product model."""

    product_code = models.CharField(max_length=25, unique=True)
    product_name = models.CharField(max_length=100)
    quantity_in_stock = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0)])
    current_price = models.DecimalField(max_digits=6, decimal_places=2, validators=[MinValueValidator(Decimal('0.01'))])
    last_update = models.DateTimeField(auto_now=True)
    description = models.CharField(max_length=200, blank=True)
