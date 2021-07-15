from django.contrib import admin
from .models import Invoice, InvoiceItem

# Register invoice model and invoice item model.

admin.site.register(Invoice)
admin.site.register(InvoiceItem)
