from rest_framework import generics, permissions
from rest_framework.response import Response
from .serializers import ProductSerializer
from .models import Product


class CreateNewProductAPI(generics.GenericAPIView):
    """Create add product API view.

    Return a new product.
    """

    serializer_class = ProductSerializer

    permissions_classes = [
        permissions.IsAuthenticated,
    ]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        product = serializer.save()
        return Response({
            "product": ProductSerializer(product, context=self.get_serializer_context()).data,
            "message": "Product Successfully Added to the system"
        })


class ListProductAPI(generics.ListAPIView):
    """Create get all products API view.

    Return product list.
    """

    permissions_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.all()


class GetProductByCodeAPI(generics.RetrieveAPIView):
    """Create Get Product by code API view.

    Return the product get by product code.
    """
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = ProductSerializer

    def get(self, request):
        try:
            product = Product.objects.get(product_code=request.GET.get('product_code'))
            return Response({
                "product": ProductSerializer(product, context=self.get_serializer_context()).data,
                "message": "Product retrived successfully"
            })
        except Product.DoesNotExist:
            return Response({
                "message": "No product with that code found"
            })


class UpdateProductAPI(generics.UpdateAPIView):
    """Create Update Product by code API view.

    Return the updated product get by product code.
    """

    permissions_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = ProductSerializer

    def post(self, request):
        try:
            product = Product.objects.get(product_code=request.data['product_code'])
            serializer = self.get_serializer(product, data=request.data)
            serializer.is_valid(raise_exception=True)
            updated_product = serializer.save()
            return Response({
                "product": ProductSerializer(updated_product, context=self.get_serializer_context()).data,
                "message": "Product Updated Successfully"
            })
        except Product.DoesNotExist:
            return Response({
                "message": "No product with that code found"
            })


class DeleteProductAPI(generics.DestroyAPIView):
    """Create Delete Product by code API view.

    Return product deleted by product code.
    """
    permission_classes = [permissions.IsAuthenticated,]
    serializer_class = ProductSerializer
    def delete(self, request):
        try:
            product = Product.objects.get(product_code=request.data['product_code'])
            product.delete()
            return Response({"message": "Product deleted successfully"})
        except Product.DoesNotExist:
            return Response({"message": "No product with that code found"})
