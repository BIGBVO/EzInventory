from django.test import TestCase
from django.urls import reverse

from mixer.backend.django import mixer

from .models import Product


# Create your tests here.


class ProductListTests(TestCase):
    def setUp(self):
        self.random_products = [
            mixer.blend(Product)
            for _ in range(10)
        ]

    def test_list_product_API(self):
        url = reverse("list_products")

        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), len(self.random_products))

        data_fields = [key for key in data[0].keys()]

        self.assertIn("id", data_fields)
        self.assertIn("product_code", data_fields)
        self.assertIn("product_name", data_fields)
        self.assertIn("quantity_in_stock", data_fields)
        self.assertIn("current_price", data_fields)
        self.assertIn("last_update", data_fields)
        self.assertIn("description", data_fields)


class CreateProductTests(TestCase):
    def test_create_product_1_correct_1(self):
        url = reverse("create_product")

        response = self.client.post(url, {'product_code': 'E200',
                                          'product_name': 'test01',
                                          'quantity_in_stock': '11',
                                          'current_price': '200',
                                          'description': 'lol'})
        back_data = response.data
        self.assertIn("product", back_data)
        self.assertIn("message", back_data)
        self.assertEqual('E200', back_data['product']["product_code"])
        self.assertEqual("test01", back_data['product']["product_name"])
        self.assertEqual(11, back_data['product']["quantity_in_stock"])
        self.assertEqual("200.00", back_data['product']["current_price"])
        self.assertEqual("lol", back_data['product']["description"])
        self.assertEqual("Product Successfully Added to the system", back_data["message"])

    def test_create_product_1_correct_2(self):
        url = reverse("create_product")

        response = self.client.post(url, {'product_code': 'E201',
                                          'product_name': 'test02',
                                          'quantity_in_stock': '1100',
                                          'current_price': '250',
                                          'description': 'hhh'})
        back_data = response.data
        self.assertIn("product", back_data)
        self.assertIn("message", back_data)
        self.assertEqual('E201', back_data['product']["product_code"])
        self.assertEqual("test02", back_data['product']["product_name"])
        self.assertEqual(1100, back_data['product']["quantity_in_stock"])
        self.assertEqual("250.00", back_data['product']["current_price"])
        self.assertEqual("hhh", back_data['product']["description"])
        self.assertEqual("Product Successfully Added to the system", back_data["message"])

    def test_create_product_2_negative_stock_1(self):
        url = reverse("create_product")

        response = self.client.post(url, {'product_code': 'E200',
                                          'product_name': 'test01',
                                          'quantity_in_stock': '-11',
                                          'current_price': '200',
                                          'description': ''})
        self.assertEqual(response.status_code, 400)

    def test_create_product_2_negative_stock_2(self):
        url = reverse("create_product")

        response = self.client.post(url, {'product_code': 'E200',
                                          'product_name': 'test01',
                                          'quantity_in_stock': '-100.0',
                                          'current_price': '200',
                                          'description': ''})
        self.assertEqual(response.status_code, 400)

    def test_create_product_2_negative_stock_3(self):
        url = reverse("create_product")

        response = self.client.post(url, {'product_code': 'E200',
                                          'product_name': 'test01',
                                          'quantity_in_stock': '-20.0',
                                          'current_price': '200',
                                          'description': ''})
        self.assertEqual(response.status_code, 400)

    def test_create_product_3_negative_price_1(self):
        url = reverse("create_product")

        response = self.client.post(url, {'product_code': 'E200',
                                          'product_name': 'test01',
                                          'quantity_in_stock': '11',
                                          'current_price': '-200',
                                          'description': ''})
        self.assertEqual(response.status_code, 400)

    def test_create_product_3_negative_price_2(self):
        url = reverse("create_product")

        response = self.client.post(url, {'product_code': 'E200',
                                          'product_name': 'test01',
                                          'quantity_in_stock': '11',
                                          'current_price': '-20.0',
                                          'description': ''})
        self.assertEqual(response.status_code, 400)

    def test_create_product_3_negative_price_3(self):
        url = reverse("create_product")

        response = self.client.post(url, {'product_code': 'E200',
                                          'product_name': 'test01',
                                          'quantity_in_stock': '11',
                                          'current_price': '-25.5',
                                          'description': ''})
        self.assertEqual(response.status_code, 400)

    def test_create_product_4_zero_price(self):
        url = reverse("create_product")

        response = self.client.post(url, {'product_code': 'E200',
                                          'product_name': 'test01',
                                          'quantity_in_stock': '11',
                                          'current_price': '0',
                                          'description': ''})
        self.assertEqual(response.status_code, 400)

    def test_create_product_5_small_price(self):
        url = reverse("create_product")

        response = self.client.post(url, {'product_code': 'E200',
                                          'product_name': 'test01',
                                          'quantity_in_stock': '11',
                                          'current_price': '0.001',
                                          'description': ''})
        self.assertEqual(response.status_code, 400)

    def test_create_product_6_empty_name(self):
        url = reverse("create_product")

        response = self.client.post(url, {'product_code': 'E200',
                                          'product_name': '',
                                          'quantity_in_stock': '11',
                                          'current_price': '10',
                                          'description': ''})
        self.assertEqual(response.status_code, 400)

    def test_create_product_7_long_name_code(self):
        url = reverse("create_product")

        response = self.client.post(url, {'product_code': 'E200sdfdewdsffvsfsdfsfwger',
                                          'product_name': 'test',
                                          'quantity_in_stock': '11',
                                          'current_price': '10',
                                          'description': ''})
        self.assertEqual(response.status_code, 400)


