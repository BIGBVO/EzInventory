from django.test import TestCase
from django.urls import reverse

from mixer.backend.django import mixer

from accounts.models import User


# Create your tests here.


class AccountsRegisterTests(TestCase):
    def test_create_account_1_correct_1(self):
        url = reverse("create_account")
        response = self.client.post(url, {'username': 'test0122',
                                          'password': '123qwe123qwe',
                                          'name': 'fewer',
                                          'privilege': 'BO'})
        back_data = response.data
        self.assertIn("user", back_data)
        self.assertIn("message", back_data)
        self.assertEqual('test0122', back_data['user']["username"])
        self.assertEqual('BO', back_data['user']["privilege"])
        self.assertEqual("Register Successfully", back_data["message"])

    def test_create_account_1_correct_2(self):
        url = reverse("create_account")
        response = self.client.post(url, {'username': 'test02',
                                          'password': '12345678',
                                          'name': 'Test name',
                                          'privilege': 'SS'})

        back_data = response.data
        self.assertIn("user", back_data)
        self.assertIn("message", back_data)
        self.assertEqual('test02', back_data['user']["username"])
        self.assertEqual('SS', back_data['user']["privilege"])
        self.assertEqual("Register Successfully", back_data["message"])

    def test_create_account_2_username_invalid(self):
        url = reverse("create_account")
        response = self.client.post(url, {'username': 'test//02!',
                                          'password': '12345678',
                                          'name': 'Test name',
                                          'privilege': 'SS'})
        self.assertEqual(response.status_code, 400)

    def test_create_account_2_username_empty(self):
        url = reverse("create_account")
        response = self.client.post(url, {'username': '',
                                          'password': '12345678',
                                          'name': 'Test name',
                                          'privilege': 'SS'})
        self.assertEqual(response.status_code, 400)

    def test_create_account_2_username_exist(self):
        url = reverse("create_account")
        self.client.post(url, {'username': 'test01',
                               'password': '123qwe123qwe',
                               'name': 'fewer',
                               'privilege': 'BO'})

        response = self.client.post(url, {'username': 'test01',
                                          'password': '12345678',
                                          'name': 'Test name',
                                          'privilege': 'SS'})
        self.assertEqual(response.status_code, 400)

    def test_create_account_3_password_empty(self):
        url = reverse("create_account")
        response = self.client.post(url, {'username': 'test02',
                                          'password': '',
                                          'name': 'Test name',
                                          'privilege': 'SS'})
        self.assertEqual(response.status_code, 400)

    def test_create_account_4_name_empty(self):
        url = reverse("create_account")
        response = self.client.post(url, {'username': 'test02',
                                          'password': '12345678',
                                          'name': '',
                                          'privilege': 'SS'})
        self.assertEqual(response.status_code, 400)

    def test_create_account_5_privilege_invalid_1(self):
        url = reverse("create_account")
        response = self.client.post(url, {'username': 'test02',
                                          'password': '12345678',
                                          'name': 'Test name',
                                          'privilege': 'Business owner'})
        self.assertEqual(response.status_code, 400)

    def test_create_account_5_privilege_invalid_2(self):
        url = reverse("create_account")
        response = self.client.post(url, {'username': 'test02',
                                          'password': '12345678',
                                          'name': 'Test name',
                                          'privilege': 'AA'})
        self.assertEqual(response.status_code, 400)


