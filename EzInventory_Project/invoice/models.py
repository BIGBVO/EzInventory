from django.core.validators import MinValueValidator
from django.db import models
from decimal import Decimal
from products.models import Product


class Invoice(models.Model):
    """Create Invoice model."""

    class Type(models.IntegerChoices):
        Purchasing = 0
        Returning = 1

    invoice_timestamp = models.DateTimeField(auto_now=True)
    invoice_type = models.IntegerField(choices=Type.choices, default=0)
    total_price = models.DecimalField(max_digits=6, decimal_places=2, validators=[MinValueValidator(Decimal('0.01'))])


class InvoiceItem(models.Model):
    """Create InvoiceItem model."""
    invoice_id = models.ForeignKey(Invoice, on_delete=models.CASCADE, to_field="id")
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE, to_field="id")
    price_purchased = models.DecimalField(max_digits=6, decimal_places=2,
                                          validators=[MinValueValidator(Decimal('0.01'))])
    quantity_purchased = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0)])
