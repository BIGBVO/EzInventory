from django.urls import path

from .api import CreateNewProductAPI, GetProductByCodeAPI, ListProductAPI, UpdateProductAPI , DeleteProductAPI

urlpatterns = [
  path('api/product/', ListProductAPI.as_view(), name="list_products"),
  path('api/product/create', CreateNewProductAPI.as_view(), name="create_product"),
  path('api/product/search_code', GetProductByCodeAPI.as_view(), name="search_product"),
  path('api/product/update_product', UpdateProductAPI.as_view(), name="update_product"),
  path('api/product/delete', DeleteProductAPI.as_view(), name="delete_product")
]