class AccountsLoginTests(TestCase):
    def test_login_1_correct_1(self):
        self.client.post(reverse("create_account"), {'username': 'test01',
                                                     'password': '123qwe123qwe',
                                                     'name': 'fewer',
                                                     'privilege': 'BO'})
        url = reverse("login")
        response = self.client.post(url, {'username': 'test01', 'password': '123qwe123qwe'})

        back_data = response.data
        self.assertIn("user", back_data)
        self.assertIn("message", back_data)
        self.assertEqual('test01', back_data['user']["username"])
        self.assertEqual('BO', back_data['user']["privilege"])
        self.assertEqual("Login Successfully", back_data["message"])

    def test_login_1_correct_2(self):
        self.client.post(reverse("create_account"), {'username': 'test02',
                                                     'password': '12345678',
                                                     'name': 'Test name',
                                                     'privilege': 'SS'})
        url = reverse("login")
        response = self.client.post(url, {'username': 'test02', 'password': '12345678'})

        back_data = response.data
        self.assertIn("user", back_data)
        self.assertIn("message", back_data)
        self.assertEqual('test02', back_data['user']["username"])
        self.assertEqual('SS', back_data['user']["privilege"])
        self.assertEqual("Login Successfully", back_data["message"])

    def test_login_2_account_not_exist(self):
        url = reverse("login")
        response = self.client.post(url, {'username': 'test01', 'password': '123qwe123qwe'})

        self.assertEqual(response.status_code, 400)

    def test_login_2_account_empty(self):
        self.client.post(reverse("create_account"), {'username': 'test01',
                                                     'password': '123qwe123qwe',
                                                     'name': 'fewer',
                                                     'privilege': 'BO'})
        url = reverse("login")
        response = self.client.post(url, {'username': '', 'password': '123qwe123qwe'})

        self.assertEqual(response.status_code, 400)

    def test_login_3_password_wrong(self):
        self.client.post(reverse("create_account"), {'username': 'test01',
                                                     'password': '123qwe123qwe',
                                                     'name': 'fewer',
                                                     'privilege': 'BO'})
        url = reverse("login")
        response = self.client.post(url, {'username': 'test01', 'password': '123123123'})

        self.assertEqual(response.status_code, 400)

    def test_login_3_password_empty(self):
        self.client.post(reverse("create_account"), {'username': 'test01',
                                                     'password': '123qwe123qwe',
                                                     'name': 'fewer',
                                                     'privilege': 'BO'})
        url = reverse("login")
        response = self.client.post(url, {'username': 'test01', 'password': ''})

        self.assertEqual(response.status_code, 400)

        # self.client.defaults['HTTP_AUTHORIZATION'] = 'token ' + login_response.data["token"]


class AccountsChangePasswordTests(TestCase):

    def test_change_password_API_1_correct(self):
        self.client.post(reverse("create_account"), {'username': 'test0122',
                                                     'password': '123qwe123qwe',
                                                     'name': 'fewer',
                                                     'privilege': 'BO'})
        login_response = self.client.post(reverse("login"), {'username': 'test0122', 'password': '123qwe123qwe'})
        self.client.defaults['HTTP_AUTHORIZATION'] = 'token ' + login_response.data["token"]

        url = reverse("change_password")
        response = self.client.post(url, {
            "username": "test0122",
            "password": "123qwe123qwe",
            "new_password": "12345678"
        })

        back_data = response.data
        self.assertIn("user", back_data)
        self.assertIn("message", back_data)
        self.assertEqual('test0122', back_data['user']["username"])
        self.assertEqual('BO', back_data['user']["privilege"])
        self.assertEqual("Password Updated Successfully", back_data["message"])

    def test_change_password_API_2_username_invalid(self):
        self.client.post(reverse("create_account"), {'username': 'test0122',
                                                     'password': '123qwe123qwe',
                                                     'name': 'fewer',
                                                     'privilege': 'BO'})
        login_response = self.client.post(reverse("login"), {'username': 'test0122', 'password': '123qwe123qwe'})
        self.client.defaults['HTTP_AUTHORIZATION'] = 'token ' + login_response.data["token"]

        url = reverse("change_password")
        response = self.client.post(url, {
            "username": "test01222",
            "password": "123qwe123qwe",
            "new_password": "12345678"
        })

        back_data = response.data
        self.assertIn("message", back_data)
        self.assertEqual("No user found", back_data["message"])

    def test_change_password_API_2_username_empty(self):
        self.client.post(reverse("create_account"), {'username': 'test0122',
                                                     'password': '123qwe123qwe',
                                                     'name': 'fewer',
                                                     'privilege': 'BO'})
        login_response = self.client.post(reverse("login"), {'username': 'test0122', 'password': '123qwe123qwe'})
        self.client.defaults['HTTP_AUTHORIZATION'] = 'token ' + login_response.data["token"]

        url = reverse("change_password")
        response = self.client.post(url, {
            "username": "",
            "password": "123qwe123qwe",
            "new_password": "12345678"
        })

        back_data = response.data
        self.assertIn("message", back_data)
        self.assertEqual("No user found", back_data["message"])

    def test_change_password_API_3_old_password_empty(self):
        self.client.post(reverse("create_account"), {'username': 'test0122',
                                                     'password': '123qwe123qwe',
                                                     'name': 'fewer',
                                                     'privilege': 'BO'})
        login_response = self.client.post(reverse("login"), {'username': 'test0122', 'password': '123qwe123qwe'})
        self.client.defaults['HTTP_AUTHORIZATION'] = 'token ' + login_response.data["token"]

        url = reverse("change_password")
        response = self.client.post(url, {
            "username": "test0122",
            "password": "",
            "new_password": "12345678"
        })

        back_data = response.data
        self.assertIn("message", back_data)
        self.assertEqual("No user found", back_data["message"])

    def test_change_password_API_3_old_password_invalid(self):
        self.client.post(reverse("create_account"), {'username': 'test0122',
                                                     'password': '123qwe123qwe',
                                                     'name': 'fewer',
                                                     'privilege': 'BO'})
        login_response = self.client.post(reverse("login"), {'username': 'test0122', 'password': '123qwe123qwe'})
        self.client.defaults['HTTP_AUTHORIZATION'] = 'token ' + login_response.data["token"]

        url = reverse("change_password")
        response = self.client.post(url, {
            "username": "test0122",
            "password": "123455676863456",
            "new_password": "12345678"
        })

        back_data = response.data
        self.assertIn("message", back_data)
        self.assertEqual("No user found", back_data["message"])

    def test_change_password_API_4_new_password_empty(self):
        self.client.post(reverse("create_account"), {'username': 'test0122',
                                                     'password': '123qwe123qwe',
                                                     'name': 'fewer',
                                                     'privilege': 'BO'})
        login_response = self.client.post(reverse("login"), {'username': 'test0122', 'password': '123qwe123qwe'})
        self.client.defaults['HTTP_AUTHORIZATION'] = 'token ' + login_response.data["token"]

        url = reverse("change_password")
        response = self.client.post(url, {
            "username": "test0122",
            "password": "123qwe123qwe",
            "new_password": ""
        })

        back_data = response.data
        self.assertIn("message", back_data)
        self.assertEqual("No user found", back_data["message"])


