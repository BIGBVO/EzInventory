from django.urls import path
from .views import InvoiceAPI, InvoiceDetail, InvoiceItemAPI, InvoiceItemDetail


urlpatterns = [
    path('api/invoice/', InvoiceAPI.as_view(), name="invoice"),
    path('api/invoice/item', InvoiceItemAPI.as_view(),name="invoice_item"),
    path('api/invoice/<int:id>', InvoiceDetail.as_view()),
    path('api/invoice/item/<int:invoice_id>', InvoiceItemDetail.as_view())
]
