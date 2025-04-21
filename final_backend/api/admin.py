import data_wizard
from django.contrib import admin
from api.models import Country, Comment, CountryList, Tour
# Register your models here.
data_wizard.register(Country)
data_wizard.register(Comment)
data_wizard.register(CountryList)
data_wizard.register(Tour)