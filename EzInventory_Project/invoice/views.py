from django.http import HttpResponse
from rest_framework import status

from products.models import Product
from products.serializers import ProductSerializer
from .serializers import InvoicesSerializer, InvoiceItemSerializer
from .models import Invoice, InvoiceItem
from rest_framework.response import Response
from rest_framework.views import APIView


class InvoiceAPI(APIView):
    """Create Invoice API view."""

    def get(self, request):
        """Return all invoices."""
        invoices = Invoice.objects.all()
        serializer = InvoicesSerializer(invoices, many=True)
        return Response(serializer.data)

    def post(self, request):
        """Return a new invoice."""
        print(request.data)
        print(type(request.data["invoice_item"]))
        invoice = Invoice.objects.create(invoice_type=request.data["invoice_type"],
                                         total_price=request.data["total_price"])
        invoice.save()

        # reduce the amount in stock
        for ele in request.data["invoice_item"]:
            product = Product.objects.get(product_code=ele["product_code"])
            if request.data["invoice_type"]:
                product.quantity_in_stock += ele["quantity"]
            else:
                product.quantity_in_stock -= ele["quantity"]
            product.save()

            invoiceItem = InvoiceItem.objects.create(invoice_id=invoice,
                                                     product_id=product,
                                                     quantity_purchased=ele["quantity"],
                                                     price_purchased=ele["purchase_price"])
            invoiceItem.save()
        return Response(status=status.HTTP_201_CREATED)


class InvoiceDetail(APIView):
    """Create Invoice detail API view.

    Return invoice get by invoice id
    """

    def get_object(self, id):
        try:
            return Invoice.objects.get(id=id)
        except Invoice.DoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, id):
        my_invoice = self.get_object(id)
        serializer = InvoicesSerializer(my_invoice)
        return Response(serializer.data)


class InvoiceItemAPI(APIView):
    """Create InvoiceItem API view."""

    def get(self, request):
        """Return all invoice items."""
        item = InvoiceItem.objects.all()
        serializer = InvoiceItemSerializer(item, many=True)
        return Response(serializer.data)

    def post(self, request):
        """Return a new invoice item."""
        serializer = InvoiceItemSerializer(data=request)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors)


class InvoiceItemDetail(APIView):
    """Create InvoiceItem detail API view.

    Return invoice items get by invoice id
    """

    def get_object(self, invoice_id):
        try:
            r = []
            for ele in InvoiceItem.objects.all():
                if ele.invoice_id.id == invoice_id:
                    r.append(ele)
            products = Product.objects.all()

            temp = []
            for ele in r:
                for product in products:
                    if product == ele.product_id:
                        temp.append(product)
            return r, temp
        except InvoiceItem.DoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, invoice_id):
        print(invoice_id)
        my_items, my_products = self.get_object(invoice_id)
        serialiser = InvoiceItemSerializer(my_items, many=True)
        my_products = ProductSerializer(my_products, many=True)
        content = {
            "invoice_item": serialiser.data,
            "products_info": my_products.data
        }
        return Response(content)
