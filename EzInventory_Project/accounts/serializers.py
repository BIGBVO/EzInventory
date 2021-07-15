from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate


class UserSerializer(serializers.ModelSerializer):
    """Declare User Serializer."""

    class Meta:
        model = User
        fields = ('id', 'username', 'privilege')


class RegisterSerializer(serializers.ModelSerializer):
    """Declare Register Serializer."""

    class Meta:
        model = User
        fields = ('id', 'username', 'name', 'password', 'privilege')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        """Return complete user instance based on the validated data."""
        user = User.objects.create_user(username=validated_data['username'],
                                        name=validated_data['name'],
                                        password=validated_data['password'],
                                        privilege=validated_data['privilege'])
        return user


class LoginSerializer(serializers.Serializer):
    """Declare Login Serializer."""

    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        """Return validated user or error."""
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


class ChangePasswordSerializer(serializers.Serializer):
    """Declare Change Password Serializer."""

    username = serializers.CharField()
    password = serializers.CharField()
    new_password = serializers.CharField()

    def save(self, **kwargs):
        """Return complete user instance with updated password."""
        username = kwargs['username']
        new_password = kwargs['new_password']
        user = User.objects.get(username=username)
        user.set_password(new_password)
        user.save()
        return user

    def validate(self, data):
        """Return validated user or error."""
        user = authenticate(**data)
        if user and user.is_active:
            return user

        raise serializers.ValidationError("Incorrect Password!")
