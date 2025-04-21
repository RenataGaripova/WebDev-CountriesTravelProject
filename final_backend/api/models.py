from django.db import models


class Country(models.Model):

    name = models.CharField(max_length=255)
    images = models.CharField(max_length=255)
    map = models.CharField(max_length=255)
    history = models.TextField()
    geography = models.TextField()
    holidays = models.TextField()
    travel = models.TextField()

    def __str__(self):
        return f"{self.name} - {self.id}"
    
    class Meta:
        app_label = 'api' 


class Comment(models.Model):

    text = models.CharField(max_length=1024)
    username = models.CharField(max_length=255)
    avatar_image = models.CharField(max_length=255)
    likes = models.IntegerField()
    country = models.ForeignKey(Country,
                                on_delete=models.CASCADE,
                                related_name="comments")

    class Meta:
        app_label = 'api' 


class CountryList(models.Model):

    image = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=1024)

    class Meta:
        app_label = 'api' 


class Tour(models.Model):
    name = models.CharField(max_length=255)
    images = models.CharField(max_length=255)
    description = models.TextField()
    country = models.ForeignKey(Country,
                                on_delete=models.CASCADE,
                                related_name="tour")


class Tourist(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=255)
    option = models.IntegerField()
    tour = models.ForeignKey(Tour, 
                             on_delete=models.CASCADE,
                             related_name="tourists"
                             )