class GetProductTests(TestCase):
    def setUp(self):
        self.usl = reverse("search_product")
        self.random_products = [
            mixer.blend(Product)
            for _ in range(15)
        ]

    def test_search_product(self):
        self.client.post(reverse("create_account"), {'username': 'test0122',
                                                     'password': '123qwe123qwe',
                                                     'name': 'fewer',
                                                     'privilege': 'BO'})
        login_response = self.client.post(reverse("login"), {'username': 'test0122', 'password': '123qwe123qwe'})
        self.client.defaults['HTTP_AUTHORIZATION'] = 'token ' + login_response.data["token"]
        for p in self.random_products:
            response = self.client.get(self.usl, {"product_code": p.product_code})
            self.assertIn('product', response.data)
            self.assertIn('message', response.data)
            self.assertEqual('Product retrived successfully', response.data['message'])
            self.assertEqual(p.id, response.data['product']['id'])
            self.assertEqual(p.product_code, response.data['product']['product_code'])
            self.assertEqual(p.product_name, response.data['product']['product_name'])
            self.assertEqual(p.quantity_in_stock, response.data['product']['quantity_in_stock'])
            self.assertEqual(float(p.current_price), float(response.data['product']['current_price']))
            self.assertEqual(p.description, response.data['product']['description'])

    def test_not_in_product(self):
        self.client.post(reverse("create_account"), {'username': 'test0122',
                                                     'password': '123qwe123qwe',
                                                     'name': 'fewer',
                                                     'privilege': 'BO'})
        login_response = self.client.post(reverse("login"), {'username': 'test0122', 'password': '123qwe123qwe'})
        self.client.defaults['HTTP_AUTHORIZATION'] = 'token ' + login_response.data["token"]

        response = self.client.get(self.usl, {"product_code": "tefrgsdfewefwfew"})
        self.assertIn('message', response.data)
        self.assertEqual('No product with that code found', response.data['message'])

    def test_no_login(self):
        response = self.client.get(self.usl, {"product_code": "tefrgsdfewefwfew"})
        self.assertIn('detail', response.data)
        self.assertNotIn('product', response.data)


class UpdateProductTests(TestCase):
    def setUp(self):
        self.url = reverse("update_product")
        self.random_products = [
            mixer.blend(Product)
            for _ in range(5)
        ]

    def test_update_not_in_1(self):
        response = self.client.post(self.url, {'product_code': 'E200sdfdewdsffvsfsdfsfwger',
                                               'product_name': 'test',
                                               'quantity_in_stock': '11',
                                               'current_price': '10',
                                               'description': ''})
        self.assertIn("message", response.data)
        self.assertEqual("No product with that code found", response.data["message"])

    def test_update_not_in_2(self):
        response = self.client.post(self.url, {'product_code': 'regfrer',
                                               'product_name': 'tesfrwt',
                                               'quantity_in_stock': '1231',
                                               'current_price': '10',
                                               'description': ''})
        self.assertIn("message", response.data)
        self.assertEqual("No product with that code found", response.data["message"])

    def test_update_in_1(self):
        p = self.random_products[0]
        response = self.client.post(self.url, {'product_code': p.product_code,
                                               'product_name': 'update_test',
                                               'quantity_in_stock': '100',
                                               'current_price': '100',
                                               'description': ''})
        self.assertIn("product", response.data)
        self.assertIn("message", response.data)
        datas = response.data
        self.assertEqual("update_test", datas["product"]["product_name"])
        self.assertEqual(100, datas["product"]["quantity_in_stock"])
        self.assertEqual("100.00", datas["product"]["current_price"])
        self.assertEqual("", datas["product"]["description"])
        self.assertEqual("Product Updated Successfully", datas["message"])


    def test_update_in_2(self):
        p = self.random_products[0]
        response = self.client.post(self.url, {'product_code': p.product_code,
                                               'product_name': 'update_test',
                                               'quantity_in_stock': '-100',
                                               'current_price': '100',
                                               'description': ''})
        self.assertNotIn("product", response.data)
        self.assertNotIn("message", response.data)



# class DeleteProductTests(TestCase):
#     def setUp(self):
#         self.url = reverse("delete_product")
#         self.random_products = [
#             mixer.blend(Product)
#             for _ in range(10)
#         ]
#
#     def test_delete_product(self):
#         self.client.post(reverse("create_account"), {'username': 'test0122',
#                                                      'password': '123qwe123qwe',
#                                                      'name': 'fewer',
#                                                      'privilege': 'BO'})
#         login_response = self.client.post(reverse("login"), {'username': 'test0122', 'password': '123qwe123qwe'})
#         self.client.defaults['HTTP_AUTHORIZATION'] = 'token ' + login_response.data["token"]
#
#         num = len(self.random_products)
#         for p in self.random_products:
#             response = self.client.delete(self.url, {'product_code': p.product_code})
#             print(response.data)
#             num -= 1
#             self.assertEqual(num, len(self.random_products))
