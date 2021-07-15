from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, ChangePasswordSerializer
from rest_framework import mixins
from .models import User


class RegisterAPI(generics.GenericAPIView):
    """Create Register API view.

    Return a new account with its token.
    """

    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        print("\n\n\nthis is called")
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        print("\n\n\nthis is never reached")
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1],
            "message": "Register Successfully"
        })


class LoginAPI(generics.GenericAPIView):
    """Create Login API view.

    Return login.
    """

    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        _, token = AuthToken.objects.create(user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token,
            "message": "Login Successfully"
        })


class ChangePasswordAPI(generics.UpdateAPIView):
    """Create Change Password API view.

    Return a new password.
    """

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = ChangePasswordSerializer

    def post(self, request):
        try:
            user = User.objects.get(username=request.data['username'])
            serializer = self.get_serializer(user, data=request.data)
            serializer.is_valid(raise_exception=True)

            username = request.data['username']
            new_password = request.data['new_password']
            user = serializer.save(username=username, new_password=new_password)
            return Response({
                "user": UserSerializer(user, context=self.get_serializer_context()).data,
                "message": "Password Updated Successfully"
            })
        except:
            return Response({
                "message": "No user found"
            })


class GetUserAPI(generics.RetrieveAPIView):
    """Create Get user API view.

    Return login account.
    """

    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class AllUserAPI(generics.GenericAPIView, mixins.ListModelMixin):
    """Create Get all users API view.

    Return user list.
    """

    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get(self, request):
        return self.list(request)


class DeleteUserAPI(generics.DestroyAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def delete(self, request):
        try:
            user = User.objects.get(username=request.data["username"])
            user.delete()
            return Response({
                "message": "User deleted successfully"
            })
        except User.DoesNotExist:
            return Response({
                "message": "No user with that name found"
            })