from rest_framework import serializers
from products.models import Product
from django.utils import timezone


class ProductSerializer(serializers.ModelSerializer):
    """Declare Product Serializer"""

    class Meta:
        model = Product
        fields = '__all__'

    def create(self, validated_data):
        """Return complete product instance based on the validated data."""
        product = Product.objects.create(product_code=validated_data['product_code'],
                                         product_name=validated_data['product_name'],
                                         quantity_in_stock=validated_data['quantity_in_stock'],
                                         current_price=validated_data['current_price'],
                                         last_update=timezone.now(),
                                         description=validated_data['description']
                                         )
        return product

    def update(self, instance, validated_data):
        """Return complete product instance with updated data."""
        instance.product_name = validated_data['product_name']
        instance.quantity_in_stock = validated_data['quantity_in_stock']
        instance.current_price = validated_data['current_price']
        instance.last_update = timezone.now()
        instance.description = validated_data['description']
        instance.save()
        return instance