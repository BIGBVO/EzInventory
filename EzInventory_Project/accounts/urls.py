from django.urls import path, include
from knox import views as knox_views

from .views import RegisterAPI, LoginAPI, ChangePasswordAPI, AllUserAPI, GetUserAPI, DeleteUserAPI

urlpatterns = [
  path('api/auth', include('knox.urls')),
  path('api/auth/login', LoginAPI.as_view(), name='login'),
  path('api/auth/user', GetUserAPI.as_view(),name='get_self'),
  path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
  path('api/auth/change_password', ChangePasswordAPI.as_view(),name='change_password'),
  path('api/user/create', RegisterAPI.as_view(), name='create_account'),
  path('api/user/all_users', AllUserAPI.as_view(),name='list_accounts'),
  path('api/user/delete', DeleteUserAPI.as_view(),name='delete_account')
]
