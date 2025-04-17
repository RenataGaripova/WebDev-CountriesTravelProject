import data_wizard
from django.contrib import admin
from api.models import Country, Comment
# Register your models here.
data_wizard.register(Country)
data_wizard.register(Comment)
