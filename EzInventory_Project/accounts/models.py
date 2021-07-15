from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    """Users within the Django authentication system and addtional name and privilege attributes are represented by this
    model.

    Keyword arguments:
    AbstractUser -- abstract user class in django user model
    """

    BUSINESS_OWNER = "BO"
    MANAGER = "MN"
    SALES_STAFF = "SS"
    WAREHOUSE_STAFF = "WS"

    PRIVILEGE = (
        (BUSINESS_OWNER, "BO"),
        (MANAGER, "MN"),
        (SALES_STAFF, "SS"),
        (WAREHOUSE_STAFF, "WS"),
    )

    name = models.CharField(max_length=30)
    privilege = models.CharField(max_length=2,
                                 choices=PRIVILEGE,
                                 default="SS")