class AccountsGetSelfTests(TestCase):

    def test_get_user_API_1_correct(self):
        self.client.post(reverse("create_account"), {'username': 'test0122',
                                                     'password': '123qwe123qwe',
                                                     'name': 'fewer',
                                                     'privilege': 'BO'})
        login_response = self.client.post(reverse("login"), {'username': 'test0122', 'password': '123qwe123qwe'})
        self.client.defaults['HTTP_AUTHORIZATION'] = 'token ' + login_response.data["token"]

        url = reverse("get_self")
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_get_user_API_2_not_login(self):
        url = reverse("get_self")
        response = self.client.get(url)
        self.assertEqual(response.status_code, 401)

    def test_get_user_API_3_not_auth(self):
        self.client.post(reverse("create_account"), {'username': 'test0122',
                                                     'password': '123qwe123qwe',
                                                     'name': 'fewer',
                                                     'privilege': 'BO'})
        self.client.post(reverse("login"), {'username': 'test0122', 'password': '123qwe123qwe'})

        url = reverse("get_self")
        response = self.client.get(url)
        self.assertEqual(response.status_code, 401)


class AccountsGetAllTests(TestCase):
    def setUp(self):
        self.random_accounts = [
            mixer.blend(User)
            for _ in range(10)
        ]

    def test_list_accounts_API(self):
        self.client.post(reverse("create_account"), {'username': 'test0122',
                                                     'password': '123qwe123qwe',
                                                     'name': 'fewer',
                                                     'privilege': 'BO'})
        login_response = self.client.post(reverse("login"), {'username': 'test0122', 'password': '123qwe123qwe'})
        self.client.defaults['HTTP_AUTHORIZATION'] = 'token ' + login_response.data["token"]

        url = reverse("list_accounts")

        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data) - 1, len(self.random_accounts))

        data_fields = [key for key in data[0].keys()]

        self.assertIn("id", data_fields)
        self.assertIn("username", data_fields)
        self.assertIn("privilege", data_fields)


class AccountsDeleteTests(TestCase):
    def test_delete_account_API_1(self):
        self.client.post(reverse("create_account"), {'username': 'test0122',
                                                     'password': '123qwe123qwe',
                                                     'name': 'fewer',
                                                     'privilege': 'BO'})
        login_response = self.client.post(reverse("login"), {'username': 'test0122', 'password': '123qwe123qwe'})
        self.client.defaults['HTTP_AUTHORIZATION'] = 'token ' + login_response.data["token"]

        url = reverse("delete_account")
        response = self.client.delete(url, {
            "id": 1,
            "username": "test0122",
            'privilege': 'BO'
        })
        self.assertEqual(response.status_code, 415)

        # back_data = response.data
        # self.assertIn("message", back_data)
        # self.assertEqual("User deleted successfully", back_data["message"])


class AccountModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        User.objects.create(name='test00', privilege='BO')

    def test_name_label(self):
        user = User.objects.get(id=1)
        field_label = user._meta.get_field('name').verbose_name
        self.assertEquals(field_label, 'name')

    def test_privilege_label(self):
        user = User.objects.get(id=1)
        field_label = user._meta.get_field('privilege').verbose_name
        self.assertEquals(field_label, 'privilege')
        max_length = user._meta.get_field('privilege').max_length
        self.assertEquals(max_length, 2)

