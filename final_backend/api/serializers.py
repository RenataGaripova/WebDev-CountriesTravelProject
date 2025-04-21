from rest_framework import serializers
from api.models import Comment, Tour, Tourist


class CountrySerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=255)
    images = serializers.CharField(max_length=255)
    map = serializers.CharField(max_length=255)
    history = serializers.CharField()
    geography = serializers.CharField()
    holidays = serializers.CharField()
    travel = serializers.CharField()


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["id", "text", "username", "avatar_image", "likes", "country"]


class CountryListSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    image = serializers.CharField(max_length=255)
    name = serializers.CharField(max_length=255)
    description = serializers.CharField(max_length=1024)


class TourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tour
        fields = ["id", "name", "images", "description", "country"]


class TouristSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tourist
        fields = '__all__'
