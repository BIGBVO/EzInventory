from django.test import TestCase
from django.urls import reverse

from mixer.backend.django import mixer

from invoice.models import Invoice, InvoiceItem


class InvoiceListTests(TestCase):
    def setUp(self):
        self.random_invoices = [
            mixer.blend(Invoice)
            for _ in range(10)
        ]

    def test_list_invoice_API(self):
        url = reverse("invoice")

        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), len(self.random_invoices))

        data_fields = [key for key in data[0].keys()]

        self.assertIn("id", data_fields)
        self.assertIn("invoice_timestamp", data_fields)
        self.assertIn("invoice_type", data_fields)
        self.assertIn("total_price", data_fields)

    # def test_create_invoice_API(self):
    #     self.client.post(reverse("create_product"), {'product_code': 'E200',
    #                                                  'product_name': 'test01',
    #                                                  'quantity_in_stock': '10',
    #                                                  'current_price': '200',
    #                                                  'description': 'lol'})
    #
    #     url = reverse("invoice")
    #     response = self.client.post(url, {'invoice_type': 0,
    #                                       'total_price': '200.00',
    #                                       'invoice_item': [{
    #                                           'product_code': 'E20',
    #                                           'product_name': 'test01',
    #                                           'quantity': 1,
    #                                           'purchase_price': '200.00',
    #                                           'total_price': '200.00'}]})
    #
    #     back_data = response.data
    #     self.assertIn("invoice", back_data)
    #     self.assertEqual(0, back_data['invoice']["invoice_type"])


class InvoiceItemListTests(TestCase):
    def setUp(self):
        self.random_invoice_item = [
            mixer.blend(InvoiceItem)
            for _ in range(10)
        ]

    def test_list_invoice_API(self):
        url = reverse("invoice_item")

        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), len(self.random_invoice_item))

        data_fields = [key for key in data[0].keys()]

        self.assertIn("id", data_fields)
        self.assertIn("price_purchased", data_fields)
        self.assertIn("quantity_purchased", data_fields)
        self.assertIn("invoice_id", data_fields)
        self.assertIn("product_id", data_fields)