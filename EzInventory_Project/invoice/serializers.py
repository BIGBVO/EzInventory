from rest_framework import serializers
from .models import Invoice, InvoiceItem
from django.utils import timezone


class InvoicesSerializer(serializers.ModelSerializer):
    """Declare Invoice Serializer"""

    class Meta:
        model = Invoice
        fields = '__all__'

    def create(self, validated_data):
        """Return complete invoice instance based on the validated data."""
        invoice = Invoice.objects.create(invoice_timestamp=timezone.now(),
                                         invoice_type=validated_data['invoice_type'],
                                         total_price=validated_data['total_price'],
                                         )
        return invoice


class InvoiceItemSerializer(serializers.ModelSerializer):
    """Declare Invoice Item Serializer"""

    class Meta:
        model = InvoiceItem
        fields = '__all__'

    def create(self, validated_data):
        """Return complete invoice item instance based on the validated data."""
        invoice_item = InvoiceItem.objects.create(invoice_id=validated_data['invoice_id'],
                                                  product_id=validated_data['product_id'],
                                                  price_purchased=validated_data['price_purchased'],
                                                  quantity_purchased=validated_data['quantity_purchased'],
                                                  )
        return invoice_item
